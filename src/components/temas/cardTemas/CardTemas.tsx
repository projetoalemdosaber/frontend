import Tema from '../../../models/Tema'
import { SlOptions } from "react-icons/sl";
import { IoMdShareAlt } from "react-icons/io";
import { MdCreate } from "react-icons/md";
import { useEffect, useRef, useState } from 'react';
import ModalTema from '../modalTema/ModalTema';
import ModalTemaDeletar from '../modalTemaDeletar/ModalTemaDeletar';

interface CardTemasProps {
  tema: Tema
}

function CardTemas({tema} : CardTemasProps) {
    const optionsRefTema = useRef({} as HTMLDivElement);
    const [openSelect, setOpenSelect] = useState(false)

    const handleOpenSelect = () => {
        setOpenSelect((prev) => !prev)
    }

    useEffect(() => {      
        const handleCloseOption = (e : MouseEvent) => {
            if (optionsRefTema.current && !optionsRefTema.current.contains(e.target as Node)) {
                setOpenSelect(false)
            }
        }
    
        document.addEventListener("mousedown", handleCloseOption)
    })

    return (
        <div className='relative flex flex-col rounded-2xl overflow-hidden justify-between shadow-sm shadow-black'>
            <header className='flex justify-between items-center py-2 px-2 md:px-4 bg-logoOrange text-white font-bold text-base md:text-xl'>
                {tema.assunto} 
                <div ref={optionsRefTema}>
                    <SlOptions onClick={handleOpenSelect} className="cursor-pointer text-xl md:text-2xl" />
                    <div className={`absolute top-8 border-2 border-begeCinzento bg-bege rounded-md w-1/2 flex flex-col justify-center items-center p-2 font-semibold text-slate-900 transition-all duration-700 
                    ${openSelect ? 'visible right-4' : 'right-0 invisible opacity-0'}`}>
                        <div onClick={handleOpenSelect} className='w-full text-base flex items-center gap-1 hover:text-blue-700'>
                            <MdCreate />
                            <ModalTema id={tema.id.toString() } />
                        </div>
                        <div onClick={handleOpenSelect} className='w-full text-base flex items-center gap-1 hover:text-red-700'>
                            <ModalTemaDeletar  id={tema.id.toString()} />
                        </div>

                        <h2 onClick={handleOpenSelect} className='w-full text-base flex items-center gap-1 hover:text-emerald-600 cursor-pointer'>
                            <IoMdShareAlt />
                            Compartilhar
                        </h2>
                    </div>
                </div>
            </header>
            <p className='p-5 md:p-8 text-sm md:text-lg bg-bege h-full text-justify'>
                {tema.descricao}
            </p>
        </div>
    )
}

export default CardTemas