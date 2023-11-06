// import { useContext } from "react"
 import { useState } from "react";
import { Link } from "react-router-dom"
// import { AuthContext } from "../../contexts/AuthContext"

function Navbar() {

    const [logado, setLogado] = useState(false);

    const handleLogin = () => {
        setLogado(prev => !prev)
    }

    return (
        <>
            <header className='w-full bg-logoRed/90 backdrop-blur-sm text-white flex justify-center py-4 fixed z-50'>

                <div className="container flex justify-between text-md">
                    <div className="container flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <img src="/img/146135330.png" alt="Logo" className="max-w-[10%]" />
                            <Link to='/home' className='text-1xl font-bold'>Além do Saber</Link>
                        </div>

                        <nav className='flex gap-8 font-semibold'>
                            <Link to='/home' className='hover:font-bold'>Inicio</Link>
                            <Link to='/cadastro' className='hover:font-bold'>Cadastre-se</Link>
                            
                            {
                                logado ?
                                <Link to='/login' className='hover:font-bold' onClick={handleLogin}>Sair</Link>
                                :
                                <Link to='/login' className='hover:font-bold' onClick={handleLogin}>Login</Link>
                            }
                            
                        </nav>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Navbar