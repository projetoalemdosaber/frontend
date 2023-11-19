import {ChangeEvent, useContext, useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";

import {AuthContext} from "../../contexts/AuthContext";
import UsuarioLogin from "../../models/UsuarioLogin.ts";

import {RotatingLines} from "react-loader-spinner";


function Login() {

    const navigate = useNavigate();
    const { usuario, handleLogin, isLoading } = useContext(AuthContext);

    const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>(
        {} as UsuarioLogin
    );

    useEffect(() => {
        if (usuario.token !== "") {
            navigate('/feed')
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [usuario])

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setUsuarioLogin({
            ...usuarioLogin,
            [e.target.name]: e.target.value
        })
    }

    function login(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()
        handleLogin(usuarioLogin)
    } 

    return (
        <>
            <div className="flex h-screen w-full justify-center items-center font-bold relative">
                <video 
                    src="/img/pexels-c-technical-6334253.mp4" 
                    className="-z-10 absolute w-full h-full object-cover"
                    autoPlay muted loop/>
                
                <form 
                    className="w-4/5 md:w-3/5 lg:w-1/3 h-3/5 flex justify-center bg-marrom/50 backdrop-blur-sm rounded items-center flex-col p-8"
                    onSubmit={login}
                >
                    <h2 className="text-white text-5xl mt-4">Entrar</h2>
                    <div className="flex flex-col w-full my-3">
                        <label htmlFor="usuario" className="text-xl text-bege">E-mail</label>
                        <input
                            type="text"
                            id="usuario"
                            name="usuario"
                            placeholder="Digite seu e-mail"
                            className=" rounded p-2"
                            value={usuarioLogin.usuario}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}

                        />
                    </div>
                    <div className="flex flex-col w-full my-3">
                        <label htmlFor="senha" className="text-xl text-bege">Senha</label>
                        <input
                            type="password"
                            id="senha"
                            name="senha"
                            placeholder="Senha"
                            className="rounded p-2"
                            value={usuarioLogin.senha}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        />
                    </div>
                    <button 
                        type='submit' 
                        className="w-1/2 rounded text-white flex justify-center mt-2 py-2 px-4 bg-laranjaMarrom hover:bg-laranjaMarrom/90">

                       {isLoading ? <RotatingLines
                            strokeColor="white"
                            strokeWidth="5"
                            animationDuration="0.75"
                            width="24"
                            visible={true}
                        /> :
                        <span>Entrar</span>}
                    </button>

                    <hr className="border-bege w-full my-4" />

                    <p className="text-bege font-semibold mb-2">
                        Ainda não tem uma conta? {" "}  
                        <Link to="/cadastro" className="hover:text-logoOrange"> 
                            Cadastre-se
                        </Link>
                    </p>
                </form>
                <div className="hidden lg:block"></div>
            </div>
        </>
    );
}
export default Login;