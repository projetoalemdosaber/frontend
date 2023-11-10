/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";

import { atualizar, buscar, cadastrar } from "../../../services/Service";
import { AuthContext } from "../../../contexts/AuthContext";

import Tema from "../../../models/Tema";
import { toastAlerta } from "../../../utils/toastAlerta";

function FormularioTema() {

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [tema, setTema] = useState<Tema>({} as Tema);

    const { id } = useParams<{ id: string }>();

    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;

    async function buscarPorId(id: string) {
        try {
            await buscar(`/temas/${id}`, setTema, {
                headers: {
                    'Authorization': token
                }
            })
        } catch (error: any) {
            if (error.toString().includes('403')) {
                toastAlerta('O token expirou, favor logar novamente','info')
                handleLogout()
            }
        }
    }

    useEffect(() => {
        if (token === '') {
            toastAlerta('Você precisa estar logado', 'info');
            navigate('/login');
        }
    }, [token]);

    useEffect(() => {
        if (id !== undefined) {
            buscarPorId(id)
        }
    }, [id])

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setTema({
            ...tema,
            [e.target.name]: e.target.value
        })
    }

    async function gerarNovoTema(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsLoading(true)

        if (id !== undefined) {
            try {
                await atualizar(`/temas`, tema, setTema, {
                    headers: {
                        'Authorization': token
                    }
                })

                toastAlerta('Tema atualizado com sucesso','sucesso')

            } catch (error: any) {
                if (error.toString().includes('403')) {
                    toastAlerta('O token expirou, favor logar novamente','info')
                    handleLogout()
                } else {
                    toastAlerta('Erro ao atualizar o Tema','erro')
                }
            }
        } else {
            try {
                await cadastrar(`/temas`, tema, setTema, {
                    headers: {
                        'Authorization': token
                    }
                })

                toastAlerta('Tema cadastrado com sucesso','sucesso')

            } catch (error: any) {
                if (error.toString().includes('403')) {
                    toastAlerta('O token expirou, favor logar novamente','info')
                    handleLogout()
                } else {
                    toastAlerta('Erro ao cadastrar o Tema','erro')
                }
            }
        }

        setIsLoading(false)
        retornar()
    }

    function retornar() {
        navigate("/temas")
    }

    return (
        <div className="h-screen w-full bg-estudante bg-cover bg-no-repeat">
            <div className="w-full h-full bg-bege/70 flex flex-col items-center justify-center mx-auto">
                <h1 className="text-4xl text-center my-8">
                    {id === undefined ? 'Cadastrar Tema' : 'Editar Tema'}
                </h1>

                <form className="w-1/2 flex flex-col gap-4" onSubmit={gerarNovoTema}>
                    <div className="flex flex-col gap-2 font-semibold">
                        <label htmlFor="assunto">Assunto:</label>
                        <input
                            type="text"
                            placeholder="Assunto do tema..."
                            name='assunto'
                            className="border-2 border-slate-700 rounded p-2"
                            value={tema.assunto}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        />

                        <label htmlFor="descricao">Descrição:</label>
                        <input
                            type="text"
                            placeholder="Descreva aqui seu tema..."
                            name='descricao'
                            className="border-2 border-slate-700 rounded p-2"
                            value={tema.descricao}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        />
                    </div>
                    <button
                        className="w-2/5 py-2 mx-auto flex justify-center text-xl font-semibold rounded text-slate-100 transition-all duration-300 bg-green-500 hover:bg-green-400 hover:w-[39%]" type="submit">

                        {isLoading ?
                            <RotatingLines
                                strokeColor="white"
                                strokeWidth="5"
                                animationDuration="0.75"
                                width="24"
                                visible={true}
                            /> :
                            <span>Confirmar</span>
                        }
                    </button>
                </form>
            </div>
        </div>
    )
}

export default FormularioTema