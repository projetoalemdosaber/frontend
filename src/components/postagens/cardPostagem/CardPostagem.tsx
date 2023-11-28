// import { Link } from 'react-router-dom'
import { ChangeEvent, FormEvent, useContext, useEffect, useRef, useState } from 'react'
import ReactPlayer from 'react-player'

import { AuthContext } from '../../../contexts/AuthContext'
import Postagem from '../../../models/Postagem'
import ModalPostagem from '../modalPostagem/ModalPostagem'

import { SlOptions } from "react-icons/sl";
import { IoMdShareAlt, IoIosHeartEmpty, IoMdHeart } from "react-icons/io";
import { PiHandHeartLight, PiHandHeartFill } from "react-icons/pi";
import { BsHandThumbsUp, BsHandThumbsUpFill } from "react-icons/bs";
import { atualizarReacoes } from '../../../services/Service'
import ModalPostagemDeletar from '../modalPostagemDeletar/ModalPostagemDeletar'

interface CardPostagemPostagem {
  post: Postagem,
  owner?: boolean
}

function CardPostagem({post, owner} : CardPostagemPostagem) {
  const optionsRef = useRef({} as HTMLDivElement);

  const { usuario } = useContext(AuthContext);

  const [openSelect, setOpenSelect] = useState(false)

  const [reacoes, setReacoes] = useState({
    curtir: 0,
    amei: 0,
    indico: 0,
  })

  const [curtirSelect, setCurtirSelect] = useState(false);
  const [ameiSelect, setAmeiSelect] = useState(false);
  const [indicoSelect, setIndicoSelect] = useState(false);

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
  
  useEffect(() => {
    const handleCloseOption = (e : MouseEvent) => {
      if (optionsRef.current && !optionsRef.current.contains(e.target as Node)) {
        setOpenSelect(false)  
      }
    }

    document.addEventListener("mousedown", handleCloseOption)    
  })

  useEffect(() => {
    handleReacoes(post)
  }, [post])

  function criarNovoComentario(event: FormEvent) {
    event.preventDefault()
    setComentarios([...comentarios, novoComentarioTexto])
    setNovoComentarioTexto([])
  }

  function atualizarNovoComentario(event: ChangeEvent<HTMLTextAreaElement>) {
    setNovoComentarioTexto([usuario.foto, event.target.value])
  }

  function handleReacoes(post: Postagem) {
    setReacoes({
      curtir: post.curtir,
      amei: post.amei,
      indico: post.indico
    })
  }

  async function handleReactionsUpdate(reacao:string) {
    if (!curtirSelect && !ameiSelect && !indicoSelect) {
      switch (reacao) {
        case "curtir":        
          await atualizarReacoes(`/postagens/curtir/${post.id}`, handleReacoes, {
            headers: {
              Authorization: usuario.token,
            }
          })
          setCurtirSelect(true);
          break;
        case "amei":
          await atualizarReacoes(`/postagens/amei/${post.id}`, handleReacoes, {
            headers: {
              Authorization: usuario.token,
            }
          })
          setAmeiSelect(true);
          break;
        case "indico":
          await atualizarReacoes(`/postagens/indico/${post.id}`, handleReacoes, {
            headers: {
              Authorization: usuario.token,
            }
          })
          setIndicoSelect(true)
          break;
      
        default:
          break;
      }
    }
  }

  return (
    <div className='h-full w-[96%] md:w-4/5 lg:w-1/2 my-4 border-slate-950/75 border flex flex-col rounded-2xl overflow-hidden justify-between'>
            
      <div className='w-full min-h-[80vh]'>
          <div className="relative flex justify-between items-center bg-logoOrange py-2 px-4 text-white">
            <div className='flex items-center gap-1 sm:gap-4'>
              {/* <img src={post.user?.foto} className='h-12 rounded-full' alt={`Imagem do ${post.user?.nome}`} /> */}

              <div className='overflow-hidden rounded-[50%] h-10 sm:h-12 w-10 sm:w-12'>
                <img
                  className='w-full h-full object-cover'
                  src={post.user?.foto}
                  alt={`Imagem do ${post.user?.nome}`}
                />
              </div>
              
              <h3 className='text-sm sm:text-base lg:text-lg font-bold text-center capitalize'>{post.user?.nome}</h3>
            </div>

            <div ref={optionsRef}>
              <SlOptions className="text-2xl sm:text-4xl" onClick={(handleOpenSelect)} />
                <div 
                  className={`absolute top-10 border-2 border-begeCinzento bg-bege rounded-md w-1/4 flex flex-col justify-center items-center p-2 font-semibold text-slate-900 transition-all duration-700 
                  ${openSelect ? 'visible right-4' : 'right-0 invisible opacity-0'}`}>
                  {
                    post.user?.id === usuario.id &&
                      <>
                        <div onClick={handleOpenSelect} className='w-full text-base flex items-center gap-1 hover:text-blue-700'>
                          <ModalPostagem id={post.id.toString()} />
                        </div>
                        <div onClick={handleOpenSelect} className='w-full text-base flex items-center hover:text-red-700'>
                          <ModalPostagemDeletar id={post.id.toString()} />
                        </div>
                      </>
                  }
                  
                  <h2 onClick={handleOpenSelect} className='w-full text-base flex items-center gap-1 hover:text-emerald-600 cursor-pointer'>
                      <IoMdShareAlt />
                      Compartilhar
                  </h2>
                </div>
            </div>
          </div>

          <div className='p-4 w-full h-1/2'>
            <h4 className='max-md:text-lg max-sm:text-base text-xl font-semibold'>{post.titulo}</h4>
            <p className='mt-4 max-sm:text-xs'>{post.texto}</p>
            <p className='my-4 max-sm:text-xs'>Tema: {post.tema?.assunto}</p>
            
            {
              post.foto ?
                <div className='flex justify-center max-h-full max-w-full object-cover overflow-x-auto bg-begeClaro'>
                  <img src={post.foto} alt="foto da postagem" className='object-fill sm:h-96 max-w-full'/>
                </div>
              : post.video && 
                <div className='relative pt-[60.25%] pr-[50.25%] max-sm:pt-[60.25%] max-sm:pr-[80.25%] w-full flex items-center justify-center'>
                  <ReactPlayer 
                    className="absolute top-0 left-0" 
                    width='100%' 
                    height="100%" 
                    url={post.video} />
                </div>
            }

            <div className='flex justify-between items-center border-y border-begeCinzento py-2 w-full'>
              <ul className='w-3/5 flex justify-between max-sm:justify-evenly items-center'>
                <li className='flex items-center cursor-pointer' onClick={() => handleReactionsUpdate('curtir')}>
                  <p className='text-lg max-md:text-sm mr-1'>
                    {reacoes.curtir}
                  </p>
                  <p className='text-2xl max-md:text-xl text-blue-700'>
                    {
                      curtirSelect ?
                        <BsHandThumbsUpFill/>
                      :
                        <BsHandThumbsUp />
                    }
                  </p>
                  <p className='text-base max-md:text-xs ml-1 md:ml-2 max-sm:invisible max-sm:absolute'>Curtir</p>
                </li>

                <li className='flex items-center cursor-pointer' onClick={() => handleReactionsUpdate('amei')}>
                  <p className='text-lg max-md:text-sm mr-1'>
                    {reacoes.amei}
                  </p>
                  <p className='text-3xl max-md:text-2xl text-red-600'>
                    {
                      ameiSelect ?
                        <IoMdHeart />
                      :
                        <IoIosHeartEmpty />
                    }

                  </p>
                  <p className='text-base max-md:text-xs ml-1 md:ml-2 max-sm:invisible max-sm:absolute'>Amei</p>
                </li>
                
                <li className='flex items-center cursor-pointer' onClick={() => handleReactionsUpdate('indico')}>
                  <p className='text-lg max-md:text-sm mr-1'>
                    {reacoes.indico}
                  </p>
                  <p className='text-3xl max-md:text-2xl text-purple-600'>
                    {
                      indicoSelect ?
                        <PiHandHeartFill  />
                      :
                        <PiHandHeartLight />
                    }
                  </p>
                  <p className='text-base max-md:text-xs ml-1 md:ml-2 max-sm:invisible max-sm:absolute'>Indico</p>
                </li>

              </ul>
              <p className='mt-3 max-md:text-sm max-sm:text-[0.6rem] text-end'>
                { new Intl.DateTimeFormat(undefined, {
                    dateStyle: "short",
                    timeStyle: "short",
                  }).format(new Date(post.dataLancamento))
                }
              </p>
            </div>
  
            {
              !owner &&
                <div className='w-full rounded-lg'>
                    <form onSubmit={criarNovoComentario} className='flex flex-col py-4 sm:p-4'>
                        <div className='flex items-center gap-4 sm:gap-2'>
                          <div className='overflow-hidden rounded-[50%] h-10 lg:h-12 w-10 lg:w-12 border border-marrom/40'>
                            <img
                              className='w-full h-full object-cover'
                              src={usuario.foto}
                              alt={`Imagem do ${usuario.nome}`}
                            />
                          </div>

                          <textarea
                            className='w-4/5 p-3 max-sm:text-xs bg-begeClaro/40 rounded-2xl resize-none border border-marrom/20 focus:outline-marrom/40 placeholder:text-slate-500'
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
                              className="max-sm:text-xs bg-laranjaMarrom hover:bg-laranjaMarrom/90 text-white font-bold mt-2 ml-14 py-1 sm:py-2 px-4 rounded-full"
                              type="submit">
                                Publicar
                            </button>

                          }
                        </footer>
                    </form>
                </div>
            }

            <div className='w-full sm:p-4'>
              <h2 className='mb-4 font-bold max-sm:text-sm'>Comentários</h2>

              {comentarios.map((comentario, index) => {
                  return (
                    <div key={index + comentario[1]} className='flex gap-2 items-center my-2'>
                      <div className='overflow-hidden rounded-[50%] h-10 lg:h-12 w-10 lg:w-12 border border-marrom/40'>
                        <img
                          className='w-full h-full object-cover'
                          src={comentario[0]}
                          alt='Imagem de perfil'
                        />
                      </div>
                      <p className="w-4/5 p-2 bg-begeClaro rounded-lg max-sm:text-xs">{comentario[1]}</p>
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