/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";

import { atualizar, buscar, cadastrar } from "../../../services/Service";
import { AuthContext } from "../../../contexts/AuthContext";

import Tema from "../../../models/Tema";
import { toastAlerta } from "../../../utils/toastAlerta";

function FormularioTema(props: {id?: string, back? : () => void}) {

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [tema, setTema] = useState<Tema>({} as Tema);

    const {id, back} = props

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
        back()
    }

    // function back() {
    //     navigate("/temas")
    // }

    return (
        <div className="w-full relative">
            <button onClick={back} className="absolute top-0 right-4 text-4xl hover:text-red-600">&times;</button>
            <div className="w-full h-full bg-bege/70 flex flex-col items-center justify-center py-6">
                <h1 className="text-4xl text-center mb-4">
                    {id === undefined ? 'Cadastrar Tema' : 'Editar Tema'}
                </h1>

                <form className="w-4/5 flex flex-col gap-4" onSubmit={gerarNovoTema}>
                    <div className="flex flex-col gap-3">
                        <label htmlFor="assunto" className="font-semibold">Assunto:</label>
                        <input
                            type="text"
                            placeholder="Assunto do tema..."
                            name='assunto'
                            className="border border-marrom/70 rounded p-2 focus:outline-marrom/70"
                            value={tema.assunto}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        />

                        <label htmlFor="descricao" className="font-semibold">Descrição:</label>
                        <input
                            type="text"
                            placeholder="Descreva aqui seu tema..."
                            name='descricao'
                            className="border border-marrom/70 rounded p-2 focus:outline-marrom/70"
                            value={tema.descricao}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        />
                    </div>
                    <button
                        className="w-2/5 mt-3 py-2 mx-auto flex justify-center text-xl font-semibold rounded text-slate-100 bg-laranjaMarrom hover:bg-laranjaMarrom/90" type="submit">

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