import { createContext, ReactNode, useState } from "react"

import UsuarioLogin from "../models/UsuarioLogin"
import { login } from "../services/Service"
import { toastAlerta } from "../utils/toastAlerta"

interface AuthContextProps {
    usuario: UsuarioLogin
    handleLogout(): void
    handleReloading(): void
    handleLogin(usuario: UsuarioLogin): Promise<void>
    isLoading: boolean
    reloading: boolean
}

interface AuthProviderProps {
    children: ReactNode
}

export const AuthContext = createContext({} as AuthContextProps)

export function AuthProvider({ children }: AuthProviderProps) {

    const [usuario, setUsuario] = useState<UsuarioLogin>({
        id: 0,
        nome: "",
        usuario: "",
        senha: "",
        dataNascimento: "",
        foto: "",
        token: ""
    })

    const [isLoading, setIsLoading] = useState(false)

    const [reloading, setReloading] = useState(false)

    function handleReloading() {
        setReloading((prev) => !prev)
    }

    async function handleLogin(userLogin: UsuarioLogin) {
        setIsLoading(true)
        try {
            await login(`/usuarios/logar`, userLogin, setUsuario)
            setIsLoading(false)

        } catch (error) {
            handleLogout()
            toastAlerta("Dados do usuário inconsistentes", 'erro')
            setIsLoading(false)
        }
    }

    function handleLogout() {
        setUsuario({
            id: 0,
            nome: "",
            usuario: "",
            senha: "",
            dataNascimento: "",
            foto: "",
            token: ""
        })
    }

    return (
        <AuthContext.Provider value={{ usuario, handleLogin, handleLogout, isLoading, reloading, handleReloading }}>
            {children}
        </AuthContext.Provider>
    )
}