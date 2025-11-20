import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error) {
      console.error('Auth check error:', error);
      return NextResponse.json({ 
        authenticated: false, 
        error: error.message,
        details: 'Error getting user from Supabase'
      });
    }

    if (!user) {
      return NextResponse.json({ 
        authenticated: false,
        details: 'No user session found'
      });
    }

    return NextResponse.json({ 
      authenticated: true,
      user: {
        id: user.id,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Unexpected auth check error:', error);
    return NextResponse.json({ 
      authenticated: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
