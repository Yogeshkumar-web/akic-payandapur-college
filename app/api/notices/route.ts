import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { notices } from "@/db/schema";
import { createClient } from "@/lib/supabase/server";
import { eq } from "drizzle-orm";

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const category = searchParams.get("category");

        // Run separate queries instead of reassigning a query builder variable
        let allNotices;
        if (category) {
            allNotices = await db
                .select()
                .from(notices)
                .where(eq(notices.category, category))
                .orderBy(notices.date); // ascending; see note below to change to descending
        } else {
            allNotices = await db.select().from(notices).orderBy(notices.date);
        }

        return NextResponse.json(allNotices);
    } catch (error) {
        console.error("Error fetching notices:", error);
        return NextResponse.json(
            { error: "Failed to fetch notices" },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const supabase = await createClient();
        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user)
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );

        const body = await request.json();
        const { title, content, category, date } = body;

        if (!title || !content || !category || !date) {
            return NextResponse.json(
                { error: "All fields are required" },
                { status: 400 }
            );
        }

        const [newNotice] = await db
            .insert(notices)
            .values({
                title,
                content,
                category,
                date: new Date(date),
            })
            .returning();

        return NextResponse.json(newNotice, { status: 201 });
    } catch (error) {
        console.error("Error creating notice:", error);
        return NextResponse.json(
            { error: "Failed to create notice" },
            { status: 500 }
        );
    }
}

export async function PUT(request: NextRequest) {
    try {
        const supabase = await createClient();
        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user)
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );

        const body = await request.json();
        const { id, title, content, category, date } = body;

        if (!id || !title || !content || !category || !date) {
            return NextResponse.json(
                { error: "All fields are required" },
                { status: 400 }
            );
        }

        const [updatedNotice] = await db
            .update(notices)
            .set({ title, content, category, date: new Date(date) })
            .where(eq(notices.id, id))
            .returning();

        return NextResponse.json(updatedNotice);
    } catch (error) {
        console.error("Error updating notice:", error);
        return NextResponse.json(
            { error: "Failed to update notice" },
            { status: 500 }
        );
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const supabase = await createClient();
        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user)
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );

        const searchParams = request.nextUrl.searchParams;
        const id = searchParams.get("id");

        if (!id)
            return NextResponse.json(
                { error: "Notice ID is required" },
                { status: 400 }
            );

        await db.delete(notices).where(eq(notices.id, parseInt(id, 10)));

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error deleting notice:", error);
        return NextResponse.json(
            { error: "Failed to delete notice" },
            { status: 500 }
        );
    }
}
