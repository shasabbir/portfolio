
'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useEffect, useState, useRef } from 'react';
import { Loader2, Edit, Upload, X } from 'lucide-react';
import type { Blog } from '@/types';
import { useActionState } from 'react';
import { saveBlogPost } from '@/app/blog/actions-mongodb';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { BlogImageGallery } from '@/components/blog-image-gallery';

interface BlogFormProps {
  post?: Blog;
  triggerButton?: React.ReactNode;
}

const initialState = {
  message: '',
  success: false,
  slug: '',
};

export function BlogForm({ post, triggerButton }: BlogFormProps) {
  const [open, setOpen] = useState(false);
  const [state, formAction, isPending] = useActionState(saveBlogPost, initialState);
  const { toast } = useToast();
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isSubmittingRef = useRef(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>('');

   useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast({
          title: post ? 'Post Updated!' : 'Post Created!',
          description: state.message,
        });
        setOpen(false);
        // Reset form after successful submission
        formRef.current?.reset();
        if(!post && state.slug) {
          router.push(`/blog/${state.slug}`);
        }
      } else {
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: state.message,
        });
      }
    }
  }, [state, toast, post, router]);

  // Initialize image preview when opening dialog for editing
  useEffect(() => {
    if (open && post?.imageUrl) {
      setImagePreview(post.imageUrl);
    }
  }, [open, post?.imageUrl]);

  const handleOpenChange = (isOpen: boolean) => {
    try {
      if (!isOpen) {
        // Reset form state when dialog is closed
        setTimeout(() => {
          try {
            if (formRef.current) {
              formRef.current.reset();
            }
          } catch (error) {
            console.error('Error resetting form:', error);
          }
          setSelectedImage(null);
          setImagePreview(post?.imageUrl || '');
          setUploadedImageUrl('');
          setIsUploading(false);
          isSubmittingRef.current = false;
        }, 10);
      }
      setOpen(isOpen);
    } catch (error) {
      console.error('Error in handleOpenChange:', error);
    }
  };

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    console.log('Uploading image:', file.name, file.size, file.type);
    
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/upload-image', {
      method: 'POST',
      body: formData,
    });

    console.log('Upload response status:', response.status);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Upload failed:', errorData);
      throw new Error(errorData.error || errorData.details || `Upload failed with status ${response.status}`);
    }

    const data = await response.json();
    console.log('Upload success:', data);
    return data.imageUrl;
  };

  const handleImageUploadAndSubmit = async () => {
    if (!selectedImage) return false;
    
    try {
      setIsUploading(true);
      const imageUrl = await uploadImage(selectedImage);
      
      // Update state instead of direct DOM manipulation
      setUploadedImageUrl(imageUrl);
      setSelectedImage(null);
      setImagePreview(imageUrl);
      setIsUploading(false);
      return true;
    } catch (error) {
      console.error('Image upload error:', error);
      toast({
        variant: 'destructive',
        title: 'Upload Failed',
        description: error instanceof Error ? error.message : 'Failed to upload image.',
      });
      setIsUploading(false);
      return false;
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      if (isUploading || isSubmittingRef.current) {
        event.preventDefault();
        return;
      }
      
      // If there's a selected image, upload it first
      if (selectedImage) {
        event.preventDefault();
        isSubmittingRef.current = true;
        
        const uploadSuccess = await handleImageUploadAndSubmit();
        if (uploadSuccess && formRef.current && formRef.current.isConnected) {
          // Update the hidden input and then let the form submit naturally
          const imageUrlInput = formRef.current.querySelector('input[name="imageUrl"]') as HTMLInputElement;
          if (imageUrlInput) {
            imageUrlInput.value = uploadedImageUrl;
          }
          
          // Reset states and submit the form
          isSubmittingRef.current = false;
          
          // Submit the form naturally after a brief delay to ensure state updates
          setTimeout(() => {
            if (formRef.current) {
              formRef.current.requestSubmit();
            }
          }, 100);
        } else {
          isSubmittingRef.current = false;
        }
      }
      // If no image to upload, let the form submit normally
    } catch (error) {
      console.error('Submit handler error:', error);
      toast({
        variant: 'destructive',
        title: 'Upload Failed', 
        description: error instanceof Error ? error.message : 'Failed to upload image.',
      });
      setIsUploading(false);
      isSubmittingRef.current = false;
    }
  };

  const removeSelectedImage = () => {
    setSelectedImage(null);
    setImagePreview('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleGalleryImageSelect = (imageUrl: string) => {
    setImagePreview(imageUrl);
    setUploadedImageUrl(''); // Clear any uploaded image
    setSelectedImage(null); // Clear file selection since we're using an existing image
  };


  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {triggerButton ? (
          <Button>{triggerButton}</Button>
        ) : (
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Edit className="h-4 w-4" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] w-[95vw] overflow-hidden flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="font-headline">
            {post ? 'Edit Post' : 'Add New Post'}
          </DialogTitle>
          <DialogDescription>
            {post
              ? 'Make changes to your blog post.'
              : 'Create a new blog post to share your thoughts.'}
          </DialogDescription>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto px-1">
          <form ref={formRef} action={formAction} onSubmit={handleSubmit} className="space-y-4 pb-20">
           {post && <input type="hidden" name="slug" value={post.slug} />}
          <div className="space-y-1">
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" defaultValue={post?.title} required />
          </div>
          <div className="space-y-1">
            <Label htmlFor="excerpt">Excerpt</Label>
            <Textarea
              id="excerpt"
              name="excerpt"
              rows={3}
              defaultValue={post?.excerpt}
              required
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="content">Content (HTML)</Label>
            <Textarea
              id="content"
              name="content"
              rows={12}
              className="min-h-[200px] resize-y"
              defaultValue={post?.content}
              required
            />
          </div>
          {/* Image Upload Section */}
          <div className="space-y-4">
            <Label>Blog Image</Label>
            
            {/* Current or Selected Image Preview */}
            {(imagePreview || post?.imageUrl) && (
              <div className="relative">
                <div className="relative aspect-[16/9] w-full max-w-sm overflow-hidden rounded-lg border">
                  <img
                    src={imagePreview || post?.imageUrl}
                    alt="Blog post preview"
                    className="h-full w-full object-cover"
                  />
                  {imagePreview && (
                    <button
                      type="button"
                      onClick={removeSelectedImage}
                      className="absolute right-2 top-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* File Upload and Gallery Selection */}
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <div className="space-y-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="hidden"
                  id="image-upload"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Upload New
                </Button>
              </div>
              <BlogImageGallery 
                onImageSelect={handleGalleryImageSelect}
                selectedImage={imagePreview}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Upload a new image (JPEG, PNG, WebP, GIF - max 5MB) or choose from existing images
            </p>

            {/* Hidden input for image URL */}
            <input 
              type="hidden" 
              name="imageUrl" 
              value={uploadedImageUrl || (imagePreview && !imagePreview.startsWith('data:') ? imagePreview : post?.imageUrl || '')} 
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="imageHint">Image Description (Alt Text)</Label>
            <Input 
              id="imageHint" 
              name="imageHint" 
              defaultValue={post?.imageHint || ''} 
              placeholder="Describe the image for accessibility"
              required 
            />
          </div>
             <div className="space-y-1">
              <Label htmlFor="tags">Tags (comma-separated)</Label>
              <Input id="tags" name="tags" defaultValue={post?.tags.join(', ')} />
            </div>

            <DialogFooter className="mt-6 pt-4 border-t bg-background/95 backdrop-blur-sm sticky bottom-0">
              <DialogClose asChild>
                <Button variant="outline" type="button">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isUploading || isPending}>
                {(isUploading || isPending) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isUploading ? 'Uploading...' : isPending ? 'Saving...' : post ? 'Save Changes' : 'Create Post'}
              </Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
