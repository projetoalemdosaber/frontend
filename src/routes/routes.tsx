import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/home/Home';
import Login from '../pages/login/Login';
import Cadastro from '../pages/cadastro/Cadastro';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
import { AuthProvider } from '../contexts/AuthContext';

function MainRoute() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar/>
        <div className='min-h-[80vh]'>
            <Routes>
              <Route path="/" element={<Login/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/home" element={<Home/>} />
              <Route path="/cadastro" element={<Cadastro/>} />
            </Routes>
        </div>
        <Footer/>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default MainRoute;