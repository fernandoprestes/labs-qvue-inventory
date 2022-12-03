import useSupabase from 'src/boot/supabase'
import useAuthUser from './useAuthUser'

export default function useApi () {
  const { supabase } = useSupabase()
  const { data } = useAuthUser()
  const user = data.user

  const get = async (table: string) => {
    const { data, error } = await supabase.from(table).select('*')
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

  const remover = async (table: string, id: string) => {
    const { data, error } = await supabase.from(table).delete().match({ id })
    if (error) throw error
    return data
  }

  return {
    get,
    getById,
    post,
    update,
    remover
  }
}
