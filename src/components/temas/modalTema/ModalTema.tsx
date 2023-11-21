import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { IoDuplicate } from 'react-icons/io5';

import FormularioTema from '../formularioTema/FormularioTema';

function ModalTema(props: {id? : string}) {    
    return (
        <>
            <Popup
                trigger={
                    <button>
                        { props.id ? "Editar" : <IoDuplicate size={'4rem'} /> }
                    </button>
                }
                closeOnDocumentClick
                modal
            >
              <FormularioTema id={props.id}/>
              {/* <FormularioTema id={props.id} /> */}
            </Popup>
        </>
    );
}

export default ModalTema;