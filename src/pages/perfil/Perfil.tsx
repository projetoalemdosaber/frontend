import React, { useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { AuthContext } from '../../contexts/AuthContext';
import { toastAlerta } from '../../utils/toastAlerta';
import ListaPostagens from '../../components/postagens/listaPostagens/ListaPostagens';
import CardPostagem from '../../components/postagens/cardPostagem/CardPostagem';

function Perfil() {
  const navigate = useNavigate();
  const { usuario } = useContext(AuthContext);

  useEffect(() => {
    if (usuario.token === "") {
      toastAlerta('Você precisa estar logado', 'info');
      navigate("/login");
    }
  }, [usuario.token, navigate]);

  const postagensUsuario = usuario.postagens || [];
  


  return (
    <div className='bg-laranjaMarrom container mx-auto mt-4 rounded-2xl overflow-hidden'>
      <img
        className='w-full h-72 object-cover border-b-8 border-white'
      />
      <img
        className='rounded-full w-56 mx-auto mt-[-8rem] border-8 border-white relative z-10'
        src={usuario.foto}
        alt={`Foto de perfil de ${usuario.nome}`}
      />
      <div className="relative mt-[-6rem] h-72 flex flex-col bg-begeClaro text-white text-2xl items-center justify-center">
        <p className="font-bold">Nome: {usuario.nome} </p>
        <p className="font-bold">Email: {usuario.usuario}</p>
      </div>
      <div>
        <hr className='mb-5' />
      </div>
      <div className='mx-auto text-center ml-2'>
        <h1 className='text-xl font-bold underline'>Minhas Postagens</h1>
        {/* Renderizar apenas as postagens do usuário */}
        {postagensUsuario.map((postagem => (
          <CardPostagem key={postagem.id} postagem={postagem} />
        ))
        )}
      </div>
    </div>
  );
}
export default Perfil;