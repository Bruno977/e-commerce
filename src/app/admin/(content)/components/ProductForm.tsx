"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ImageUpload from "./ImageUpload";
import MultiImageUpload from "./MultiImageUpload";

interface ProductFormProps {
  productId?: string;
}

const categories = [
  { id: 1, name: "Eletrônicos" },
  { id: 2, name: "Moda" },
  { id: 3, name: "Casa & Jardim" },
  { id: 4, name: "Esportes" },
  { id: 5, name: "Livros" },
];

export default function ProductForm({ productId }: ProductFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    shortDescription: "",
    price: "",
    comparePrice: "",
    cost: "",
    sku: "",
    barcode: "",
    stock: "",
    categoryId: "",
    images: [] as string[],
    featuredImage: "",
    isActive: true,
    isFeatured: false,
    weight: "",
    dimensions: {
      length: "",
      width: "",
      height: "",
    },
    slug: "",
    metaTitle: "",
    metaDescription: "",
    tags: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.error("Erro ao salvar produto:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  const handleNameChange = (value: string) => {
    setFormData({
      ...formData,
      name: value,
      slug: generateSlug(value),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Conteúdo Principal */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="general">Geral</TabsTrigger>
              <TabsTrigger value="pricing">Preços</TabsTrigger>
              <TabsTrigger value="inventory">Estoque</TabsTrigger>
              <TabsTrigger value="seo">SEO</TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Informações Gerais</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="name">Nome do Produto *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleNameChange(e.target.value)}
                      placeholder="Ex: Smartphone Premium XYZ"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="shortDescription">Descrição Curta</Label>
                    <Textarea
                      id="shortDescription"
                      value={formData.shortDescription}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          shortDescription: e.target.value,
                        })
                      }
                      placeholder="Descrição breve do produto..."
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Descrição Completa</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      placeholder="Descrição detalhada do produto..."
                      rows={6}
                    />
                  </div>

                  <div>
                    <Label htmlFor="category">Categoria *</Label>
                    <Select
                      value={formData.categoryId}
                      onValueChange={(value) =>
                        setFormData({ ...formData, categoryId: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem
                            key={category.id}
                            value={category.id.toString()}
                          >
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="tags">Tags</Label>
                    <Input
                      id="tags"
                      value={formData.tags}
                      onChange={(e) =>
                        setFormData({ ...formData, tags: e.target.value })
                      }
                      placeholder="smartphone, premium, tecnologia (separadas por vírgula)"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="pricing" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Preços</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="price">Preço de Venda *</Label>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        value={formData.price}
                        onChange={(e) =>
                          setFormData({ ...formData, price: e.target.value })
                        }
                        placeholder="0.00"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="comparePrice">Preço Comparativo</Label>
                      <Input
                        id="comparePrice"
                        type="number"
                        step="0.01"
                        value={formData.comparePrice}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            comparePrice: e.target.value,
                          })
                        }
                        placeholder="0.00"
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        Preço original (para mostrar desconto)
                      </p>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="cost">Custo do Produto</Label>
                    <Input
                      id="cost"
                      type="number"
                      step="0.01"
                      value={formData.cost}
                      onChange={(e) =>
                        setFormData({ ...formData, cost: e.target.value })
                      }
                      placeholder="0.00"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Custo para cálculo de margem (não visível na loja)
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="inventory" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Controle de Estoque</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="sku">SKU</Label>
                      <Input
                        id="sku"
                        value={formData.sku}
                        onChange={(e) =>
                          setFormData({ ...formData, sku: e.target.value })
                        }
                        placeholder="PROD-001"
                      />
                    </div>

                    <div>
                      <Label htmlFor="barcode">Código de Barras</Label>
                      <Input
                        id="barcode"
                        value={formData.barcode}
                        onChange={(e) =>
                          setFormData({ ...formData, barcode: e.target.value })
                        }
                        placeholder="1234567890123"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="stock">Quantidade em Estoque</Label>
                    <Input
                      id="stock"
                      type="number"
                      value={formData.stock}
                      onChange={(e) =>
                        setFormData({ ...formData, stock: e.target.value })
                      }
                      placeholder="0"
                    />
                  </div>

                  <div>
                    <Label htmlFor="weight">Peso (kg)</Label>
                    <Input
                      id="weight"
                      type="number"
                      step="0.001"
                      value={formData.weight}
                      onChange={(e) =>
                        setFormData({ ...formData, weight: e.target.value })
                      }
                      placeholder="0.000"
                    />
                  </div>

                  <div>
                    <Label>Dimensões (cm)</Label>
                    <div className="grid grid-cols-3 gap-2 mt-1">
                      <Input
                        type="number"
                        step="0.1"
                        value={formData.dimensions.length}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            dimensions: {
                              ...formData.dimensions,
                              length: e.target.value,
                            },
                          })
                        }
                        placeholder="Comprimento"
                      />
                      <Input
                        type="number"
                        step="0.1"
                        value={formData.dimensions.width}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            dimensions: {
                              ...formData.dimensions,
                              width: e.target.value,
                            },
                          })
                        }
                        placeholder="Largura"
                      />
                      <Input
                        type="number"
                        step="0.1"
                        value={formData.dimensions.height}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            dimensions: {
                              ...formData.dimensions,
                              height: e.target.value,
                            },
                          })
                        }
                        placeholder="Altura"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="seo" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>SEO</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="slug">Slug (URL)</Label>
                    <Input
                      id="slug"
                      value={formData.slug}
                      onChange={(e) =>
                        setFormData({ ...formData, slug: e.target.value })
                      }
                      placeholder="smartphone-premium-xyz"
                    />
                  </div>

                  <div>
                    <Label htmlFor="metaTitle">Título SEO</Label>
                    <Input
                      id="metaTitle"
                      value={formData.metaTitle}
                      onChange={(e) =>
                        setFormData({ ...formData, metaTitle: e.target.value })
                      }
                      placeholder="Título para mecanismos de busca"
                    />
                  </div>

                  <div>
                    <Label htmlFor="metaDescription">Descrição SEO</Label>
                    <Textarea
                      id="metaDescription"
                      value={formData.metaDescription}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          metaDescription: e.target.value,
                        })
                      }
                      placeholder="Descrição para mecanismos de busca"
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status */}
          <Card>
            <CardHeader>
              <CardTitle>Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="isActive"
                  checked={formData.isActive}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, isActive: checked })
                  }
                />
                <Label htmlFor="isActive">Produto ativo</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="isFeatured"
                  checked={formData.isFeatured}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, isFeatured: checked })
                  }
                />
                <Label htmlFor="isFeatured">Produto em destaque</Label>
              </div>
            </CardContent>
          </Card>

          {/* Imagem Principal */}
          <Card>
            <CardHeader>
              <CardTitle>Imagem Principal</CardTitle>
            </CardHeader>
            <CardContent>
              <ImageUpload
                value={formData.featuredImage}
                onChange={(url) =>
                  setFormData({ ...formData, featuredImage: url })
                }
                onRemove={() => setFormData({ ...formData, featuredImage: "" })}
              />
            </CardContent>
          </Card>

          {/* Galeria de Imagens */}
          <Card>
            <CardHeader>
              <CardTitle>Galeria de Imagens</CardTitle>
            </CardHeader>
            <CardContent>
              <MultiImageUpload
                value={formData.images}
                onChange={(urls) => setFormData({ ...formData, images: urls })}
                onRemove={(url) =>
                  setFormData({
                    ...formData,
                    images: formData.images.filter((img) => img !== url),
                  })
                }
              />
            </CardContent>
          </Card>

          {/* Ações */}
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading
                    ? "Salvando..."
                    : productId
                    ? "Atualizar Produto"
                    : "Criar Produto"}
                </Button>
                <Button type="button" variant="outline" className="w-full">
                  Salvar como Rascunho
                </Button>
                <Button type="button" variant="ghost" className="w-full">
                  Cancelar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  );
}
