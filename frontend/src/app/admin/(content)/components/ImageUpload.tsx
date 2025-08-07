"use client";
import React from "react";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Upload, X, ImageIcon } from "lucide-react";

interface ImageUploadProps {
  value?: File;
  onChange: (file: File) => void;
  onRemove: () => void;
  disabled?: boolean;
}

export default function ImageUpload({
  value,
  onChange,
  onRemove,
  disabled,
}: ImageUploadProps) {
  const [preview, setPreview] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (value) {
      const previewUrl = URL.createObjectURL(value);
      setPreview(previewUrl);

      return () => {
        URL.revokeObjectURL(previewUrl);
      };
    } else {
      setPreview(null);
    }
  }, [value]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    onChange(file);
  };

  return (
    <div className="space-y-4">
      {value ? (
        <div className="relative">
          <div className="relative aspect-square w-full max-w-sm mx-auto">
            <Image
              src={preview || "/placeholder.svg"}
              alt="Upload"
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <Button
            type="button"
            onClick={onRemove}
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2"
            disabled={disabled}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      ) : (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
          <div className="text-center">
            <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
            <div className="mt-4">
              <label htmlFor="image-upload" className="cursor-pointer">
                <span className="mt-2 block text-sm font-medium text-gray-900">
                  Clique para fazer upload
                </span>
                <input
                  id="image-upload"
                  type="file"
                  className="sr-only"
                  accept="image/*"
                  onChange={handleUpload}
                />
              </label>
              <p className="mt-1 text-xs text-gray-500">
                PNG, JPG, GIF até 10MB
              </p>
            </div>
          </div>
        </div>
      )}

      {!value && (
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={() => document.getElementById("image-upload")?.click()}
        >
          <Upload className="w-4 h-4 mr-2" />
          Selecionar Imagem
        </Button>
      )}
    </div>
  );
}
