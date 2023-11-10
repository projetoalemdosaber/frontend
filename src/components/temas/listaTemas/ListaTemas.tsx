/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import CardTemas from "../cardTemas/CardTemas"
import Tema from "../../../models/Tema";

import { buscar } from "../../../services/Service";
import { AuthContext } from "../../../contexts/AuthContext";
import { InfinitySpin } from "react-loader-spinner";
import { toastAlerta } from "../../../utils/toastAlerta";

function ListaTemas() {

    const [temas, setTemas] = useState<Tema[]>([]);

    const navigate = useNavigate();

    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;

    async function buscarTemas() {
        try {
          await buscar('/temas', setTemas, {
              headers: { Authorization: token },
          })
        } catch (error: any) {
          if (error.toString().includes('403')) {
              toastAlerta('O token expirou, favor logar novamente', 'erro')
              handleLogout()
          }
        }
    }

    useEffect(() => {
      if (token === '') {
        toastAlerta('Você precisa estar logado', 'sucesso');
        navigate('/login');
      }
    }, [navigate, token])

    useEffect(() => {
      buscarTemas()
    }, [temas.length])

    return (
      <>
        {temas.length === 0 && (
          <InfinitySpin
              color="rgba(114, 121, 46)"
              width="200"
          />
        )}

        <div className="w-full h-screen bg-bege flex justify-center items-center">
            <div className="container flex flex-col">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                    {temas.map((tema) => (
                        <>
                            <CardTemas key={tema.id} tema={tema} />
                        </>
                    ))}

                </div>
            </div>
        </div>
      </>
  )
}

export default ListaTemas;