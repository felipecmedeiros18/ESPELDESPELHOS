'use server';
/**
 * @fileOverview An AI tool to visualize how different LED mirror designs would look in a user's space.
 *
 * - visualizeMirrorInSpace - A function that handles the mirror visualization process.
 * - VisualizeMirrorInSpaceInput - The input type for the visualizeMirrorInSpace function.
 * - VisualizeMirrorInSpaceOutput - The return type for the visualizeMirrorInSpace function.
 */
import {config} from 'dotenv';
config();

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const VisualizeMirrorInSpaceInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of the user's room, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  mirrorDesignDescription: z.string().describe('The description of the LED mirror design to visualize.'),
});
export type VisualizeMirrorInSpaceInput = z.infer<typeof VisualizeMirrorInSpaceInputSchema>;

const VisualizeMirrorInSpaceOutputSchema = z.object({
  visualizedImage: z
    .string()
    .describe("A data URI of the visualized image with the LED mirror design in the user's space."),
});
export type VisualizeMirrorInSpaceOutput = z.infer<typeof VisualizeMirrorInSpaceOutputSchema>;

export async function visualizeMirrorInSpace(input: VisualizeMirrorInSpaceInput): Promise<VisualizeMirrorInSpaceOutput> {
  return visualizeMirrorInSpaceFlow(input);
}

const visualizeMirrorInSpacePrompt = ai.definePrompt({
  name: 'visualizeMirrorInSpacePrompt',
  input: {schema: VisualizeMirrorInSpaceInputSchema},
  output: {schema: VisualizeMirrorInSpaceOutputSchema},
  prompt: [
    {
      media: {
        url: '{{photoDataUri}}',
        contentType: '{{photoDataUriMimeType}}',
      },
    },
    {
      text: `Generate an image of this room with the following LED mirror design: {{{mirrorDesignDescription}}}. Make the mirror look realistic and naturally integrated into the space.`,
    },
  ],
  model: 'googleai/gemini-2.5-flash-image-preview',
  config: {
    responseModalities: ['TEXT', 'IMAGE'],
  },
});

const visualizeMirrorInSpaceFlow = ai.defineFlow(
  {
    name: 'visualizeMirrorInSpaceFlow',
    inputSchema: VisualizeMirrorInSpaceInputSchema,
    outputSchema: VisualizeMirrorInSpaceOutputSchema,
  },
  async input => {
    const photoDataUriMimeType = input.photoDataUri.match(/data:(.*);base64,/)?.[1];
    const {media} = await visualizeMirrorInSpacePrompt({
      ...input,
      photoDataUriMimeType,
    });
    return {visualizedImage: media!.url!};
  }
);
