import { runMigration } from '@/lib/migrate-data';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST() {
  try {
    const result = await runMigration();
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Migration failed', error: String(error) },
      { status: 500 }
    );
  }
}