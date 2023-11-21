import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { MdCreate, MdOutlinePostAdd } from "react-icons/md";

import FormularioPostagem from '../formularioPostagem/FormularioPostagem';

function ModalPostagem(props: {id? : string}) {    
    return (
        <>
            <Popup
                trigger={
                    <button>
                        { props.id ? 
                            <div className='flex items-center gap-1'>
                                <MdCreate /> 
                                <p>Editar</p>
                            </div>
                        : <MdOutlinePostAdd size={'3rem'} /> }
                    </button>
                }
                closeOnDocumentClick
                modal
            >
                <FormularioPostagem id={props.id} />
            </Popup>
        </>
    );
}

export default ModalPostagem;