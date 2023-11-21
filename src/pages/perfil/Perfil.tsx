/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../../contexts/AuthContext';
import { toastAlerta } from '../../utils/toastAlerta';
import CardPostagem from '../../components/postagens/cardPostagem/CardPostagem';
import Postagem from '../../models/Postagem';
import { buscar } from '../../services/Service';

function Perfil() {
  const [postagens, setPostagens] = useState<Postagem[]>([]);
  
  const navigate = useNavigate();
  const { usuario, handleLogout, reloading } = useContext(AuthContext);
  const token = usuario.token


  useEffect(() => {
    if (usuario.token === "") {
      toastAlerta('Você precisa estar logado', 'info');
      navigate("/login");
    }
  }, [usuario.token, navigate]);

  async function buscarPostagens() {
    try {
        await buscar('/postagens', setPostagens, {
            headers: {
                Authorization: token,
            },
        })
    } catch (error: any) {
        if (error.toString().includes('403')) {
            toastAlerta('O token expirou, favor logar novamente', 'info')
            handleLogout()
        }
    }  
  }

  useEffect(() => {
    buscarPostagens()
  }, [postagens.length, reloading])
  
  return (
    <div className='w-full min-h-screen pt-4 overflow-hidden bg-bege flex flex-col justify-center items-center'>
      
      <div className="w-4/5 mt-44 h-72 flex flex-col rounded-3xl bg-logoOrange text-white text-2xl items-center justify-center">
        <img
          className='rounded-full w-56 mt-[-10rem] border-8 border-bege relative z-10'
          src={usuario.foto}
          alt={`Foto de perfil de ${usuario.nome}`}
        />
        <p className="font-bold">{usuario.nome}</p>
        <p className="font-bold">{usuario.usuario}</p>
      </div>
      <div className='flex flex-col justify-center items-center'>
        <h1 className='text-3xl font-bold mt-8'>Minhas Postagens</h1>
        <p className='text-xl font-semibold my-4'>Veja as suas postagens, aqui você pode edita-las ou deleta-las.</p>
        {
          postagens.map(
            (postagem => 
              postagem.user.id === usuario.id && 
                <CardPostagem key={postagem.id} post={postagem} owner={true} />
            )
          )
        }
      </div>
    </div>
  )
}

export default Perfil;