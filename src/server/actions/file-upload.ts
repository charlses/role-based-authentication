'use server'
import { put } from '@vercel/blob'
import { revalidatePath } from 'next/cache'

export const uploadImage = async (formData: FormData) => {
  const imageFile = formData.get('image') as File
  const blob = await put(imageFile.name, imageFile, {
    access: 'public'
  })
  console.log(blob)
  revalidatePath('/')
  return blob
}
