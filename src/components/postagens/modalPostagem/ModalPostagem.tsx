import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { MdCreate, MdOutlinePostAdd } from "react-icons/md";

import FormularioPostagem from '../formularioPostagem/FormularioPostagem';
import { AuthContext } from '../../../contexts/AuthContext';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

function ModalPostagem(props: {id? : string}) {    
    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);

    const navigate = useNavigate();

    const { handleReloading } = useContext(AuthContext)

    function back() {
        handleReloading()
        closeModal()
        navigate("/perfil")
    }

    return (
        <>
            <button type="button" onClick={() => setOpen(o => !o)}>
                { props.id ? 
                    <div className='flex items-center gap-1'>
                        <MdCreate /> 
                        <p>Editar</p>
                    </div>
                : <MdOutlinePostAdd size={'3rem'} /> }
            </button>
            <Popup
                contentStyle={ {width : '40%', padding: '0'}}
                overlayStyle={{background: 'rgb(36, 23, 0, 0.5)'}}
                open={open}
                closeOnDocumentClick
                onClose={closeModal}
                modal
            >
                <FormularioPostagem id={props.id} back={back}/>
            </Popup>
        </>
    );
}

export default ModalPostagem;