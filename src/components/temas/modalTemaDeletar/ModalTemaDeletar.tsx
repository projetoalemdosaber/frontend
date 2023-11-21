/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { toastAlerta } from '../../../utils/toastAlerta';
import { deletar } from '../../../services/Service';
import { AuthContext } from '../../../contexts/AuthContext';
import { RotatingLines } from 'react-loader-spinner';
import { MdDelete } from 'react-icons/md';

function ModalTemaDeletar(props: {id? : string}) {    
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const id = props.id

  const { usuario } = useContext(AuthContext)
  const token = usuario.token


  useEffect(() => {
      if (token === '') {
          toastAlerta('Você precisa estar logado', 'info')
          navigate('/login')
      }
  }, [token])

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
      <>
        <Popup
          trigger={
            <button className='flex items-center gap-1'>
                <MdDelete />
                Deletar
            </button>
          }
          modal
        >
          <div className='container w-full flex flex-col justify-center items-center bg-bege'>
            <h1 className='text-4xl text-center my-4'>Deletar Tema</h1>

            <p className='w-4/5 text-2xl text-center mb-4'>
                Você tem certeza de que deseja apagar o Tema a seguir?
            </p>

            <div className='flex justify-around w-11/12 my-4 gap-8'>
              <button
                className='rounded text-white bg-marrom hover:bg-marrom/70 w-1/2 py-2'
                onClick={retornar}>
                Não
              </button>

              <button
                className='rounded text-white bg-laranjaMarrom hover:bg-laranjaMarrom/70 w-1/2 py-2 flex justify-center'
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
        </Popup>
      </>
  );
}

export default ModalTemaDeletar;