# Blog Image Storage System

This document explains how the blog image storage system works in your portfolio project.

## Overview

The blog image storage system allows you to:
- Upload images directly to your project instead of using external URLs
- Store images locally in the `public/images/blog` directory
- Browse existing images in a gallery
- Automatically handle image optimization and file management

## Directory Structure

```
public/
  images/
    blog/
      ├── tech-innovation.jpg
      ├── data-visualization.jpg
      ├── web-development.jpg
      ├── ai-machine-learning.jpg
      └── [uploaded-images...]
```

## Features

### 1. Image Upload API (`/api/upload-image`)

**Endpoint**: `POST /api/upload-image`

**Features**:
- Accepts file uploads via `multipart/form-data`
- Validates file types (JPEG, PNG, WebP, GIF)
- Enforces 5MB file size limit
- Generates unique filenames with timestamps
- Returns public URL for the uploaded image

**Example Response**:
```json
{
  "success": true,
  "imageUrl": "/images/blog/1640995200000-my-blog-image.jpg",
  "message": "Image uploaded successfully"
}
```

### 2. Blog Form Component Updates

The `BlogForm` component now includes:
- **File Upload**: Direct image upload functionality
- **Image Gallery**: Browse and select from existing images
- **Image Preview**: Preview selected/uploaded images
- **Drag & Drop**: Easy file selection interface

### 3. Image Gallery Component

The `BlogImageGallery` component provides:
- Grid view of all uploaded blog images
- Click-to-select functionality
- Visual indication of selected image
- Responsive layout

## Usage

### Creating a New Blog Post

1. Click "Add Post" button
2. Fill in the blog post details
3. For the image, you can either:
   - **Upload New**: Click "Upload New" to select and upload a file
   - **Choose from Gallery**: Click "Choose from Gallery" to browse existing images
4. Add an image description for accessibility
5. Complete the form and submit

### Managing Images

#### Upload New Images
- Supported formats: JPEG, PNG, WebP, GIF
- Maximum file size: 5MB
- Images are automatically renamed with timestamps

#### Browse Existing Images
- All uploaded images are stored in `/public/images/blog/`
- Use the gallery component to view and select images
- Images are displayed in a responsive grid

#### Image Optimization
- Images are served directly from the Next.js public directory
- Consider using Next.js Image component for automatic optimization
- Large images should be compressed before upload for better performance

## File Naming Convention

Uploaded files are renamed using the pattern:
```
{timestamp}-{original-filename}
```

Example: `1640995200000-my-blog-image.jpg`

This ensures:
- No filename conflicts
- Chronological ordering
- Maintains original filename for reference

## Security Considerations

1. **File Type Validation**: Only image files are accepted
2. **File Size Limits**: 5MB maximum to prevent abuse
3. **Filename Sanitization**: Special characters are removed/replaced
4. **Directory Traversal Protection**: Files are stored only in designated directory

## Sample Images

The system comes with 4 sample images:
- `tech-innovation.jpg` - Technology and innovation themes
- `data-visualization.jpg` - Data science and analytics
- `web-development.jpg` - Web development and programming
- `ai-machine-learning.jpg` - Artificial intelligence and ML

## API Endpoints

### Upload Image
```
POST /api/upload-image
Content-Type: multipart/form-data

Body: FormData with 'file' field
```

### List Images
```
GET /api/upload-image

Response: { "images": ["/images/blog/image1.jpg", ...] }
```

## Troubleshooting

### Common Issues

1. **Upload Fails**: Check file size and format
2. **Images Not Showing**: Verify files are in `public/images/blog/`
3. **Performance Issues**: Compress large images before upload

### Error Messages

- `"No file received."` - No file was included in the request
- `"Invalid file type."` - File format not supported
- `"File too large."` - File exceeds 5MB limit
- `"Internal server error"` - Server-side processing error

## Future Enhancements

Consider implementing:
- Image compression on upload
- Multiple image upload
- Image editing capabilities
- CDN integration for better performance
- Image metadata extraction
- Automatic alt-text generation