'use server'

import { db } from '@/lib/db'
import { notices, studyMaterials, users, contactSubmissions } from '@/db/schema'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { eq } from 'drizzle-orm'

export async function addNotice(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Unauthorized')
  }

  // Check for admin role
  const userRole = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.id, user.id),
    columns: {
      role: true,
    },
  })

  if (!userRole || userRole.role !== 'admin') {
    throw new Error('Unauthorized: Admin access required')
  }

  const title = formData.get('title') as string
  const content = formData.get('content') as string
  const category = formData.get('category') as string
  const date = new Date()

  await db.insert(notices).values({
    title,
    content,
    category,
    date,
  })

  revalidatePath('/')
  revalidatePath('/admin')
  revalidatePath('/admin/notices')
  redirect('/admin/notices')
}


export async function saveMaterial(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Unauthorized')
  }

  // Check for admin role
  const userRole = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.id, user.id),
    columns: {
      role: true,
    },
  })

  if (!userRole || userRole.role !== 'admin') {
    throw new Error('Unauthorized: Admin access required')
  }

  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const fileUrl = formData.get('fileUrl') as string
  const className = formData.get('class') as string
  const subject = formData.get('subject') as string

  await db.insert(studyMaterials).values({
    title,
    description,
    fileUrl,
    class: className,
    subject,
  })

  revalidatePath('/')
  revalidatePath('/admin')
  revalidatePath('/admin/materials')
  revalidatePath('/admin/materials')
  redirect('/admin/materials')
}

export async function resolveQuery(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Unauthorized')
  }

  // Check for admin role
  const userRole = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.id, user.id),
    columns: {
      role: true,
    },
  })

  if (!userRole || userRole.role !== 'admin') {
    throw new Error('Unauthorized: Admin access required')
  }

  const id = Number(formData.get('id'))
  
  await db.update(contactSubmissions)
    .set({ status: 'resolved' })
    .where(eq(contactSubmissions.id, id))

  revalidatePath('/admin/contact')
}

