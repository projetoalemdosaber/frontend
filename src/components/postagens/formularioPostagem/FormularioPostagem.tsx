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

function FormularioPostagem(props: {id?: string}) {

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [temas, setTemas] = useState<Tema[]>([])

  const [tema, setTema] = useState<Tema>({ id: 0, assunto: '', descricao: '', })

  const [postagem, setPostagem] = useState<Postagem>({} as Postagem)

  // const { id } = useParams<{ id: string }>()
  const id = props.id

  const { usuario, handleLogout, handleReloading } = useContext(AuthContext)
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

  function back() {
    navigate('/feed');
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

    handleReloading()
    setIsLoading(false)
    back()
  }
  
  const carregandoTema = tema.assunto === '';
    
  const handleTemaSelected = (id : string) => {
    temas.map((item) => item.id === parseInt(id) ? setTema(item) : null)
  }

  return (
    <div className="container flex flex-col mx-auto items-center">
      <h1 className="text-4xl text-center my-4">
        {id !== undefined ? 'Editar Postagem' : 'Cadastrar Postagem'}
      </h1>

      <form className="flex flex-col w-1/2 gap-4" onSubmit={gerarNovaPostagem}>
          <div className="flex flex-col gap-2">
              <label htmlFor="titulo">Título da Postagem</label>
              <input
                  value={postagem.titulo}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                  type="text"
                  placeholder="Insira aqui o Título"
                  name="titulo"
                  required
                  className="border-2 border-slate-700 rounded p-2"
              />
          </div>

          <div className="flex flex-col gap-2">
              <label htmlFor="titulo">Texto da Postagem</label>

              <input
                  value={postagem.texto}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                  type="text"
                  placeholder="Adicione aqui o Texto da Postagem"
                  name="texto"
                  required
                  className="border-2 border-slate-700 rounded p-2"
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
            {id &&
              <label htmlFor="url">Mídia:</label>
            }
            {
              opcaoMidia ?
                <input
                  value={postagem.video}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                  type="url"
                  placeholder="Adicione a url do video..."
                  name="url"
                  required
                  className="border-2 border-slate-700 rounded p-2"
                />
              : 
                <input
                  value={postagem.foto}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                  type="url"
                  placeholder="Adicione a url da imagem..."
                  name="url"
                  required
                  className="border-2 border-slate-700 rounded p-2"
                />
            }

          </div>

          <div className="flex flex-col gap-2">
              <p>Tema da Postagem</p>
              <select name="tema" id="tema" className='border p-2 border-slate-800 rounded'
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
            className='flex justify-center rounded disabled:bg-slate-200 bg-indigo-400 hover:bg-indigo-800 text-white 
            font-bold w-1/2 mx-auto my-4 py-2'
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