import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { MdOutlinePostAdd } from "react-icons/md";

import FormularioPostagem from '../formularioPostagem/FormularioPostagem';

function ModalPostagem(props: {id? : string}) {    
    return (
        <>
            <Popup
                trigger={
                    <button>
                        { props.id ? "Editar" : <MdOutlinePostAdd size={'3rem'} /> }
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