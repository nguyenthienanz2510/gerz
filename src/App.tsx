import { ToastContainer } from 'react-toastify'
import useRouteElements from './useRouteElements'
import 'react-toastify/dist/ReactToastify.css'
import { useContext, useEffect } from 'react'
import { localStorageEventTarget } from './utils/auth'
import { AppContext } from './context/app.context'

function App() {
  const routeElements = useRouteElements()
  const { resetAppContext } = useContext(AppContext)

  useEffect(() => {
    localStorageEventTarget.addEventListener('clearLocalStorage', resetAppContext)
    return localStorageEventTarget.removeEventListener('clearLocalStorage', resetAppContext)
  }, [resetAppContext])

  return (
    <div>
      {routeElements}
      <ToastContainer />
    </div>
  )
}

export default App
