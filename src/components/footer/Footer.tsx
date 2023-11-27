function Footer() {

    const data = new Date().getFullYear()

    return (
        <>
            <div className="flex justify-center bg-begeCinzento font-noto-sans-symbols">
                <div className="container flex flex-col items-center py-4">
                    <p className='text-xs lg:text-md'>
                            Além do Saber | Todos os direitos reservados {data}&copy; 
                        </p>
                    
                    
                </div>
            </div>
        </>
    )
}

export default Footer