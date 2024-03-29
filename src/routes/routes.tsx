import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ScrollToTop from '../utils/ScrollToTop';

import Home from '../pages/home/Home';
import Login from '../pages/login/Login';
import Cadastro from '../pages/cadastro/Cadastro';
import ListaTemas from '../components/temas/listaTemas/ListaTemas';
import FormularioTema from '../components/temas/formularioTema/FormularioTema';
import DeletarTema from '../components/temas/deletarTema/DeletarTema';
import FormularioPostagem from '../components/postagens/formularioPostagem/FormularioPostagem';
import DeletarPostagem from '../components/postagens/deletarPostagem/DeletarPostagem';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
import FeedPostagens from '../pages/feedPostagens/FeedPostagens';
import Perfil from '../pages/perfil/Perfil';

function MainRoute() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <div className='min-h-[80vh] font-noto-sans-symbols font-light'>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/editar/:id" element={<Cadastro />} />
          
          <Route path="/temas" element={<ListaTemas />} />
          <Route path="/cadastroTema" element={<FormularioTema />} />
          <Route path="/editarTema/:id" element={<FormularioTema />} />
          <Route path="/deletarTema/:id" element={<DeletarTema />} />
          <Route path="/perfil" element={<Perfil />} />

          <Route path="/feed" element={<FeedPostagens />} />
          {/* A rota "cadastroPostagens" não está sendo utilizado */}
          <Route path="/cadastroPostagens" element={<FormularioPostagem />} />
          <Route path="/editarPostagem/:id" element={<FormularioPostagem />} />
          <Route path="/deletarPostagem/:id" element={<DeletarPostagem />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  )
}

export default MainRoute;