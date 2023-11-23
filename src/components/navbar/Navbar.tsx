// import { useContext } from "react"
 import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext"
import { toastAlerta } from "../../utils/toastAlerta";

function Navbar() {

    const [logado, setLogado] = useState(false);
    const { usuario, handleLogout } = useContext(AuthContext)

    const handleUserLogout = () => {
        handleLogout()
        toastAlerta('Usuário deslogado com sucesso', 'sucesso')
        setLogado(false)
    }

    useEffect(() => {
        if (usuario.token !== "") {
            setLogado(true)
        } else {
            setLogado(false)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [usuario])


    return (
        <>
            <header className='w-full bg-begeClaro backdrop-blur-sm/90 text-slate-900 flex fixed z-50 top-0 shadow-md shadow-black/30'>

                <div className="w-[97%] relative py-4 flex justify-end">
                    <div className="absolute left-3 top-1">
                        <Link to='/home'>
                            <img src="/img/146135330.png" alt="Logo" className="max-w-[16%]" />
                        </Link>
                    </div>

                    <nav className='flex gap-8 max-md:text-sm text-base font-bold font-crimson'>
                        <Link to='/home' className='hover:text-laranja'>Inicio</Link>                            
                        {
                            logado ?
                                <>
                                    <Link to='/temas' className='hover:text-laranja'>Temas</Link>
                                    <Link to='/feed' className='hover:text-laranja'>Feed</Link>
                                    <Link to='/perfil' className='hover:text-laranja'>Perfil</Link>
                                    <Link to='/' className='hover:text-laranja' onClick={handleUserLogout}>Sair</Link>
                                </>
                            :
                                <>
                                    <Link to='/cadastro' className='hover:text-laranja'>Cadastre-se</Link>
                                    <Link to='/login' className='hover:text-laranja'>Login</Link>
                                </>
                        }
                        
                    </nav>
                </div>

            </header>
        </>
    )
}

export default Navbar