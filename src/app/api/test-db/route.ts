import dbConnect from '@/lib/mongodb';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await dbConnect();
    return NextResponse.json({ 
      success: true, 
      message: 'Database connection successful!' 
    });
  } catch (error) {
    return NextResponse.json(
      { 
        success: false, 
        message: 'Database connection failed', 
        error: String(error) 
      },
      { status: 500 }
    );
  }
}