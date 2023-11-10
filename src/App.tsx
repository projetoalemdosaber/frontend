import MainRoute from "./routes/routes"
import { AuthProvider } from './contexts/AuthContext';

import { ToastContainer } from 'react-toastify';
import "react-toastify/ReactToastify.min.css"


function App() {
  return (
    <>
      <AuthProvider>
        <ToastContainer />
        <MainRoute/>
      </AuthProvider>
    </>
  )
}

export default App