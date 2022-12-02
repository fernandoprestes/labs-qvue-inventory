import { reactive } from 'vue'
import useSupabase from 'src/boot/supabase'

interface Auth {
  email: string,
  password: string
}

const data = reactive({
  user: null
})
export default function useAuthUser () {
  const { supabase } = useSupabase()

  const login = async ({ email, password }: Auth) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    if (error) throw error
    return data.user
  }

  const logout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }

  const isLoggedIn = () => {
    return !!data.user
  }

  const register = async ({ email, password, ...props }: Auth) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: props,
        emailRedirectTo: `${window.location.origin}/me?fromEmail=registrationConfirmation`
      }
    })
    if (error) throw error
    return data.user
  }

  const update = async (user: Auth) => {
    const { data, error } = await supabase.auth.updateUser(user)
    if (error) throw error
    return data.user
  }

  const sendPasswordRestEmail = async (email: string) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email)
    if (error) throw error
    return data
  }

  return {
    login,
    logout,
    isLoggedIn,
    register,
    update,
    sendPasswordRestEmail,
    data
  }
}
