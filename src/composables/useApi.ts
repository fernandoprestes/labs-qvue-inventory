/* eslint-disable @typescript-eslint/no-explicit-any */
import useSupabase from 'src/boot/supabase'
import useAuthUser from './useAuthUser'
import { uid } from 'quasar'

export default function useApi () {
  const { supabase } = useSupabase()
  const { data } = useAuthUser()
  const user = data.user

  const get = async (table: string) => {
    const { data, error } = await supabase.from(table).select('*')
    if (error) throw error
    return data
  }

  const getPublic = async (table: string, userId: string) => {
    const { data, error } = await supabase.from(table).select('*').eq('user_id', userId)
    if (error) throw error
    return data
  }

  const getById = async (table: string, id: string) => {
    const { data, error } = await supabase.from(table).select('*').eq('id', id)
    if (error) throw error
    return data[0]
  }

  const post = async (table: string, formData: any) => {
    const { data, error } = await supabase.from(table).insert([{ ...formData, user_id: user?.id }])
    if (error) throw error
    return data
  }

  const update = async (table: string, formData: any) => {
    const { data, error } = await supabase.from(table).update({ ...formData }).match({ id: formData.id })
    if (error) throw error
    return data
  }

  const remover = async (table: string, id: number) => {
    const { data, error } = await supabase.from(table).delete().match({ id })
    if (error) throw error
    return data
  }

  const uploadImg = async (file: string, storage:string) => {
    const fileUid = uid()
    const { error } = await supabase.storage.from(storage).upload(fileUid, file, {
      cacheControl: '3600',
      upsert: false
    })
    const publicUrl = await getUrlPublic(fileUid, storage)
    if (error) throw error
    return publicUrl
  }

  const getUrlPublic = async (fileName: string, storage: string) => {
    const { data } = supabase.storage.from(storage).getPublicUrl(fileName)
    if (!data.publicUrl) throw new Error()
    return data.publicUrl
  }

  return {
    get,
    getById,
    post,
    update,
    remover,
    uploadImg,
    getPublic
  }
}
