/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProgressBar } from 'react-loader-spinner';

import { buscar } from '../../../services/Service';
import { AuthContext } from '../../../contexts/AuthContext';

import Postagem from '../../../models/Postagem';
import CardPostagem from '../cardPostagem/CardPostagem';
import { toastAlerta } from '../../../utils/toastAlerta';

function ListaPostagens() {

    const navigate = useNavigate();

    const [postagens, setPostagens] = useState<Postagem[]>([]);

    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;

    async function buscarPostagens() {
        try {
            await buscar('/postagens', setPostagens, {
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

    useEffect(() => {
        if (token === '') {
            toastAlerta('Você precisa estar logado', 'info')
            navigate('/');
        }
    }, [token])

    useEffect(() => {
        buscarPostagens()
    }, [postagens.length])

    console.log(postagens);
    
    return (
        <>
        {postagens.length === 0 && (
            <ProgressBar
                visible={true}
                height="200"
                width="700"
                ariaLabel="progress-bar-loading"
                wrapperStyle={{}}
                barColor="rgba(234, 159, 49)"
                borderColor="transparent"
                wrapperClass="progress-bar-wrapper mx-auto"
            />
        )}

        <div className='container mx-auto mt-24 flex flex-col justify-center items-center'>

            {postagens.map((postagem) => (
                <CardPostagem key={postagem.id} post={postagem} />
            ))}

        </div>
    </>
)
}

export default ListaPostagens