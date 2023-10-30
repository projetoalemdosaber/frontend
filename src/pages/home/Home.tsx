function Home() {
    return (
        <>
            <div className="bg-gradient-to-t from-logoPink to-logoOrange flex justify-center items-center h-screen w-screen">
                <div className='text-bege flex justify-center'>
                    <div className="flex flex-col items-center justify-center py-4 w-2/3">
                        <h1 className='xl:text-6xl text-5xl font-bold mb-8 text-center'>
                            Seja Bem Vinde ao Além do Saber!
                        </h1>
                        <p className='xl:text-4xl text-3xl text-justify mx-8'>
                            Venham expandir seu conhecimento em uma rede social educacional de apoio. Descubra novos horizontes com o Além do Saber!
                        </p>
                    </div>
                </div>
            </div>
            <div className= "h-full bg-bege flex-col p-10">
            <h2 className=" text-4xl text-center mb-8">
                Sobre Nós
            </h2>
            <p className="text-justify text-2xl">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolores aliquam placeat quaerat reprehenderit sapiente suscipit nisi illo, nostrum amet itaque nobis error incidunt provident repudiandae quia qui officiis asperiores totam.
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut quas exercitationem, cupiditate molestias voluptate ipsa blanditiis dolores cumque quia? Quisquam provident tempora possimus est nostrum omnis cupiditate expedita incidunt tenetur?
            </p>
            </div>
            <div className= "h-full bg-bege flex-col p-10">
            <h2 className=" text-4xl text-center mb-8">
                Contato
            </h2>
            <ul>
            <li>
            <a href='mailto:alemdosaberAS@gmail.com'>Email</a>
            </li>
            <li>
            <a href='https://github.com/projetoalemdosaber'>GitHub</a>
            </li>
            </ul>
               
            </div>
        </>
    )
}

export default Home