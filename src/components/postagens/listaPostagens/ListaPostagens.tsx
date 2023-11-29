/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MagnifyingGlass } from 'react-loader-spinner';

import { buscar } from '../../../services/Service';
import { AuthContext } from '../../../contexts/AuthContext';

import Postagem from '../../../models/Postagem';
import CardPostagem from '../cardPostagem/CardPostagem';
import { toastAlerta } from '../../../utils/toastAlerta';

function ListaPostagens() {

    const navigate = useNavigate();

    const [postagens, setPostagens] = useState<Postagem[]>([]);

    const { usuario, handleLogout, reloading } = useContext(AuthContext);
    const token = usuario.token;

    async function buscarPostagens() {
        try {
            await buscar('/postagens', handlePostagenSort, {
                headers: {
                    Authorization: token,
                },
            })

        } catch (error: any) {
            if (error.toString().includes('403')) {
                toastAlerta('O token expirou, favor logar novamente', 'info')
                handleLogout()
            }
        }
    }

    function handlePostagenSort(data : Array<Postagem>) {
        const postagensRecentes = data.sort((a, b) => new Date(b.dataLancamento).getTime() - new Date(a.dataLancamento).getTime())

        setPostagens(postagensRecentes)
    }

    useEffect(() => {
        if (token === '') {
            toastAlerta('Você precisa estar logado', 'info')
            navigate('/');
        }
    }, [token])

    useEffect(() => {
        buscarPostagens()
    }, [postagens.length, reloading])
    
    return (
        <>
            <div className='w-full mt-24 flex flex-col justify-center items-center'>
                {postagens.length === 0 && (
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
                )}

                {
                    postagens.map(
                        (postagem => 
                            postagem.user.id !== usuario.id && 
                                <CardPostagem key={postagem.id} post={postagem} />
                        )
                    )
                }
            </div>
        </>
    )
}

export default ListaPostagens