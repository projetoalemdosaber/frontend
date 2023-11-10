import { Flip, toast } from 'react-toastify';

export function toastAlerta(mensagem: string, tipo: string) {
    switch (tipo) {
            
        case 'sucesso':
            toast.success(mensagem, {
                transition: Flip,
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                theme: 'light',
                progress: undefined,
            });
            break;

        case 'info':
            toast.info(mensagem, {
                transition: Flip,
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                theme: 'light',
                progress: undefined,
            });
            break;

        case 'erro':
            toast.error(mensagem, {
                transition: Flip,
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                theme: 'light',
                progress: undefined,
            });
            break;

        default:
            toast.info(mensagem, {
                transition: Flip,
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                theme: 'light',
                progress: undefined,
            });
            break;
    }
}