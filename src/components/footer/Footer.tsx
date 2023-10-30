


function Footer() {

    let data = new Date().getFullYear()

    return (
        <>
            <div className="flex justify-center bg-indigo-900 text-white">
                <div className="container flex flex-col items-center py-4">
                    <p className='text-md font-bold'>
                            Além do Saber | Todos os direitos reservados {data}&copy; 
                        </p>
                    
                    
                </div>
            </div>
        </>
    )
}

export default Footer