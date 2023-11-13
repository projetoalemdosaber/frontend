import ListaPostagens from "../../components/postagens/listaPostagens/ListaPostagens";
import ModalPostagem from "../../components/postagens/modalPostagem/ModalPostagem";

function FeedPostagens() {
  return(
    <>
      <div className="min-h-screen w-full flex justify-center items-center">
        <div className="min-h-[70vh] w-1/12 fixed top-[6%] left-0 border border-logoOrange rounded-sm mt-20 ml-6">
          <ModalPostagem />
        </div>

        <ListaPostagens />
      </div>
    </>
  )
}

export default FeedPostagens;