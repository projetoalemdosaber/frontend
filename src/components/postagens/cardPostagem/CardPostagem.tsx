import { Link } from 'react-router-dom'
import { useContext, useState } from 'react'

import { AuthContext } from '../../../contexts/AuthContext'
import Postagem from '../../../models/Postagem'
import ModalPostagem from '../modalPostagem/ModalPostagem'

import { SlOptions } from "react-icons/sl";
import { IoMdShareAlt } from "react-icons/io";
import { MdDelete, MdCreate } from "react-icons/md";

interface CardPostagemPostagem {
  post: Postagem
}

function CardPostagem({post} : CardPostagemPostagem) {
  
  const { usuario } = useContext(AuthContext)

  const [openSelect, setOpenSelect] = useState(false)

  const handleOpenSelect = () => {
      setOpenSelect((prev) => !prev)
  }
  
  return (
      <div className='h-full w-2/3 my-4 border-slate-950/75 border flex flex-col rounded-2xl overflow-hidden justify-between'>
              
        <div className='w-full min-h-[80vh]'>
            <div className="relative flex justify-between items-center bg-logoOrange py-2 px-4 text-bege">
              <div className='flex items-center gap-4'>
                <img src={post.user?.foto} className='h-12 rounded-full' alt={`Imagem do ${post.user?.nome}`} />
                <h3 className='text-lg font-bold text-center uppercase'>{post.user?.nome}</h3>
              </div>

              {
                post.user?.id === usuario.id &&
                <div>
                  <SlOptions size="2rem" onClick={handleOpenSelect} />
    
                  {openSelect && 
                    <div className='absolute top-10 right-8 border-2 border-begeCinzento bg-bege w-1/4 flex flex-col justify-center items-center p-2 font-semibold text-slate-900'>
                      <div onClick={handleOpenSelect} className='w-full text-base flex items-center gap-1 hover:text-blue-700'>
                        <MdCreate />
                        <ModalPostagem id={post.id.toString()}/>
                      </div>
                      <Link 
                          to={`/deletarPostagem/${post.id}`} 
                          onClick={handleOpenSelect}
                          className='w-full text-base flex items-center gap-1 hover:text-red-700'>
                          <MdDelete />
                          Deletar
                      </Link>
                      <h2 className='w-full text-base flex items-center gap-1 hover:text-green-700 cursor-pointer'>
                          <IoMdShareAlt />
                          Compartilhar
                      </h2>
                    </div>
                  }
                </div>

              }
            </div>

            <div className='p-4'>
                <h4 className='text-lg font-semibold'>{post.titulo}</h4>
                <p className='my-2'>Tema: {post.tema?.assunto}</p>
                <p className='mb-4'>{post.texto}</p>
                
                {
                  post.foto ?
                    <img src={post.foto} alt="foto da postagem" className='h-full w-full'/>
                  : post.video && 
                    <video src={post.video}></video> 
                }

                <p className='mt-3'>
                  Data: { new Intl.DateTimeFormat(undefined, {
                      dateStyle: "medium",
                      timeStyle: "short",
                    }).format(new Date(post.dataLancamento))
                  }
                </p>
            </div>
        </div>
      </div>
  )
}

export default CardPostagem