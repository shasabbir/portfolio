/**
 * Blog Image Gallery Component
 * 
 * This component provides a gallery view of all uploaded blog images
 * and allows users to select existing images for their blog posts.
 */

'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ImageIcon, Check } from 'lucide-react';
import Image from 'next/image';

interface BlogImageGalleryProps {
  onImageSelect: (imageUrl: string) => void;
  selectedImage?: string;
  trigger?: React.ReactNode;
}

export function BlogImageGallery({ onImageSelect, selectedImage, trigger }: BlogImageGalleryProps) {
  const [open, setOpen] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      fetchImages();
    }
  }, [open]);

  const fetchImages = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/upload-image');
      if (response.ok) {
        const data = await response.json();
        setImages(data.images);
      }
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageSelect = (imageUrl: string) => {
    onImageSelect(imageUrl);
    setOpen(false);
  };

  return (
    <>
      <Button
        type="button"
        variant="outline"
        onClick={() => setOpen(true)}
        className="w-full"
      >
        {trigger || (
          <>
            <ImageIcon className="mr-2 h-4 w-4" />
            Choose from Gallery
          </>
        )}
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-5xl max-h-[80vh] w-[90vw] overflow-hidden flex flex-col">
          <DialogHeader className="flex-shrink-0">
            <DialogTitle>Blog Image Gallery</DialogTitle>
          </DialogHeader>

          <div className="flex-1 overflow-hidden">
            {loading ? (
              <div className="flex h-64 items-center justify-center">
                <div className="text-muted-foreground">Loading images...</div>
              </div>
            ) : images.length === 0 ? (
              <div className="flex h-64 items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <ImageIcon className="mx-auto mb-2 h-8 w-8" />
                  <p>No images found</p>
                  <p className="text-sm">Upload your first blog image to get started</p>
                </div>
              </div>
            ) : (
              <ScrollArea className="h-full">
                <div className="grid grid-cols-2 gap-4 p-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                  {images.map((imageUrl) => (
                    <div
                      key={imageUrl}
                      className="relative cursor-pointer overflow-hidden rounded-lg border-2 border-transparent hover:border-primary transition-colors"
                      onClick={() => handleImageSelect(imageUrl)}
                    >
                      <div className="relative aspect-square">
                        <Image
                          src={imageUrl}
                          alt="Blog image"
                          fill
                          className="object-cover transition-transform hover:scale-105"
                        />
                        {selectedImage === imageUrl && (
                          <div className="absolute inset-0 flex items-center justify-center bg-primary/80">
                            <Check className="h-6 w-6 text-white" />
                          </div>
                        )}
                      </div>
                      <div className="p-2">
                        <p className="truncate text-xs text-muted-foreground">
                          {imageUrl.split('/').pop()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}