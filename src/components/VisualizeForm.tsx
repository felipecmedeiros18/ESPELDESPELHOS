"use client";

import { useEffect, useState, useRef, useActionState } from "react";
import { useFormStatus } from "react-dom";
import Image from "next/image";
import { z } from "zod";
import { visualizeMirrorInSpace } from "@/ai/flows/visualize-mirror-in-space";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Upload, X, Wand2, Loader2, Image as ImageIcon, ArrowRight } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useToast } from "@/hooks/use-toast";

type FormState = {
  originalImage?: string;
  visualizedImage?: string;
  error?: string | Record<string, string[] | undefined> | null;
};

const initialState: FormState = {};

export async function visualizeAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const schema = z.object({
    photoDataUri: z.string().min(1, "Por favor, envie uma foto do seu espaço."),
    mirrorDesignDescription: z.string().min(10, "Por favor, descreva o design do espelho com mais detalhes."),
  });

  const validatedFields = schema.safeParse({
    photoDataUri: formData.get("photoDataUri"),
    mirrorDesignDescription: formData.get("mirrorDesignDescription"),
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const result = await visualizeMirrorInSpace(validatedFields.data);
    return {
      visualizedImage: result.visualizedImage,
      originalImage: validatedFields.data.photoDataUri,
    };
  } catch (e) {
    console.error(e);
    return { 
      error: "Ocorreu um erro ao gerar a visualização. Tente novamente mais tarde.",
      originalImage: validatedFields.data.photoDataUri,
    };
  }
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Visualizando...
        </>
      ) : (
        <>
          <Wand2 className="mr-2 h-4 w-4" />
          Visualizar Agora
        </>
      )}
    </Button>
  );
}

export default function VisualizeForm() {
  const [state, formAction] = useActionState(visualizeAction, initialState);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (state.error && typeof state.error === 'string') {
      toast({
        variant: "destructive",
        title: "Erro na Visualização",
        description: state.error,
      });
    }
  }, [state.error, toast]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) { // 4MB limit
        toast({
          variant: "destructive",
          title: "Arquivo muito grande",
          description: "Por favor, escolha uma imagem com menos de 4MB.",
        });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearPreview = () => {
    setPreview(null);
    if(fileInputRef.current) {
        fileInputRef.current.value = "";
    }
  }

  const placeholderImage = PlaceHolderImages.find(img => img.id === 'visualize-placeholder');

  return (
    <div className="w-full">
      <form action={formAction}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="flex flex-col">
            <CardContent className="p-6 flex-grow flex flex-col gap-4">
              <div className="space-y-2">
                <Label htmlFor="photo" className="text-lg font-semibold">1. Envie uma foto do seu ambiente</Label>
                 <Input
                    id="photo"
                    name="photo"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                 />
                 <input type="hidden" name="photoDataUri" value={preview || ''} />
                 {preview ? (
                    <div className="relative aspect-video w-full rounded-md overflow-hidden border">
                         <Image src={preview} alt="Pré-visualização do ambiente" layout="fill" objectFit="cover" />
                         <Button variant="destructive" size="icon" className="absolute top-2 right-2 h-8 w-8" onClick={clearPreview}>
                            <X className="h-4 w-4" />
                            <span className="sr-only">Remover Imagem</span>
                         </Button>
                    </div>
                 ) : (
                    <button type="button" onClick={() => fileInputRef.current?.click()} className="relative aspect-video w-full flex flex-col items-center justify-center rounded-md border-2 border-dashed border-muted-foreground/50 hover:border-primary transition-colors">
                        <Upload className="h-10 w-10 text-muted-foreground" />
                        <span className="mt-2 text-sm font-medium text-muted-foreground">Clique para enviar uma imagem</span>
                        <span className="text-xs text-muted-foreground/80">PNG, JPG, WEBP até 4MB</span>
                    </button>
                 )}
                {typeof state.error === 'object' && state.error?.photoDataUri && (
                    <p className="text-sm font-medium text-destructive">{state.error.photoDataUri[0]}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="mirrorDesignDescription" className="text-lg font-semibold">2. Descreva o espelho dos seus sonhos</Label>
                <Textarea
                  id="mirrorDesignDescription"
                  name="mirrorDesignDescription"
                  placeholder="Ex: um espelho orgânico com iluminação LED quente, na vertical, com cerca de 1.80m de altura."
                  rows={4}
                />
                 {typeof state.error === 'object' && state.error?.mirrorDesignDescription && (
                    <p className="text-sm font-medium text-destructive">{state.error.mirrorDesignDescription[0]}</p>
                )}
              </div>
              <div className="mt-auto pt-4">
                <SubmitButton />
              </div>
            </CardContent>
          </Card>

          <Card className="flex flex-col">
            <CardContent className="p-6 flex-grow flex flex-col justify-center items-center">
                <div className="w-full space-y-4">
                    <h3 className="text-lg font-semibold text-center">3. Veja a mágica acontecer</h3>
                    <div className="relative aspect-video w-full rounded-md overflow-hidden border bg-muted/30">
                        {state.visualizedImage ? (
                            <Image src={state.visualizedImage} alt="Visualização do espelho no ambiente" layout="fill" objectFit="cover" />
                        ) : state.originalImage && !state.error ? (
                            <div className="w-full h-full flex flex-col items-center justify-center">
                                <Loader2 className="h-10 w-10 animate-spin text-primary" />
                                <p className="mt-4 text-muted-foreground">Gerando sua visualização...</p>
                            </div>
                        ) : (
                           <div className="w-full h-full flex flex-col items-center justify-center text-center p-4">
                                <ImageIcon className="h-10 w-10 text-muted-foreground" />
                                <p className="mt-2 text-sm font-medium text-muted-foreground">Sua imagem visualizada aparecerá aqui</p>
                           </div>
                        )}
                    </div>
                    
                    {state.error && state.originalImage && (
                         <Alert variant="destructive">
                            <AlertTitle>Falha na Visualização</AlertTitle>
                            <AlertDescription>
                                Não foi possível gerar a imagem. Por favor, tente novamente ou use uma foto diferente.
                            </AlertDescription>
                        </Alert>
                    )}
                </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  );
}
