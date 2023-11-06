/* eslint-disable @typescript-eslint/ban-types */
import axios from "axios";

const api = axios.create({
    baseURL: 'https://redesocial-6qcp.onrender.com'
})

export const login = async (url: string, dados: object, setDados: Function) => {
  const resposta = await api.post(url, dados)
  setDados(resposta.data)
}

export const cadastrarUsuario = async(url: string, dados: object, setDados: Function) => { 
  const resposta = await api.post(url, dados)
  setDados(resposta.data)
}

export const buscar = async (url: string, setDados: Function, header: Object) => {
  const resposta = await api.get(url, header)
  setDados(resposta.data)
}