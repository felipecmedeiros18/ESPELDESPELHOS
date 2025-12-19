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
  prompt: `Generate a realistic image of a room with an LED mirror integrated naturally into the space, based on the following description: {{{mirrorDesignDescription}}}.`,
  model: 'googleai/imagen-4.0-fast-generate-001',
});


const visualizeMirrorInSpaceFlow = ai.defineFlow(
  {
    name: 'visualizeMirrorInSpaceFlow',
    inputSchema: VisualizeMirrorInSpaceInputSchema,
    outputSchema: VisualizeMirrorInSpaceOutputSchema,
  },
  async input => {
    const {media} = await visualizeMirrorInSpacePrompt(input);
    if (!media?.url) {
      throw new Error('Failed to generate image. No media URL returned.');
    }
    return {visualizedImage: media.url};
  }
);
