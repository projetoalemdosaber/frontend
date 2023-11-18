import ListaPostagens from "../../components/postagens/listaPostagens/ListaPostagens";
import ModalPostagem from "../../components/postagens/modalPostagem/ModalPostagem";
import { AuthContext } from "../../contexts/AuthContext";
import {useContext} from "react"


function FeedPostagens() {
  const { usuario } = useContext(AuthContext)

  return(
    <>
      <div className="min-h-screen w-full flex justify-center items-center bg-bege">
        <div 
          className="h-[70vh] max-lg:h-[10vh] w-[14%] max-lg:w-[90%] fixed top-[5%] max-lg:top-0 left-0 max-lg:left-0 bg-logoOrange rounded-3xl mt-20 ml-6 flex lg:flex-col items-center max-lg:justify-around gap-6 text-bege font-semibold z-30" 
        >

          <div className="w-3/5 max-lg:w-1/4 lg:mt-6 rounded-full flex lg:flex-col justify-center items-center gap-2 max-lg:px-3">
            <img src={usuario.foto} className='min-w-[2.5rem] max-lg:w-2/12 max-md:w-1/3 rounded-full' alt={`Imagem do ${usuario.nome}`} />
            <p className="text-sm md:text-lg max-md:invisible max-md:absolute">{usuario.nome}</p>
          </div>
          
          <div className="w-4/5 max-lg:w-1/4 flex max-lg:flex-col items-center justify-center ">
            <ModalPostagem />
            <p className="text-[0.7rem] lg:text-sm text-center max-md:invisible max-md:absolute" >Cadastrar Postagem</p>
          </div>
        </div>

        <ListaPostagens />
      </div>
    </>
  )
}

export default FeedPostagens;