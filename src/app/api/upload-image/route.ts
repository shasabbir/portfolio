import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export async function POST(request: NextRequest) {
  console.log('Upload image API called');
  
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    console.log('File received:', file ? `${file.name} (${file.size} bytes, ${file.type})` : 'No file');
    
    if (!file) {
      return NextResponse.json({ error: 'No file received.' }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed.' },
        { status: 400 }
      );
    }

    // Validate file size (5MB limit)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 5MB.' },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate unique filename
    const timestamp = Date.now();
    const originalName = file.name.replace(/\s+/g, '-').toLowerCase();
    const fileName = `${timestamp}-${originalName}`;
    
    // Create the blog images directory if it doesn't exist
    const uploadDir = join(process.cwd(), 'public', 'images', 'blog');
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    // Write the file
    const filePath = join(uploadDir, fileName);
    console.log('Writing file to:', filePath);
    await writeFile(filePath, buffer);
    console.log('File written successfully');

    // Return the public URL
    const imageUrl = `/images/blog/${fileName}`;
    
    console.log('Returning success response with imageUrl:', imageUrl);
    
    return NextResponse.json({ 
      success: true, 
      imageUrl,
      message: 'Image uploaded successfully' 
    });

  } catch (error) {
    console.error('Error uploading image:', error);
    
    // More detailed error logging
    if (error instanceof Error) {
      console.error('Error details:', {
        message: error.message,
        stack: error.stack,
        name: error.name
      });
    }
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Optional: Handle GET requests to list images
export async function GET() {
  try {
    const { readdir } = await import('fs/promises');
    const uploadDir = join(process.cwd(), 'public', 'images', 'blog');
    
    if (!existsSync(uploadDir)) {
      return NextResponse.json({ images: [] });
    }

    const files = await readdir(uploadDir);
    const images = files
      .filter(file => /\.(jpg|jpeg|png|webp|gif)$/i.test(file))
      .map(file => `/images/blog/${file}`);

    return NextResponse.json({ images });
  } catch (error) {
    console.error('Error reading images:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}