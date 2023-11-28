import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { MdCreate, MdOutlinePostAdd } from "react-icons/md";

import FormularioPostagem from '../formularioPostagem/FormularioPostagem';
import { AuthContext } from '../../../contexts/AuthContext';
import { useState, useContext } from 'react';

function ModalPostagem(props: {id? : string}) {    
    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);

    const { handleReloading } = useContext(AuthContext)

    function back() {
        handleReloading()
        closeModal()
    }

    return (
        <>
            <button type="button" className='flex max-xl:flex-col items-center' onClick={() => setOpen(o => !o)}>
                { props.id ? 
                    <div className='flex items-center gap-1'>
                        <MdCreate /> 
                        <p>Editar</p>
                    </div>
                : 
                    <>
                        <MdOutlinePostAdd className="text-3xl lg:text-[3.8rem] xl:text-[5rem] lg:ml-2" /> 
                        <p className="text-[0.6rem] lg:text-sm text-center max-md:invisible max-md:absolute">
                            Cadastrar Postagem
                        </p>
                    </>
                }
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