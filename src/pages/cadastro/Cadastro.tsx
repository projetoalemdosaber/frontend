import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import Usuario from "../../models/Usuario";
import { cadastrarUsuario } from "../../services/Service";
import { RotatingLines } from "react-loader-spinner";
import { toastAlerta } from "../../utils/toastAlerta";

function Cadastro() {

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [confirmarSenha, setConfirmarSenha] = useState<string>("")

  const [usuario, setUsuario] = useState<Usuario>({
    id: 0,
    nome: '',
    usuario: '',
    senha: '',
    foto: '',
    dataNascimento: ''
  })

  useEffect(() => {
    if (usuario.id !== 0) {
        back()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usuario])

  function back() {
      navigate('/login')
  }

  function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
    setConfirmarSenha(e.target.value)
  }

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
      setUsuario({
          ...usuario,
          [e.target.name]: e.target.value
      })
  }

  async function cadastrarNovoUsuario(e: FormEvent<HTMLFormElement>) {
      e.preventDefault()

      if (confirmarSenha === usuario.senha && usuario.senha.length >= 8) {
        setIsLoading(true)

        try {
            await cadastrarUsuario(`/usuarios/cadastrar`, usuario, setUsuario)
            toastAlerta('Usuário cadastrado com sucesso', 'sucesso')

        } catch (error) {
            toastAlerta('Erro ao cadastrar o Usuário', 'erro')
        }
      } else {
          toastAlerta('Senha e Confimar senha precisam ser iguais. Sua senha precisa ter 8 caracteres ou mais.', 'info')
          setUsuario({ ...usuario, senha: "" })
          setConfirmarSenha("")
      }

      setIsLoading(false)
  }
  
  return (
    <>
      <div className="bg-gradient-to-t from-logoPink to-logoOrange flex justify-center items-center h-screen font-bold">
        <div className="fundoCadastro hidden lg:block"></div>
        <form 
          onSubmit={cadastrarNovoUsuario} 
          className='flex justify-center items-center flex-col w-2/5 px-3 py-6'
        >
          <h2 className='text-5xl text-bege mt-10'>Cadastrar</h2>
          <div className="flex flex-col w-full">
            <label htmlFor="nome" className="text-white text-xl font-bold">Nome</label>
            <input
              type="text"
              id="nome"
              name="nome"
              placeholder="Nome"
              className="rounded p-2"
              value={usuario.nome}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
              required
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="dataNascimento" className="text-white text-xl font-bold">Data de nascimento</label>
            <input
              type="date"
              id="dataNascimento"
              name="dataNascimento"
              placeholder="Data de Nascimento"
              className="rounded p-2"
              value={usuario.dataNascimento}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
              required
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="usuario" className="text-white text-xl font-bold">E-mail</label>
            <input
              type="email"
              id="usuario"
              name="usuario"
              placeholder="Digite seu e-mail"
              className="rounded p-2"
              value={usuario.usuario}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
              required
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="foto" className="text-white text-xl font-bold">Foto</label>
            <input
              type="text"
              id="foto"
              name="foto"
              placeholder="Foto"
              className="rounded p-2"
              value={usuario.foto}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="senha" className="text-white text-xl font-bold">Senha</label>
            <input
              type="password"
              id="senha"
              name="senha"
              placeholder="Senha"
              className="rounded p-2"
              value={usuario.senha}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
              required
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="confirmarSenha" className="text-white text-xl font-bold">Confirmar Senha</label>
            <input
              type="password"
              id="confirmarSenha"
              name="confirmarSenha"
              placeholder="Confirmar Senha"
              className="rounded p-2"
              value={confirmarSenha}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleConfirmarSenha(e)}
              required
            />
          </div>

          <div className="flex justify-around w-full mt-4 gap-8">
            <button className='rounded text-white bg-red-400 hover:bg-red-700 w-1/2 py-2' onClick={back} >
              Cancelar
            </button>

            <button 
              type='submit'
              className='rounded text-white bg-indigo-400 hover:bg-indigo-900 w-1/2 py-2' 
            >
              {isLoading ? <RotatingLines
                    strokeColor="white"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="24"
                    visible={true}
                  /> :
                  <span>Cadastrar</span>}
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Cadastro