import {Link, useNavigate} from "react-router-dom";
import {ChangeEvent, useContext, useEffect, useState} from "react";
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
            navigate('/home')
        }
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
    function Login() {
    return (
        <>
            <div className="bg-gradient-to-t from-logoPink to-logoOrange flex lg:grid-cols-2 h-screen justify-center font-bold">
                <form className="flex justify-center items-center flex-col w-1/4 gap-4" >
                    <h2 className="text-bege text-5xl ">Entrar</h2>
                    <div className="flex flex-col w-full">
                        <label htmlFor="usuario" className="text-xl text-bege">E-mail</label>
                        <input
                            type="text"
                            id="usuario"
                            name="usuario"
                            placeholder="Digite seu e-mail"
                            className=" rounded p-2"
                        />
                    </div>
                    <div className="flex flex-col w-full">
                        <label htmlFor="senha" className="text-xl text-bege">Senha</label>
                        <input
                            type="password"
                            id="senha"
                            name="senha"
                            placeholder="Senha"
                            className="rounded p-2"
                        />
                    </div>
                    <button 
                        type='submit' 
                        className="rounded bg-logoGreen flex justify-center
                                   hover:bg-logoGreen/90 text-white w-1/2 py-2 px-4">
                        <span>Entrar</span>
                    </button>

                    <hr className="border-bege w-full" />

                    <p className="text-bege">
                        Ainda não tem uma conta?{' '}
                        <Link to="/cadastro" className="hover:text-logoGreen"> 
                            Cadastre-se
                        </Link>
                    </p>
                </form>
                <div className="fundoLogin hidden lg:block"></div>
            </div>
        </>
    );
}
}
export default Login;