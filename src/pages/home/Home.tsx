import { useContext } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext"

function Home() {
    const {usuario} = useContext(AuthContext);

    return (
        <>
            <div className="bg-laranjaMarrom/40 relative flex justify-center items-center h-screen w-full">
                <img src="/img/pexels-keira-burton-6147009.jpg" className="absolute top-0 left-0 -z-10" alt="" />
                <div className='text-bege flex justify-evenly items-center'>
                    <div className="flex flex-col items-center justify-center w-2/5">
                        <h1 className='xl:text-5xl text-4xl font-bold mb-8 text-center'>
                            Seja Bem Vinde ao Além do Saber!
                        </h1>
                        <p className='xl:text-3xl text-2xl text-justify'>
                            Venham expandir seu conhecimento em uma rede social educacional de apoio. Descubra novos horizontes com o Além do Saber!
                        </p>
                        {usuario.token === "" &&
                            <Link to={'/cadastro'} className="text-xl p-3 mt-10 bg-laranjaMarrom rounded-2xl hover:bg-laranjaMarrom/80 transition-all duration-300">Cadastre-se</Link>
                        }
                    </div>
                </div>
            </div>

            <div className= "w-full h-full bg-bege flex-col p-10">
                <h2 className=" text-3xl text-center mb-8">
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

            <div className= "h-full bg-bege flex-col p-10">
                <h2 className="text-4xl text-start mb-8">
                    Contato
                </h2>
                <div className="flex justify-between ml-7 mr-7">
                    <div className="flex flex-col items-center">
                        <img src="/img/fotosContato/Ingrid2.jpg" className="w-48 rounded-full" alt="Ingrid Manfrin" />
                        <div className="flex justify-evenly w-full mt-5">
                        <a href="https://www.linkedin.com/in/ingrid-manfrin-caldeira/" target="_blank"><img src="/img/logos/logo_linkedin.png" className="w-12 rounded-full"/></a>
                        <a href="https://github.com/ingridmanfrin/ingridmanfrin" target="_blank"><img src="/img/logos/logo_github.png" className="w-12 rounded-full"/></a>
                        </div>
                    </div>
                    <div>
                        <img src="/img/fotosContato/Joao2.jpg" className="w-48 rounded-full" alt="João Maia" />
                        <div className="flex justify-evenly w-full mt-5">
                        <a href="https://www.linkedin.com/in/joaopedrodamaia/" target="_blank"><img src="/img/logos/logo_linkedin.png" className="w-12 rounded-full"/></a>
                        <a href="https://github.com/JP328" target="_blank"><img src="/img/logos/logo_github.png" className="w-12 rounded-full"/></a>
                        </div>
                    </div>
                    <div>
                        <img src="/img/fotosContato/Monique2.jpg" className="w-48 rounded-full" alt="Monique Rosa" />
                        <div className="flex justify-evenly w-full mt-5">
                        <a href="https://www.linkedin.com/in/rosamonique/" target="_blank"><img src="/img/logos/logo_linkedin.png" className="w-12 rounded-full"/></a>
                        <a href="https://github.com/mnqrs" target="_blank"><img src="/img/logos/logo_github.png" className="w-12 rounded-full"/></a>
                        </div>
                    </div>
                    <div>
                        <img src="/img/fotosContato/Robson2.jpg" className="w-48 rounded-full" alt="Robson Rocha" />
                        <div className="flex justify-evenly w-full mt-5">
                        <a href="https://www.linkedin.com/in/robson-it/" target="_blank"><img src="/img/logos/logo_linkedin.png" className="w-12 rounded-full"/></a>
                        <a href="https://github.com/robson-it" target="_blank"><img src="/img/logos/logo_github.png" className="w-12 rounded-full"/></a>
                        </div>
                    </div>
                    <div>
                        <img src="/img/fotosContato/Udson2.jpg" className="w-48 rounded-full" alt="Udson Costa" />
                        <div className="flex justify-evenly w-full mt-5">
                        <a href="https://www.linkedin.com/in/udsoncosta/" target="_blank"><img src="/img/logos/logo_linkedin.png" className="w-12 rounded-full"/></a>
                        <a href="https://github.com/udsoncosta" target="_blank"><img src="/img/logos/logo_github.png" className="w-12 rounded-full"/></a>
                        </div>
                    </div>
                </div>
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