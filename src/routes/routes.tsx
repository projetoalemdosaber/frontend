import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/home/Home';
import Login from '../pages/login/Login';
import Cadastro from '../pages/cadastro/Cadastro';
import ListaTemas from './Components/Temas/ListaTemas/ListaTemas';
import FormularioTema from './Components/Temas/FormularioTema/FormularioTema';
import DeletarTema from './Components/Temas/DeletarTema/DeletarTema';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
import { AuthProvider } from '../contexts/AuthContext';

function MainRoute() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <div className='min-h-[80vh]'>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/temas" element={<ListaTemas />} />
            <Route path="/cadastroTema" element={<FormularioTema />} />
            <Route path="/editarTema/:id" element={<FormularioTema />} />
            <Route path="/deletarTema/:id" element={<FormularioTema />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  )
}

export default MainRoute;