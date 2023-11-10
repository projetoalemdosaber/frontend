import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/home/Home';
import Login from '../pages/login/Login';
import Cadastro from '../pages/cadastro/Cadastro';
import ListaTemas from '../components/temas/listaTemas/ListaTemas';
import FormularioTema from '../components/temas/formularioTema/FormularioTema';
import DeletarTema from '../components/temas/deletarTema/DeletarTema';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';

function MainRoute() {
  return (
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
          <Route path="/deletarTema/:id" element={<DeletarTema />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  )
}

export default MainRoute;