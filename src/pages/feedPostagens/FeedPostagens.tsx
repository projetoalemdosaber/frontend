import ListaPostagens from "../../components/postagens/listaPostagens/ListaPostagens";
import ModalPostagem from "../../components/postagens/modalPostagem/ModalPostagem";
import { AuthContext } from "../../contexts/AuthContext";
import {useContext} from "react"


function FeedPostagens() {
  const { usuario } = useContext(AuthContext)

  return(
    <>
      <div className="min-h-screen w-full flex justify-center items-center bg-bege">
        <div className="min-h-[70vh] w-1/12 fixed top-[6%] left-0 bg-logoOrange rounded-3xl py-4 p-2 mt-20 ml-6 flex flex-col items-center gap-6 text-bege font-semibold" >
          <img src={usuario.foto} className='w-1/2 rounded-full' alt={`Imagem do ${usuario.nome}`} />
          
          <ModalPostagem />
        </div>

        <ListaPostagens />
      </div>
    </>
  )
}

export default FeedPostagens;