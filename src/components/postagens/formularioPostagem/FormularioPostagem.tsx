/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { useNavigate,  } from 'react-router-dom';
import { RotatingLines } from 'react-loader-spinner';

import { atualizar, buscar, cadastrar } from "../../../services/Service";
import { AuthContext } from '../../../contexts/AuthContext';

import Tema from '../../../models/Tema';
import Postagem from '../../../models/Postagem';
import { toastAlerta } from '../../../utils/toastAlerta';

function FormularioPostagem(props: {id?: string, back? : () => void}) {

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [temas, setTemas] = useState<Tema[]>([])

  const [tema, setTema] = useState<Tema>({ id: 0, assunto: '', descricao: '', })

  const [postagem, setPostagem] = useState<Postagem>({} as Postagem)

  const {id, back } = props

  const { usuario, handleLogout } = useContext(AuthContext)
  const token = usuario.token

  const [opcaoMidia, setOpcaoMidia] = useState(false);

  async function buscarPostagemPorId(id: string) {
    await buscar(`/postagens/${id}`, setPostagem, {
      headers: {
          Authorization: token,
      },
    })
  }

  async function buscarTemas() {
    await buscar('/temas', setTemas, {
      headers: {
        Authorization: token,
      },
    })
  }

  useEffect(() => {
    if (token === '') {
      toastAlerta('Você precisa estar logado', 'info');
      navigate('/');
    }
  }, [token])

  useEffect(() => {
    buscarTemas()

    if (id !== undefined) {
      buscarPostagemPorId(id)
    }
  }, [id])

  useEffect(() => {
    setPostagem({
      ...postagem,
      tema: tema,
    })
  }, [tema])

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setPostagem({
      ...postagem,
      [e.target.name]: e.target.value,
      tema: tema,
      user: usuario,
    });
  }

  async function gerarNovaPostagem(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)

    if (id != undefined) {
      try {
        await atualizar(`/postagens`, postagem, setPostagem, {
          headers: {
              Authorization: token,
          },
        });
        toastAlerta('Postagem atualizada com sucesso', 'sucesso')
      } catch (error: any) {
        if (error.toString().includes('403')) {
          toastAlerta('O token expirou, favor logar novamente', 'erro')
          handleLogout()
        } else {
          toastAlerta('Erro ao atualizar a Postagem', 'erro')
        }
      }
    } else {
        try {
          await cadastrar(`/postagens`, postagem, setPostagem, {
              headers: {
                  Authorization: token,
              },
          })
          toastAlerta('Postagem cadastrada com sucesso', 'sucesso');
        } catch (error: any) {
          if (error.toString().includes('403')) {
              toastAlerta('O token expirou, favor logar novamente', 'erro')
              handleLogout()
          } else {
              toastAlerta('Erro ao cadastrar a Postagem', 'erro');
          }
        }
    }

    setIsLoading(false)
    back()
  }
  
  const carregandoTema = tema.assunto === '';
    
  const handleTemaSelected = (id : string) => {
    temas.map((item) => item.id === parseInt(id) ? setTema(item) : null)
  }

  return (
    <div className="container bg-bege flex flex-col items-center relative">
      <button onClick={back} className="absolute top-0 right-4 text-4xl hover:text-red-600">&times;</button>

      <h1 className="text-4xl text-center my-4">
        {id !== undefined ? 'Editar Postagem' : 'Cadastrar Postagem'}
      </h1>

      <form className="flex flex-col w-3/5 gap-4" onSubmit={gerarNovaPostagem}>
          <div className="flex flex-col gap-2">
              <label htmlFor="titulo">Título da Postagem</label>
              <input
                  value={postagem.titulo}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                  type="text"
                  placeholder="Insira aqui o Título"
                  name="titulo"
                  required
                  className="border border-marrom/70 rounded p-2 focus:outline-marrom/70"
              />
          </div>

          <div className="flex flex-col gap-2">
              <label htmlFor="texto">Texto da Postagem</label>

              <input
                  value={postagem.texto}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                  type="text"
                  placeholder="Adicione aqui o Texto da Postagem"
                  name="texto"
                  required
                  className="border border-marrom/70 rounded p-2 focus:outline-marrom/70"
              />
          </div>

          {
            !id &&
              <div className="w-4/5 flex flex-col">
                  <h2>Escolha o tipo de mídia:</h2>

                  <div className='flex justify-around'>
                    <div className='grid grid-cols-1'>
                      <label htmlFor="choice1">Foto</label>
                      <input type="radio" id="choice1" name="image-video" onChange={() => setOpcaoMidia(false)} />
                    </div>
                    <div className='grid grid-cols-1'>
                      <label htmlFor="choice2">Video</label>
                      <input type="radio" id="choice2" name="image-video" onChange={() => setOpcaoMidia(true)}/>
                    </div>
                  </div>
              </div>
          }

          <div className='flex flex-col gap-2'>
            {
              opcaoMidia ?
              <>
                <label htmlFor="video">Video:</label>
                <input
                  value={postagem.video}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                  type="url"
                  placeholder="Adicione a url do video..."
                  name="video"
                  className="border border-marrom/70 rounded p-2 focus:outline-marrom/70"
                />
              </>
              : 
                <>
                  <label htmlFor="foto">Foto:</label>
                  <input
                    value={postagem.foto}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    type="url"
                    placeholder="Adicione a url da imagem..."
                    name="foto"
                    className="border border-marrom/70 rounded p-2 focus:outline-marrom/70"
                  />
                </>
            }

          </div>

          <div className="flex flex-col gap-2">
              <p>Tema da Postagem</p>
              <select name="tema" id="tema" className='border border-marrom/70 rounded p-2 focus:outline-marrom/70'
                  onChange={(e) => handleTemaSelected(e.currentTarget.value)}
              >
                <option value="" selected disabled>Selecione um Tema</option>
                {temas.map((tema) => (
                  <>
                    <option value={tema.id}>{tema.assunto}</option>
                  </>
                ))}
              </select>
          </div>
          <button
            type='submit'
            disabled={carregandoTema}
            className='flex justify-center rounded disabled:bg-slate-200 bg-laranjaMarrom hover:bg-laranjaMarrom/80 text-white 
            font-bold w-1/2 mx-auto my-4 py-2 disabled:bg-laranjaMarrom/30'
          >
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
  );
}

export default FormularioPostagem;