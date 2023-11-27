import { useContext } from "react";
import { Link } from "react-router-dom";

import ListaPostagens from "../../components/postagens/listaPostagens/ListaPostagens";
import ModalPostagem from "../../components/postagens/modalPostagem/ModalPostagem";
import { AuthContext } from "../../contexts/AuthContext";

import { MdFormatListBulleted } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { toastAlerta } from "../../utils/toastAlerta";


function FeedPostagens() {
  const { usuario, handleLogout } = useContext(AuthContext)

  const handleUserLogout = () => {
    handleLogout()
    toastAlerta('Usuário deslogado com sucesso', 'sucesso')
  }
  
  return(
    <>
      <div className="min-h-screen w-full flex justify-center items-center bg-bege">
        <div 
          className="h-[70vh] max-lg:h-[10vh] w-[14%] max-lg:w-[90%] fixed top-[5%] max-lg:top-0 left-0 max-lg:left-0 bg-logoOrange rounded-3xl mt-20 ml-6 md:ml-12 lg:ml-20 flex lg:flex-col items-center justify-between lg:justify-evenly lg:pb-6 text-bege font-semibold z-30" 
        >

          <Link to={'/perfil'} className="w-3/5 max-lg:w-1/4 flex lg:flex-col justify-center items-center gap-2 max-lg:px-3 hover:cursor-pointer">
            <div className='overflow-hidden rounded-[50%] h-10 lg:h-14 w-10 lg:w-14'>
              <img
                className='w-full h-full object-cover'
                src={usuario.foto}
                alt={`Imagem do ${usuario.nome}`}
              />
            </div>
            <p className="text-[0.5rem] lg:text-lg lg:text-center max-md:invisible max-md:absolute">{usuario.nome}</p>
          </Link>
          
          <div className="w-4/5 flex justify-center max-lg:w-1/4">
            <ModalPostagem />
          </div>
          
          <Link to={'/temas'} className="w-4/5 max-lg:w-1/4 flex max-xl:flex-col items-center xl:gap-6" >
            <MdFormatListBulleted className="lg:ml-2 text-2xl lg:text-[2.5rem]"/>
            <p className=" text-[0.7rem] lg:text-lg text-center max-md:invisible max-md:absolute">
              Temas
            </p>
          </Link> 

          <Link to={'/'} onClick={handleUserLogout} className="w-4/5 max-lg:w-1/4 flex max-xl:flex-col items-center xl:gap-6" >
            <FiLogOut className="ml-2 text-2xl lg:text-[2.5rem]"/>
            <p className=" text-[0.7rem] lg:text-lg text-center max-md:invisible max-md:absolute">
              Sair
            </p>
          </Link> 
        </div>

        <ListaPostagens />
      </div>
    </>
  )
}

export default FeedPostagens;