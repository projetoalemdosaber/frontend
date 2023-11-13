// import { useContext } from "react"
 import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext"
import { toastAlerta } from "../../utils/toastAlerta";

function Navbar() {

    const [logado, setLogado] = useState(false);
    const { usuario, handleLogout } = useContext(AuthContext)

    const handleLogin = () => {
        handleLogout()
        toastAlerta('Usuário deslogado com sucesso', 'sucesso')
        setLogado(false)
    }

    useEffect(() => {
        if (usuario.token !== "") {
            setLogado(true)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [usuario])

    return (
        <>
            <header className='w-full bg-bege backdrop-blur-sm/90 text-slate-900 flex justify-center py-4 fixed z-50 top-0 shadow-md shadow-black/30'>

                <div className="container flex justify-between text-md">
                    <div className="container flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <img src="/img/146135330.png" alt="Logo" className="max-w-[10%]" />
                            <Link to='/home' className='text-1xl font-bold'>Além do Saber</Link>
                        </div>

                        <nav className='flex gap-8 font-semibold'>
                            <Link to='/home' className='hover:font-bold hover:text-logoRed'>Inicio</Link>                            
                            {
                                logado ?
                                    <>
                                        <Link to='/temas' className='hover:font-bold hover:text-logoRed'>Temas</Link>
                                        <Link to='/postagens' className='hover:font-bold hover:text-logoRed'>Postagens</Link>
                                        <Link to='/cadastroTema' className='hover:font-bold hover:text-logoRed'>Cadastrar Tema</Link>
                                        <Link to='/' className='hover:font-bold hover:text-logoRed' onClick={handleLogin}>Sair</Link>
                                    </>
                                :
                                <>
                                    <Link to='/cadastro' className='hover:font-bold hover:text-logoRed'>Cadastre-se</Link>
                                    <Link to='/login' className='hover:font-bold hover:text-logoRed'>Login</Link>
                                </>
                            }
                            
                        </nav>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Navbar