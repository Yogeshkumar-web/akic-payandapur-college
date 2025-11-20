import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { studyMaterials } from "@/db/schema";
import { createClient } from "@/lib/supabase/server";
import { desc, eq } from "drizzle-orm";

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const classParam = searchParams.get("class");

        // Do NOT reassign a query-builder variable with different shapes.
        let materials;
        if (classParam) {
            materials = await db
                .select()
                .from(studyMaterials)
                .where(eq(studyMaterials.class, classParam))
                .orderBy(desc(studyMaterials.uploadedAt));
        } else {
            materials = await db
                .select()
                .from(studyMaterials)
                .orderBy(desc(studyMaterials.uploadedAt));
        }

        return NextResponse.json(materials);
    } catch (error) {
        console.error("Error fetching study materials:", error);
        return NextResponse.json(
            { error: "Failed to fetch study materials" },
            { status: 500 }
        );
    }
}

// POST and DELETE unchanged (keep your existing code)
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
        const {
            title,
            description,
            fileUrl,
            class: classValue,
            subject,
        } = body;

        if (!title || !fileUrl || !classValue || !subject) {
            return NextResponse.json(
                { error: "Title, file URL, class, and subject are required" },
                { status: 400 }
            );
        }

        const [newMaterial] = await db
            .insert(studyMaterials)
            .values({
                title,
                description: description || null,
                fileUrl,
                class: classValue,
                subject,
            })
            .returning();

        return NextResponse.json(newMaterial, { status: 201 });
    } catch (error) {
        console.error("Error creating study material:", error);
        return NextResponse.json(
            { error: "Failed to create study material" },
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
                { error: "Material ID is required" },
                { status: 400 }
            );

        await db
            .delete(studyMaterials)
            .where(eq(studyMaterials.id, parseInt(id, 10)));

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error deleting study material:", error);
        return NextResponse.json(
            { error: "Failed to delete study material" },
            { status: 500 }
        );
    }
}
