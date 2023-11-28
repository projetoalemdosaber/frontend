/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserEdit } from "react-icons/fa";

import Postagem from '../../models/Postagem';
import { AuthContext } from '../../contexts/AuthContext';
import { buscar } from '../../services/Service';

import CardPostagem from '../../components/postagens/cardPostagem/CardPostagem';
import ModalPostagem from '../../components/postagens/modalPostagem/ModalPostagem';

import { toastAlerta } from '../../utils/toastAlerta';

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
      
      <div className="w-4/5 mt-28 md:mt-44 h-72 flex flex-col rounded-3xl bg-logoOrange text-white text-2xl items-center justify-center">
        
        <div className=' overflow-hidden rounded-[50%] w-52 h-52 mt-[-8rem] border-8 border-bege relative z-10'>
          <img
            className='w-full h-full object-cover'
            src={usuario.foto}
            alt={`Foto de perfil de ${usuario.nome}`}
          />
        </div>
        <p className="font-bold">{usuario.nome}</p>
        <p className="font-bold">{usuario.usuario}</p>

        <div className='w-full flex justify-evenly mt-10 md:mt-4'>
          <div className="w-4/5 max-lg:w-1/4 flex max-lg:flex-col items-center justify-center ">
            <ModalPostagem />
          </div>
          <Link to={`/editar/${usuario.id}`} className="w-4/5 max-lg:w-1/4 flex max-xl:flex-col items-center justify-center xl:gap-4">
            <FaUserEdit className={"text-3xl lg:text-[3.8rem] xl:text-[5rem]"} />
            <p className='text-[0.7rem] lg:text-sm text-center max-md:invisible max-md:absolute'>Editar Informações</p>
          </Link>
        </div>
      </div>
      <div className='container flex flex-col justify-center items-center'>
        <h1 className='text-2xl md:text-3xl font-bold mt-8'>Minhas Postagens</h1>
        <p className='text-lg md:text-xl font-semibold m-4'>Veja as suas postagens, aqui você pode edita-las ou deleta-las.</p>
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