/* eslint-disable react-hooks/exhaustive-deps */
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import Usuario from "../../models/Usuario";
import { atualizar, buscar, cadastrarUsuario } from "../../services/Service";
import { RotatingLines } from "react-loader-spinner";
import { toastAlerta } from "../../utils/toastAlerta";
import { AuthContext } from "../../contexts/AuthContext";
import UsuarioLogin from "../../models/UsuarioLogin";

function Cadastro() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [confirmarSenha, setConfirmarSenha] = useState<string>("")

  const [emailIsAvailable, setEmailIsAvailable] = useState("")

  const [usuarioForm, setUsuarioForm] = useState<Usuario>({
    id: 0,
    nome: '',
    usuario: '',
    senha: '',
    foto: '',
    dataNascimento: ''
  })

  const { usuario, handleLogin } = useContext(AuthContext);

  const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>( {} as UsuarioLogin );

  useEffect(() => {
    if (usuarioForm.id !== 0) {
      if (id === undefined) {
        back()
      }
    }
  }, [usuarioForm])

  useEffect(() => {
    if (id !== undefined) {
      buscarUsuarioPorId(id)
    }
  }, [id])

  async function buscarEmail(email : string) {
      setEmailIsAvailable("loading")

      await buscar(`/usuarios/email/${email}`, setEmailIsAvailable, {headers: {}})
      .catch(() => { 
        console.log(emailIsAvailable)
        setEmailIsAvailable('')
      })
  }

  async function buscarUsuarioPorId(id: string) {
    await buscar(`/usuarios/id/${id}`, setUsuarioForm, {
      headers: {
          Authorization: usuario.token,
      },
    })
  }

  function back() {
      navigate('/login')
  }

  function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
    setConfirmarSenha(e.target.value)
  }

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuarioForm({
      ...usuarioForm,
      [e.target.name]: e.target.value
    })    

    if (id !== '' && (e.target.name === 'usuario' || e.target.name === 'senha')) {
      setUsuarioLogin({
        ...usuarioLogin,
        [e.target.name]: e.target.value 
      })
    }

    if (e.target.name === 'usuario' && e.target.value.indexOf('@') > 0 && e.target.value.indexOf('.') > 0) {
      buscarEmail(e.target.value)
    }
  }

  async function cadastrarNovoUsuario(e: FormEvent<HTMLFormElement>) {
      e.preventDefault()

      if (confirmarSenha === usuarioForm.senha && usuarioForm.senha.length >= 8) {
        setIsLoading(true)

        if (emailIsAvailable === 'loading') {
          toastAlerta('Estamos verificando se seu e-mail é válido, aguarde', 'info')

        } else if (emailIsAvailable === '' || usuario.usuario === usuarioForm.usuario) {
          if (id != undefined) {
            try {
              await atualizar(`/usuarios/atualizar`, usuarioForm, setUsuarioForm, {
                headers: {
                    Authorization: usuario.token,
                },
              }).then(() => {
                navigate('/perfil')
                handleLogin(usuarioLogin)
                toastAlerta('Usuário atualizado com sucesso', 'sucesso')
              })
            } catch (error) {
                toastAlerta('Erro ao atualizar os dados do Usuário', 'erro')
            }

          } else {
            try {
              await cadastrarUsuario(`/usuarios/cadastrar`, usuarioForm, setUsuarioForm)
              toastAlerta('Usuário cadastrado com sucesso', 'sucesso')
  
            } catch (error) {
                toastAlerta('Erro ao cadastrar o Usuário', 'erro')
            }
          }

        } else {
          toastAlerta('Email já utilizado! Tente com outro e-mail', 'erro')
        }
        
      } else {
          toastAlerta('Senha e Confimar senha precisam ser iguais. Sua senha precisa ter 8 caracteres ou mais.', 'info')
          setUsuarioForm({ ...usuarioForm, senha: "" })
          setConfirmarSenha("")
      }

      setIsLoading(false)
  }
    
  return (
    <>
      <div className="w-full min-h-screen bg-transparent flex justify-center items-center font-bold max-md:p-4" >
        <video 
          src="/img/pexels-c-technical-6334257.mp4" 
          className="-z-10 absolute w-full h-full object-cover"
          autoPlay muted loop
        />

        <form 
          onSubmit={cadastrarNovoUsuario} 
          className='w-11/12 sm:w-4/5 lg:w-1/2 lg:mt-[4.5rem] md:mb-4 flex flex-col justify-center items-center rounded-3xl px-6 py-2 md:py-4 bg-begeCinzento/70 gap-2'
        >
          <h2 className='text-2xl sm:text-3xl md:text-5xl text-bege'> {id != undefined ? 'Editar Usuário' : 'Cadastrar Usuário'} </h2>
          <div className="flex flex-col w-full">
            <label htmlFor="nome" className="text-white text-base md:text-lg font-bold max-md:pb-1">Nome</label>
            <input
              type="text"
              id="nome"
              name="nome"
              placeholder="Nome"
              className="max-md:text-sm rounded p-2 focus-within:outline-none"
              value={usuarioForm.nome}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
              required
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="dataNascimento" className="text-white text-base md:text-lg font-bold max-md:pb-1">Data de nascimento</label>
            <input
              type="date"
              id="dataNascimento"
              name="dataNascimento"
              placeholder="Data de Nascimento"
              className="max-md:text-sm rounded p-2 focus-within:outline-none"
              value={usuarioForm.dataNascimento}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
              required
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="usuario" className="text-white text-base md:text-lg font-bold max-md:pb-1">E-mail</label>
            <input
              type="email"
              id="usuario"
              name="usuario"
              placeholder="Digite seu e-mail"
              className="max-md:text-sm rounded p-2 focus-within:outline-none"
              value={usuarioForm.usuario}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
              required
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="foto" className="text-white text-base md:text-lg font-bold max-md:pb-1">Foto</label>
            <input
              type="text"
              id="foto"
              name="foto"
              placeholder="Url da sua Foto"
              className="max-md:text-sm rounded p-2 focus-within:outline-none"
              value={usuarioForm.foto}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>
          <div className="w-full flex max-sm:flex-col justify-between items-center max-sm:gap-2">
            <div className="flex flex-col w-[45%] max-sm:w-full">
              <label htmlFor="senha" className="text-white text-base md:text-lg font-bold max-md:pb-1">Senha</label>
              <input
                type="password"
                id="senha"
                name="senha"
                placeholder="Senha"
                className="rounded py-3 px-2 sm:p-2 focus-within:outline-none text-sm sm:text-lg"
                value={usuarioForm.senha}
                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                required
              />
            </div>
            <div className="flex flex-col w-[45%] max-sm:w-full">
              <label htmlFor="confirmarSenha" className="text-white text-base md:text-lg font-bold max-md:pb-1">Confirmar Senha</label>
              <input
                type="password"
                id="confirmarSenha"
                name="confirmarSenha"
                placeholder="Confirmar Senha"
                className="rounded py-3 px-2 sm:p-2 focus-within:outline-none text-sm sm:text-lg"
                value={confirmarSenha}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleConfirmarSenha(e)}
                required
              />
            </div>
          </div>

          <div className="flex justify-around w-full text-sm mt-4 gap-8">
            <button className='rounded text-white bg-marrom hover:bg-marrom/70 w-1/2 py-2' onClick={back} >
              Cancelar
            </button>

            <button 
              type='submit'
              className='rounded text-white bg-laranjaMarrom hover:bg-laranjaMarrom/70 w-1/2 py-2 flex justify-center' 
            >
              {isLoading ? <RotatingLines
                    strokeColor="white"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="24"
                    visible={true}
                  /> :
                  <span> { id != undefined ? "Atualizar" : "Cadastrar"} </span>}
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Cadastro