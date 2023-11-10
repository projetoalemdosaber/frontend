import { Link } from 'react-router-dom'
import Tema from '../../../models/Tema'

interface CardTemasProps {
  tema: Tema
}

function CardTemas({tema} : CardTemasProps) {
    return (
        <div className='border flex flex-col rounded-2xl overflow-hidden justify-between'>
            <header className='py-2 px-6 bg-logoRed text-white font-bold text-xl'>
                {tema.assunto} 
            </header>
            {/* <h2 className='px-8 py-4 text-2xl bg-slate-200 h-full'>{tema.assunto}</h2> */}
            <p className='p-8 text-xl bg-slate-200 h-full text-justify'>
                {tema.descricao}
            </p>

            <div className="flex">
                <Link to={`/editarTema/${tema.id}`}
                    className='w-full text-slate-100 bg-logoOrange hover:bg-logoOrange/80 
                        flex items-center justify-center py-2'>
                    <button>Editar</button>
                </Link>

                <Link to={`/deletarTema/${tema.id}`}
                    className='text-slate-100 bg-red-700 hover:bg-red-500 w-full 
                        flex items-center justify-center'>
                    <button>Deletar</button>
                </Link>
            </div>
        </div>
    )
}

export default CardTemas