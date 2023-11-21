import { useContext } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext"

function Home() {
    const {usuario} = useContext(AuthContext);

    return (
        <>
            <div className="h-screen w-full bg-homeBackground bg-cover bg-no-repeat bg-center">
                <div className="h-full w-full flex justify-center items-center bg-laranjaMarrom/40">
                    <div className='text-bege flex justify-evenly items-center'>
                        <div className="flex flex-col items-center justify-center w-2/5">
                            <h1 className='xl:text-6xl text-5xl font-bold mb-8 text-center font-crimson'>
                                Seja Bem Vinde ao Além do Saber!
                            </h1>
                            <p className='xl:text-3xl text-3xl text-justify font-semibold font-crimson'>
                                Venham expandir seu conhecimento em uma rede social educacional de apoio. Descubra novos horizontes com o Além do Saber!
                            </p>
                            {usuario.token === "" &&
                                <Link to={'/cadastro'} className="text-xl p-3 mt-10 bg-laranjaMarrom rounded-2xl hover:bg-laranjaMarrom/80 transition-all duration-300">Cadastre-se</Link>
                            }
                        </div>
                    </div>
                </div>
            </div>

            <div className= "w-full h-full bg-bege flex-col p-10">
                <h2 className=" text-5xl text-center mb-8 font-crimson">
                    Sobre Nós
                </h2>
                <p className="text-justify text-xl my-3">
                    Além do Saber é uma plataforma de mídia social dedicada a promover a educação de alta qualidade. Aqui, criamos um espaço que favorece a conectividade e a interação entre indivíduos em um ambiente acessível e sem custos, pois acreditamos firmemente no poder da colaboração e do apoio mútuo para fazer uma diferença real.
                </p>

                <p className="text-justify text-xl my-3">
                    Nosso principal objetivo, nesta rede social, é contribuir para o cumprimento do Objetivo de Desenvolvimento Sustentável 4 da ONU (Educação de Qualidade), que estabelece a meta de, até 2030, garantir que todos os jovens e uma parcela significativa dos adultos, tanto homens quanto mulheres, estejam alfabetizados e tenham adquirido conhecimentos fundamentais em matemática.           
                </p>

                <p className="text-justify text-xl my-3">
                    Esta plataforma desempenha um importante papel na disseminação da educação de maneira gratuita e na reunião de pessoas de diversas origens em prol do avanço educacional. Fornecemos uma rede de apoio para capacitar aqueles que podem estar se sentindo desmotivados em relação à aprendizagem e ao desenvolvimento, ao mesmo tempo em que lhes disponibilizamos as ferramentas necessárias para esse fim.
                </p>
            </div>

            <div className= "h-full bg-bege flex flex-col flex-wrap items-center p-10">
                <h2 className="text-5xl text-start mb-10 font-crimson">
                   Nosso Time
                </h2>
                <div className="flex justify-center sm:justify-between md:ml-7 md:mr-7 flex-wrap md:flex-nowrap gap-8">
                    <div className="flex flex-col items-center">
                        <img src="/img/fotosContato/Ingrid2.jpg" className="w-48 rounded-full" alt="Ingrid Manfrin" />
                        <p className="mt-2 text-center">Ingrid Manfrin</p>
                        <div className="flex justify-evenly w-full mt-5">
                        <a href="https://www.linkedin.com/in/ingrid-manfrin-caldeira/" target="_blank"><img src="/img/logos/logo_linkedin.png" className="w-12 rounded-full"/></a>
                        <a href="https://github.com/ingridmanfrin/ingridmanfrin" target="_blank"><img src="/img/logos/logo_github.png" className="w-12 rounded-full"/></a>
                        </div>
                    </div>
                    <div>
                        <img src="/img/fotosContato/Joao2.jpg" className="w-48 rounded-full" alt="João Maia" />
                        <p className="mt-2 text-center">João Maia</p>
                        <div className="flex justify-evenly w-full mt-5">
                        <a href="https://www.linkedin.com/in/joaopedrodamaia/" target="_blank"><img src="/img/logos/logo_linkedin.png" className="w-12 rounded-full"/></a>
                        <a href="https://github.com/JP328" target="_blank"><img src="/img/logos/logo_github.png" className="w-12 rounded-full"/></a>
                        </div>
                    </div>
                    <div>
                        <img src="/img/fotosContato/Monique2.jpg" className="w-48 rounded-full" alt="Monique Rosa" />
                        <p className="mt-2 text-center">Monique Rosa</p>
                        <div className="flex justify-evenly w-full mt-5">
                        <a href="https://www.linkedin.com/in/rosamonique/" target="_blank"><img src="/img/logos/logo_linkedin.png" className="w-12 rounded-full"/></a>
                        <a href="https://github.com/mnqrs" target="_blank"><img src="/img/logos/logo_github.png" className="w-12 rounded-full"/></a>
                        </div>
                    </div>
                    <div>
                        <img src="/img/fotosContato/Robson2.jpg" className="w-48 rounded-full" alt="Robson Rocha" />
                        <p className="mt-2 text-center">Robson Rocha</p>
                        <div className="flex justify-evenly w-full mt-5">
                        <a href="https://www.linkedin.com/in/robson-it/" target="_blank"><img src="/img/logos/logo_linkedin.png" className="w-12 rounded-full"/></a>
                        <a href="https://github.com/robson-it" target="_blank"><img src="/img/logos/logo_github.png" className="w-12 rounded-full"/></a>
                        </div>
                    </div>
                    <div>
                        <img src="/img/fotosContato/Udson2.jpg" className="w-48 rounded-full" alt="Udson Costa" />
                        <p className="mt-2 text-center">Udson Costa</p>
                        <div className="flex justify-evenly w-full mt-5">
                        <a href="https://www.linkedin.com/in/udsoncosta/" target="_blank"><img src="/img/logos/logo_linkedin.png" className="w-12 rounded-full"/></a>
                        <a href="https://github.com/udsoncosta" target="_blank"><img src="/img/logos/logo_github.png" className="w-12 rounded-full"/></a>
                        </div>
                    </div>
                </div>

                <h2 className="text-5xl text-start mb-10 mt-16 font-crimson">
                    Contato
                </h2>
                <ul className="text-xl flex flex-wrap justify-center md:space-x-20 mb-4 gap-6">
                    {/* <li>
                    <img src="/img/146135330.png" className="w-20" alt="logo Além do Saber" />
                    </li> */}
                    <li>
                    <a href='mailto:alemdosaberAS@gmail.com' target="_blank"><img src="/img/logos/logoEmail.png" className="w-12 rounded-full"/></a>
                    </li>
                    <li>
                    <a href='https://github.com/projetoalemdosaber' target="_blank"><img src="/img/logos/logo_github.png" className="w-12 rounded-full"/></a>
                    </li>
                    <li>
                    <a target="_blank"><img src="/img/logos/logo_linkedin.png" className="w-12 rounded-full"/></a>
                    </li>
                    <li>
                    <a target="_blank"><img src="/img/logos/logo_instagram.png" className="w-12 rounded-full"/></a>
                    </li>
                    <li>
                    <a target="_blank"><img src="/img/logos/logo_facebook.png" className="w-12 rounded-full"/></a>
                    </li>
                </ul>

            </div>
        </>
    )
}

export default Home