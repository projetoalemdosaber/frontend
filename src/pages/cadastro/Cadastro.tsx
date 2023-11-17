import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import Usuario from "../../models/Usuario";
import { buscar, cadastrarUsuario } from "../../services/Service";
import { RotatingLines } from "react-loader-spinner";
import { toastAlerta } from "../../utils/toastAlerta";

function Cadastro() {

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [confirmarSenha, setConfirmarSenha] = useState<string>("")

  const [emailIsValidate, setEmailIsValidate] = useState("")

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

  async function buscarEmail(email : string) {
    await buscar(`/usuarios/email/${email}`, setEmailIsValidate, {headers: {}})
    console.log(emailIsValidate);
  }

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
        buscarEmail(usuario.usuario)

        if (emailIsValidate === '') {
          try {
              await cadastrarUsuario(`/usuarios/cadastrar`, usuario, setUsuario)
              toastAlerta('Usuário cadastrado com sucesso', 'sucesso')
  
          } catch (error) {
              toastAlerta('Erro ao cadastrar o Usuário', 'erro')
          }
        } else {
          toastAlerta('Email já utilizado! Tente com outro e-mail', 'erro')
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
      <div className="w-full min-h-screen bg-transparent flex justify-center items-center font-bold">
        <video 
          src="/img/pexels-c-technical-6334257.mp4" 
          className="absolute top-0 left-0 -z-10"
          autoPlay muted loop
        />
        <form 
          onSubmit={cadastrarNovoUsuario} 
          className='w-1/2 mt-[4.5rem] mb-4 flex flex-col justify-center items-center rounded-3xl px-6 py-4 bg-begeCinzento/70 gap-2'
        >
          <h2 className='text-5xl text-bege'>Cadastrar</h2>
          <div className="flex flex-col w-full">
            <label htmlFor="nome" className="text-white text-lg font-bold">Nome</label>
            <input
              type="text"
              id="nome"
              name="nome"
              placeholder="Nome"
              className="rounded p-2 focus-within:outline-none"
              value={usuario.nome}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
              required
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="dataNascimento" className="text-white text-lg font-bold">Data de nascimento</label>
            <input
              type="date"
              id="dataNascimento"
              name="dataNascimento"
              placeholder="Data de Nascimento"
              className="rounded p-2 focus-within:outline-none"
              value={usuario.dataNascimento}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
              required
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="usuario" className="text-white text-lg font-bold">E-mail</label>
            <input
              type="email"
              id="usuario"
              name="usuario"
              placeholder="Digite seu e-mail"
              className="rounded p-2 focus-within:outline-none"
              value={usuario.usuario}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
              required
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="foto" className="text-white text-lg font-bold">Foto</label>
            <input
              type="text"
              id="foto"
              name="foto"
              placeholder="Foto"
              className="rounded p-2 focus-within:outline-none"
              value={usuario.foto}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>
          <div className="w-full flex justify-between gap-8">
            <div className="flex flex-col w-1/2">
              <label htmlFor="senha" className="text-white text-lg font-bold">Senha</label>
              <input
                type="password"
                id="senha"
                name="senha"
                placeholder="Senha"
                className="rounded p-2 focus-within:outline-none"
                value={usuario.senha}
                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                required
              />
            </div>
            <div className="flex flex-col w-1/2">
              <label htmlFor="confirmarSenha" className="text-white text-lg font-bold">Confirmar Senha</label>
              <input
                type="password"
                id="confirmarSenha"
                name="confirmarSenha"
                placeholder="Confirmar Senha"
                className="rounded p-2 focus-within:outline-none"
                value={confirmarSenha}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleConfirmarSenha(e)}
                required
              />
            </div>
          </div>

          <div className="flex justify-around w-full mt-4 gap-8">
            <button className='rounded text-white bg-marrom hover:bg-marrom/70 w-1/2 py-2' onClick={back} >
              Cancelar
            </button>

            <button 
              type='submit'
              className='rounded text-white bg-laranjaMarrom hover:bg-laranjaMarrom/70 w-1/2 py-2' 
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