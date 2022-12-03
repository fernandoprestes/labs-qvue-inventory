import { useQuasar } from 'quasar'

export default function useNotify () {
  const $q = useQuasar()

  const notifySuccess = (message:string) => {
    $q.notify({
      type: 'positive',
      message,
      position: 'top-right'
    })
  }

  const notifyError = (message:string) => {
    $q.notify({
      type: 'negative',
      message,
      position: 'top-right'
    })
  }

  return {
    notifySuccess,
    notifyError
  }
}
