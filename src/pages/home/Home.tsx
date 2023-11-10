function Home() {
    return (
        <>
            <div className="bg-logoPink/50 relative flex justify-center items-center h-screen w-full">
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
                Além do Saber é uma plataforma de mídia social dedicada a promover a educação de alta qualidade. Aqui, criamos um espaço que favorece a conectividade e a interação entre indivíduos em um ambiente acessível e sem custos, pois acreditamos firmemente no poder da colaboração e do apoio mútuo para fazer uma diferença real.
                <br/>
                Nosso principal objetivo, nesta rede social, é contribuir para o cumprimento do Objetivo de Desenvolvimento Sustentável 4 da ONU (Educação de Qualidade), que estabelece a meta de, até 2030, garantir que todos os jovens e uma parcela significativa dos adultos, tanto homens quanto mulheres, estejam alfabetizados e tenham adquirido conhecimentos fundamentais em matemática.
                <br/>
                Esta plataforma desempenha um importante papel na disseminação da educação de maneira gratuita e na reunião de pessoas de diversas origens em prol do avanço educacional. Fornecemos uma rede de apoio para capacitar aqueles que podem estar se sentindo desmotivados em relação à aprendizagem e ao desenvolvimento, ao mesmo tempo em que lhes disponibilizamos as ferramentas necessárias para esse fim.
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