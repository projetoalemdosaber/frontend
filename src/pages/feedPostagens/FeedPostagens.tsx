import ListaPostagens from "../../components/postagens/listaPostagens/ListaPostagens";
import ModalPostagem from "../../components/postagens/modalPostagem/ModalPostagem";

function FeedPostagens() {
  return(
    <>
      <div className="min-h-screen w-full flex justify-center items-center">
        <ModalPostagem />
        <ListaPostagens />
      </div>
    </>
  )
}

export default FeedPostagens;