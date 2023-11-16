import { Link } from 'react-router-dom'
import Tema from '../../../models/Tema'
import { SlOptions } from "react-icons/sl";
import { IoMdShareAlt } from "react-icons/io";
import { MdDelete, MdCreate } from "react-icons/md";
import { useState } from 'react';

interface CardTemasProps {
  tema: Tema
}

function CardTemas({tema} : CardTemasProps) {
    const [openSelect, setOpenSelect] = useState(false)

    const handleOpenSelect = () => {
        setOpenSelect((prev) => !prev)
    }

    return (
        <div className='relative flex flex-col rounded-2xl overflow-hidden justify-between shadow-sm shadow-black'>
            <header className='flex justify-between items-center py-2 px-6 bg-logoOrange text-white font-bold text-xl'>
                {tema.assunto} 
                <SlOptions onClick={handleOpenSelect} className="cursor-pointer" />
                {openSelect &&
                    <div className='absolute top-2 right-4 border-2 border-begeCinzento bg-bege w-2/5 h-1/5 flex flex-col justify-center items-center p-2 font-semibold text-slate-900'>
                        <Link 
                            to={`/editarTema/${tema.id}`} 
                            onClick={handleOpenSelect}
                            className='w-full text-base flex items-center gap-1 hover:text-blue-700'>
                            <MdCreate />
                            Editar
                        </Link>
                        <Link 
                            to={`/deletarTema/${tema.id}`} 
                            onClick={handleOpenSelect}
                            className='w-full text-base flex items-center gap-1 hover:text-red-700'>
                            <MdDelete />
                            Deletar
                        </Link>
                        <h2 className='w-full text-base flex items-center gap-1 hover:text-green-700 cursor-pointer'>
                            <IoMdShareAlt />
                            Compartilhar
                        </h2>
                    </div>
                }
            </header>
            {/* <h2 className='px-8 py-4 text-2xl bg-slate-200 h-full'>{tema.assunto}</h2> */}
            <p className='p-8 text-xl bg-bege h-full text-justify'>
                {tema.descricao}
            </p>
        </div>
    )
}

export default CardTemas