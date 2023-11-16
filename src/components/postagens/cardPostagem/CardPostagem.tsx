import { Link } from 'react-router-dom'
import Postagem from '../../../models/Postagem'
import { AuthContext } from '../../../contexts/AuthContext'
import { useContext } from 'react'
import ModalPostagem from '../modalPostagem/ModalPostagem'

interface CardPostagemPostagem {
  post: Postagem
}

function CardPostagem({post} : CardPostagemPostagem) {
  
  const { usuario } = useContext(AuthContext)
  
  return (
      <div className='h-full w-2/3 my-4 border-slate-950/75 border flex flex-col rounded-2xl overflow-hidden justify-between'>
              
        <div className='w-full min-h-[80vh]'>
            <div className="flex bg-logoOrange py-2 px-4 items-center gap-4">
                <img src={post.user?.foto} className='h-12 rounded-full' alt={`Imagem do ${post.user?.nome}`} />
                <h3 className='text-lg text-bege font-bold text-center uppercase'>{post.user?.nome}</h3>
            </div>
            <div className='p-4 '>
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

        {
          post.user?.id === usuario.id &&
            <div className="flex">
                {/* <Link to={`/editarPostagem/${post.id}`} className='w-full text-white bg-indigo-400 hover:bg-indigo-800 flex items-center justify-center py-2'>
                    <button>Editar</button>
                </Link> */}
                <ModalPostagem id={post.id.toString()}/>
                <Link to={`/deletarPostagem/${post.id}`} className='text-white bg-red-400 hover:bg-red-700 w-full flex items-center justify-center'>
                    <button>Deletar</button>
                </Link>
            </div>
        }

      </div>
  )
}

export default CardPostagem