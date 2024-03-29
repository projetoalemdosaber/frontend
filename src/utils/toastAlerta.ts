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
                className: "font-noto-sans-symbols font-light"
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
                className: "font-noto-sans-symbols font-light"
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
                className: "font-noto-sans-symbols font-light"
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
                className: "font-noto-sans-symbols font-light"
            });
            break;
    }
}