/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"

import { buscar, deletar } from "../../../services/Service";
import { AuthContext } from "../../../contexts/AuthContext";

import Tema from "../../../models/Tema";
import { RotatingLines } from "react-loader-spinner";
import { toastAlerta } from "../../../utils/toastAlerta";

function DeletarTema() {
    
    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [tema, setTema] = useState<Tema>({} as Tema)

    const { id } = useParams<{ id: string }>()

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    async function buscarPorId(id: string) {
        try {
            await buscar(`/temas/${id}`, setTema, {
                headers: {
                    'Authorization': token
                }
            })
        } catch (error: any) {
            if (error.toString().includes('403')) {
                toastAlerta('O token expirou, favor logar novamente', 'info')
                handleLogout()
            }
        }
    }

    useEffect(() => {
        if (token === '') {
            toastAlerta('Você precisa estar logado', 'info')
            navigate('/login')
        }
    }, [token])

    useEffect(() => {
        if (id !== undefined) {
            buscarPorId(id)
        }
    }, [id])

    async function deletarTema() {
        setIsLoading(true)

        try {
            await deletar(`/temas/${id}`, {
                headers: {
                    'Authorization': token
                }
            })

            toastAlerta('Tema apagado com sucesso', 'sucesso')

        } catch (error) {
            toastAlerta('Erro ao apagar o Tema','erro')
        }

        setIsLoading(false)
        retornar()
    }

    function retornar() {
        navigate("/temas")
    }

return (
    <div className='h-screen container w-1/3 mx-auto flex flex-col justify-center items-center'>
        <h1 className='text-4xl text-center my-4'>Deletar Tema</h1>

        <p className='text-center font-semibold mb-4'>
            Você tem certeza de que deseja apagar o tema a seguir?
        </p>

        <div className='border flex flex-col rounded-2xl overflow-hidden justify-between'>
            <header className='py-2 px-6 bg-logoRed text-white font-bold text-2xl'>
                {tema.assunto}
            </header>

            <p className='p-8 text-xl bg-slate-200 h-full'>{tema.descricao}</p>

            <div className="flex">

                <button
                    className='text-slate-100 bg-red-600 hover:bg-red-500 w-full py-2'
                    onClick={retornar}>
                    Não
                </button>

                <button
                    className='w-full text-slate-100 bg-logoOrange hover:bg-logoOrange/80 
                        flex items-center justify-center'
                    onClick={deletarTema}>

                    {isLoading ?
                        <RotatingLines
                            strokeColor="white"
                            strokeWidth="5"
                            animationDuration="0.75"
                            width="24"
                            visible={true}
                        /> :
                        <span>Sim</span>
                    }
                </button>

            </div>
        </div>
    </div>
);
}
export default DeletarTema