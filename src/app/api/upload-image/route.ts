import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir, readdir } from 'fs/promises';
import { join, parse } from 'path';

// Make filenames URL-safe and predictable
function sanitizeFileName(original: string) {
  const { name, ext } = parse(original);
  const base = name
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9-_.]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
  const safeExt = (ext || '').toLowerCase();
  return `${base || 'image'}${safeExt || '.png'}`;
}

function getUploadDir() {
  // If you ever want a custom path in production:
  if (process.env.UPLOAD_IMAGE_DIR) {
    return process.env.UPLOAD_IMAGE_DIR;
  }
  // Default: public/images/blog
  return join(process.cwd(), 'public', 'images', 'blog');
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file || typeof file === 'string') {
      return NextResponse.json(
        { error: 'No file received.' },
        { status: 400 }
      );
    }

    const allowedTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/webp',
      'image/gif',
    ];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        {
          error:
            'Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed.',
        },
        { status: 400 }
      );
    }

    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 5MB.' },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = getUploadDir();
    await mkdir(uploadDir, { recursive: true });

    const fileName =
      Date.now().toString() + '-' + sanitizeFileName(file.name);
    const filePath = join(uploadDir, fileName);

    await writeFile(filePath, buffer);

    // Public URL relative to /public
    const imageUrl = `/images/blog/${encodeURIComponent(fileName)}`;

    return NextResponse.json({
      success: true,
      imageUrl,
      message: 'Image uploaded successfully',
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const uploadDir = getUploadDir();
    await mkdir(uploadDir, { recursive: true });

    const files = await readdir(uploadDir);
    const images = files
      .filter((file) =>
        /\.(jpg|jpeg|png|webp|gif)$/i.test(file)
      )
      .map(
        (file) =>
          `/images/blog/${encodeURIComponent(file)}`
      );

    return NextResponse.json({ images });
  } catch (error) {
    console.error('Error reading images:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
