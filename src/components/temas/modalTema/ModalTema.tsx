import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { IoDuplicate } from 'react-icons/io5';

import FormularioTema from '../formularioTema/FormularioTema';
import { useContext, useState } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

function ModalTema(props: {id? : string}) {    
    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);

    const navigate = useNavigate();

    const { handleReloading } = useContext(AuthContext)

    function back() {
        handleReloading()
        closeModal()
        navigate("/temas")
    }

    return (
        <>
            <button type="button" onClick={() => setOpen(o => !o)}>
                { props.id ? "Editar" : <IoDuplicate size={'4rem'} /> }
            </button>
            <Popup
                contentStyle={ {width : '50%', padding: '0'}}
                overlayStyle={{background: 'rgb(36, 23, 0, 0.5)'}}
                open={open}
                closeOnDocumentClick
                onClose={closeModal}
                modal
            >
              <FormularioTema id={props.id} back={back}/>
            </Popup>
        </>
    );
}

export default ModalTema;