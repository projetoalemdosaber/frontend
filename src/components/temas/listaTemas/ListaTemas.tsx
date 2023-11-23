/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MagnifyingGlass } from "react-loader-spinner";
import { FaSortAlphaDown, FaSortAlphaDownAlt } from "react-icons/fa";

import CardTemas from "../cardTemas/CardTemas"

import Tema from "../../../models/Tema";
import { buscar } from "../../../services/Service";
import { AuthContext } from "../../../contexts/AuthContext";
import { toastAlerta } from "../../../utils/toastAlerta";
import ModalTema from "../modalTema/ModalTema";

function ListaTemas() {

  const [isLoading, setIsLoading] = useState(true);
  const [temas, setTemas] = useState<Tema[]>([]);

  const navigate = useNavigate();

  const { usuario, handleLogout, reloading } = useContext(AuthContext);
  const token = usuario.token;

  async function buscarTemas(func) {
    setIsLoading(true)
    try {
      await buscar('/temas', func, {
          headers: { Authorization: token },
      })
    } catch (error: any) {
      if (error.toString().includes('403')) {
          toastAlerta('O token expirou, favor logar novamente', 'erro')
          handleLogout()
      }
    }
    setIsLoading(false)
  }

  function handleSortTema(reverse? : boolean) {
    setIsLoading(true)
    const temaSort = temas.sort((a, b) => a.assunto < b.assunto ? -1 : a.assunto > b.assunto ? 1 : 0)
    reverse ?
      setTemas(temaSort.reverse())
    :
      setTemas(temaSort)
    
    setIsLoading(false)
  }

  useEffect(() => {
    if (token === '') {
      toastAlerta('Você precisa estar logado', 'sucesso');
      navigate('/login');
    }
  }, [navigate, token])

  useEffect(() => {
    buscarTemas(setTemas)
  }, [temas.length, reloading])

  return (
    <>
      {isLoading ?
        <div className="w-full min-h-screen flex justify-center items-center">
          <MagnifyingGlass
            visible={true}
            height="200"
            width="200"
            ariaLabel="MagnifyingGlass-loading"
            wrapperStyle={{}}
            wrapperClass="MagnifyingGlass-wrapper"
            glassColor = '#c0efff'
            color = '#C24914'
          />
        </div>
      :
        <div className="w-full min-h-screen bg-bege flex flex-wrap justify-center items-center mt-14 pb-14 max-xl:px-6">
            <div className="container flex flex-col justify-center items-center">
              <h1 className="text-5xl text-center my-10 font-crimson font-semibold">Temas cadastrados</h1>
              
              <div className="w-1/2 min-h-[7rem] flex items-center justify-between px-6 text-bege bg-logoOrange mb-6 rounded-3xl">
                <div className="flex items-center ml-8 md:gap-2">
                  <ModalTema />
                  <p className="w-full md:w-6 text-[0.6rem] md:text-lg  text-center font-semibold">Novo Tema</p>
                </div>
                <div className="flex items-center w-1/2 gap-8">
                  <h2 className="text-3xl font-crimson font-semibold">Filtros:</h2>
                  <div onClick={() => buscarTemas(handleSortTema(false))} className="w-10 cursor-pointer">
                    <FaSortAlphaDown size={'2.5rem'} />
                    <p className="w-full text-[0.6rem] text-center font-semibold">Crescente</p>
                  </div>
                  <div onClick={() => buscarTemas(handleSortTema(true))} className="w-10 cursor-pointer">
                    <FaSortAlphaDownAlt size={'2.5rem'} />
                    <p className="w-full text-[0.6rem] text-center font-semibold">Decrescente</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {
                  temas.map((tema) => <CardTemas key={tema.id} tema={tema} /> )
                }
              </div>
            </div>
        </div>
      }
    </>
  )
}

export default ListaTemas;