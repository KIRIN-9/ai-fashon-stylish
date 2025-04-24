import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  });
}
