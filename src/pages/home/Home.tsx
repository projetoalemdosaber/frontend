function Home() {
    return (
        <>
            <div className="bg-logoPink/50 relative flex justify-center items-center h-screen w-full">
                {/* <video 
                    src="/img/pexels-c-technical-6334253 (720p).mp4" 
                    className="absolute top-0 left-0 -z-10"
                    autoPlay muted loop/> */}
                <img src="/img/pexels-keira-burton-6147009.jpg" className="absolute top-0 left-0 -z-10" alt="" />
                <div className='text-bege flex justify-evenly items-center'>
                    <div className="flex flex-col items-center justify-center py-4 w-2/5">
                        <h1 className='xl:text-5xl text-4xl font-bold mb-8 text-center'>
                            Seja Bem Vinde ao Além do Saber!
                        </h1>
                        <p className='xl:text-3xl text-2xl text-justify'>
                            Venham expandir seu conhecimento em uma rede social educacional de apoio. Descubra novos horizontes com o Além do Saber!
                        </p>
                    </div>
                </div>
            </div>

            <div className= "w-full bg-bege flex-col p-10">
                <h2 className=" text-3xl text-center mb-8">
                    Sobre Nós
                </h2>
                <p className="text-justify text-xl">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolores aliquam placeat quaerat reprehenderit sapiente suscipit nisi illo, nostrum amet itaque nobis error incidunt provident repudiandae quia qui officiis asperiores totam.
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut quas exercitationem, cupiditate molestias voluptate ipsa blanditiis dolores cumque quia? Quisquam provident tempora possimus est nostrum omnis cupiditate expedita incidunt tenetur?
                </p>
            </div>

            <div className= "h-full bg-bege flex-col p-10">
                <h2 className="text-4xl text-start mb-8">
                    Contato
                </h2>
                <ul className="text-xl">
                    <li>
                    <a href='mailto:alemdosaberAS@gmail.com' target="_blank">Email</a>
                    </li>
                    <li>
                    <a href='https://github.com/projetoalemdosaber' target="_blank">GitHub</a>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default Home