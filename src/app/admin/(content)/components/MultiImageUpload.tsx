"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Upload, X, ImageIcon } from "lucide-react"

interface MultiImageUploadProps {
  value: string[]
  onChange: (value: string[]) => void
  onRemove: (value: string) => void
  disabled?: boolean
  maxImages?: number
}

export default function MultiImageUpload({
  value = [],
  onChange,
  onRemove,
  disabled,
  maxImages = 10,
}: MultiImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length === 0) return

    setIsUploading(true)

    try {
      const uploadPromises = files.map(async (file) => {
        // Simular upload - em produção, implementar upload real
        const formData = new FormData()
        formData.append("file", file)

        // Simular delay do upload
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Simular URL retornada
        return `/placeholder.svg?height=300&width=300&text=${file.name}`
      })

      const newUrls = await Promise.all(uploadPromises)
      const updatedImages = [...value, ...newUrls].slice(0, maxImages)
      onChange(updatedImages)
    } catch (error) {
      console.error("Erro no upload:", error)
    } finally {
      setIsUploading(false)
    }
  }

  const canAddMore = value.length < maxImages

  return (
    <div className="space-y-4">
      {/* Imagens Existentes */}
      {value.length > 0 && (
        <div className="grid grid-cols-2 gap-4">
          {value.map((url, index) => (
            <div key={index} className="relative group">
              <div className="relative aspect-square">
                <Image
                  src={url || "/placeholder.svg"}
                  alt={`Upload ${index + 1}`}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <Button
                type="button"
                onClick={() => onRemove(url)}
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                disabled={disabled}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Upload Area */}
      {canAddMore && (
        <>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
            <div className="text-center">
              <ImageIcon className="mx-auto h-8 w-8 text-gray-400" />
              <div className="mt-2">
                <label htmlFor="multi-image-upload" className="cursor-pointer">
                  <span className="mt-2 block text-sm font-medium text-gray-900">
                    {isUploading ? "Enviando..." : "Adicionar imagens"}
                  </span>
                  <input
                    id="multi-image-upload"
                    type="file"
                    className="sr-only"
                    accept="image/*"
                    multiple
                    onChange={handleUpload}
                    disabled={disabled || isUploading}
                  />
                </label>
                <p className="mt-1 text-xs text-gray-500">
                  PNG, JPG, GIF até 10MB cada ({value.length}/{maxImages})
                </p>
              </div>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full"
            disabled={disabled || isUploading}
            onClick={() => document.getElementById("multi-image-upload")?.click()}
          >
            <Upload className="w-4 h-4 mr-2" />
            {isUploading ? "Enviando..." : "Selecionar Imagens"}
          </Button>
        </>
      )}

      {!canAddMore && (
        <p className="text-sm text-gray-500 text-center">Limite máximo de {maxImages} imagens atingido</p>
      )}
    </div>
  )
}
