import { Link } from 'react-router-dom'
import { ChangeEvent, FormEvent, useContext, useState } from 'react'

import { AuthContext } from '../../../contexts/AuthContext'
import Postagem from '../../../models/Postagem'
import ModalPostagem from '../modalPostagem/ModalPostagem'

import { SlOptions } from "react-icons/sl";
import { IoMdShareAlt } from "react-icons/io";
import { MdDelete, MdCreate } from "react-icons/md";
import ReactPlayer from 'react-player'

interface CardPostagemPostagem {
  post: Postagem
}

function CardPostagem({post} : CardPostagemPostagem) {
  
  const { usuario } = useContext(AuthContext)

  const [openSelect, setOpenSelect] = useState(false)

  const handleOpenSelect = () => {
      setOpenSelect((prev) => !prev)
  }

  const [comentarios, setComentarios] = useState([
    [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqIDyQXGYdxLNF1x4tsl0Zrz88OTEdlsRKCA&usqp=CAU',
      'Post muito bacana, hein?! 👏👏'
    ] 
])

const [novoComentarioTexto, setNovoComentarioTexto] = useState([])

 // Função que vai pegar os novos comentários digitados e adiciona ao State
 function criarNovoComentario(event: FormEvent) {
  event.preventDefault()
  setComentarios([...comentarios, novoComentarioTexto])
  setNovoComentarioTexto([])
}

// Função que pega o texto do novo comentário
function atualizarNovoComentario(event: ChangeEvent<HTMLTextAreaElement>) {
  setNovoComentarioTexto([usuario.foto, event.target.value])
}

  return (
      <div className='h-full w-4/5 lg:w-1/2 my-4 border-slate-950/75 border flex flex-col rounded-2xl overflow-hidden justify-between'>
              
        <div className='w-full min-h-[80vh]'>
            <div className="relative flex justify-between items-center bg-logoOrange py-2 px-4 text-white">
              <div className='flex items-center gap-4'>
                <img src={post.user?.foto} className='h-12 rounded-full' alt={`Imagem do ${post.user?.nome}`} />
                <h3 className='text-lg font-bold text-center uppercase'>{post.user?.nome}</h3>
              </div>

              {
                post.user?.id === usuario.id &&
                <div>
                  <SlOptions size="2rem" onClick={handleOpenSelect} />
    
                  {openSelect && 
                    <div className='absolute top-10 right-8 border-2 border-begeCinzento bg-bege rounded-md w-1/4 flex flex-col justify-center items-center p-2 font-semibold text-slate-900'>
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

            <div className='p-4 w-full h-1/2'>
                <h4 className='max-md:text-lg max-sm:text-base text-xl font-semibold'>{post.titulo}</h4>
                <p className='mt-4 max-sm:text-sm'>{post.texto}</p>
                <p className='my-4 max-sm:text-sm'>Tema: {post.tema?.assunto}</p>
                
                {
                  post.foto ?
                    <div className='flex justify-center max-h-full max-w-full object-cover overflow-x-auto bg-begeClaro'>
                      <img src={post.foto} alt="foto da postagem" className='object-fill h-96 max-w-full'/>
                    </div>
                  : post.video && 
                    <div className='relative pt-[60.25%] pr-[50.25%] max-sm:pt-[40.25%] max-sm:pr-[80.25%] w-full flex items-center justify-center'>
                      <ReactPlayer 
                        className="absolute top-0 left-0 mx-2" 
                        width='100%' 
                        height="100%" 
                        url={post.video} />
                    </div>
                }

                <p className='mt-3'>
                  { new Intl.DateTimeFormat(undefined, {
                      dateStyle: "short",
                      timeStyle: "short",
                    }).format(new Date(post.dataLancamento))
                  }
                </p>
     
          
              <div className='w-full rounded-lg'>

                  {/* Parte para inserir o Comentário */}
                  <form onSubmit={criarNovoComentario} className='flex flex-col p-4'>
                      {/*<strong>Deixe seu comentário</strong>*/}
                      <div className='flex gap-2'>
                        <img src={usuario.foto} className='h-12 rounded-full' alt={`Imagem do ${usuario.nome}`} />
                        <textarea
                            className='w-4/5 mt-4 p-3 bg-begeClaro rounded-3xl resize-none focus:outline-laranjaMarrom placeholder:text-slate-500'
                            name='comment'
                            placeholder='Escreva seu comentário...'
                            value={novoComentarioTexto[1]}
                            onChange={atualizarNovoComentario}
                            required
                        />
                      </div>
                      <footer>
                        {
                          novoComentarioTexto[1]?.length > 3 &&
                          <button 
                            className="bg-laranjaMarrom hover:bg-laranjaMarrom/90 text-white font-bold mt-2 ml-14 py-2 px-4 rounded-full"
                            type="submit">
                              Publicar
                          </button>

                        }
                      </footer>
                  </form>
              </div>

            <div className='w-full p-4 border-t-2 border-marrom'>

                <h2 className='mb-4 font-bold'>Comentários</h2>

                {comentarios.map(comentario => {
                    return (
                      <div className='flex gap-2 items-center'>
                        <img src={comentario[0]} className='h-12 rounded-full' alt='Imagem de perfil' />
                        <p className="w-4/5 p-2 bg-begeClaro rounded-3xl">{comentario[1]}</p>
                      </div>
                    )
                })}
            </div>
            
            </div>
        </div>
      </div>
  )
}

export default CardPostagem