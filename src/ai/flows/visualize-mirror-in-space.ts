'use server';
/**
 * @fileOverview An AI tool to visualize how different LED mirror designs would look in a user's space.
 *
 * - visualizeMirrorInSpace - A function that handles the mirror visualization process.
 * - VisualizeMirrorInSpaceInput - The input type for the visualizeMirrorInSpace function.
 * - VisualizeMirrorInSpaceOutput - The return type for the visualizeMirrorInSpace function.
 */
import {ai} from '../genkit';
import {z} from 'genkit';

const VisualizeMirrorInSpaceInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of the user's room, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  mirrorDesignDescription: z.string().describe('The description of the LED mirror design to visualize.'),
  photoDataUriMimeType: z.string().optional().describe('The mime type of the photo data URI.'),
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
  prompt: `Take the following image of a room and the description of an LED mirror. Your task is to generate a new, realistic image where the described LED mirror is naturally and plausibly integrated into the room.

Room Image: {{media url=photoDataUri mimeType=photoDataUriMimeType}}
Mirror Description: {{{mirrorDesignDescription}}}`,
  model: 'googleai/gemini-2.5-flash-image-preview',
  config: {
    responseModalities: ['IMAGE'],
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
    if (!media?.url) {
      throw new Error('Failed to generate image. No media URL returned.');
    }
    return {visualizedImage: media.url};
  }
);
