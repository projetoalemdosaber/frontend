import Popup from 'reactjs-popup';
import FormularioPostagem from '../formularioPostagem/FormularioPostagem';

import 'reactjs-popup/dist/index.css';

function ModalPostagem(props: {id? : string}) {
    return (
        <>
            <Popup
                trigger={
                    <button 
                        className='border rounded px-2 py-2 hover:bg-white hover:text-indigo-800'>
                        {props.id ? "Editar" : "Nova Postagem"}
                    </button>
                }
                modal
            >
                <FormularioPostagem id={props.id} />
            </Popup>
        </>
    );
}

export default ModalPostagem;