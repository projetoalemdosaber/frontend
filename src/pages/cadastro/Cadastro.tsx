function Cadastro() {
  return (
    <>
      <div className="bg-gradient-to-t from-logoPink to-logoOrange flex justify-center items-center h-screen font-bold">
        <div className="fundoCadastro hidden lg:block"></div>
        <form className='flex justify-center items-center flex-col w-2/5 px-3 py-6'>
          <h2 className='text-5xl text-bege mt-10'>Cadastrar</h2>
          <div className="flex flex-col w-full">
            <label htmlFor="nome" className="text-white text-xl font-bold">Nome</label>
            <input
              type="text"
              id="nome"
              name="nome"
              placeholder="Nome"
              className="rounded p-2"
             
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="dataNascimento" className="text-white text-xl font-bold">Data de nascimento</label>
            <input
              type="date"
              id="nome"
              name="nome"
              placeholder="Nome"
              className="rounded p-2"

            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="usuario" className="text-white text-xl font-bold">E-mail</label>
            <input
              type="text"
              id="usuario"
              name="usuario"
              placeholder="Digite seu e-mail"
              className="rounded p-2"
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="foto" className="text-white text-xl font-bold">Foto</label>
            <input
              type="text"
              id="foto"
              name="foto"
              placeholder="Foto"
              className="rounded p-2"
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="senha" className="text-white text-xl font-bold">Senha</label>
            <input
              type="password"
              id="senha"
              name="senha"
              placeholder="Senha"
              className="rounded p-2"
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="confirmarSenha" className="text-white text-xl font-bold">Confirmar Senha</label>
            <input
              type="password"
              id="confirmarSenha"
              name="confirmarSenha"
              placeholder="Confirmar Senha"
              className="rounded p-2"
            />
          </div>
          <div className="flex justify-around w-full mt-4 gap-8">
            <button className='rounded text-white bg-red-400 hover:bg-red-700 w-1/2 py-2' >
              Cancelar
            </button>
            <button 
                type='submit'
                className='rounded text-white bg-indigo-400 
                           hover:bg-indigo-900 w-1/2 py-2' 
                >
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Cadastro