import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useState } from "react";
import { api, TypeHTTP } from "../utils/api";
import { useNavigation } from "@react-navigation/native";
import { accountContext } from "./AccountContext";
export const authContext = createContext()

const AuthProvider = ({ children }) => {

    const { accountHandler } = useContext(accountContext)
    const [tokens, setTokens] = useState({
        accessToken: '',
        refreshToken: ''
    })

    const checkToken = (pathname) => new Promise(async (resolve, reject) => {
        const publics = ['SignInScreen', 'LandingScreen']
        const accessToken = await AsyncStorage.getItem('accessToken')
        const refreshToken = await AsyncStorage.getItem('refreshToken')
        setTokens({ accessToken, refreshToken })
        if (accessToken && refreshToken) {
            api({ path: '/accounts/get-by-email', sendToken: true, type: TypeHTTP.GET })
                .then(res => {
                    accountHandler.setAccount(res)
                    if (publics.includes(pathname)) {
                        resolve('ManagementProfileScreen')
                    } else {
                        resolve('')
                    }
                })
                .catch(error => {
                    if (!publics.includes(pathname)) {
                        resolve('LandingScreen')
                    } else {
                        resolve('')
                    }
                })
        } else {
            AsyncStorage.removeItem('accessToken')
            AsyncStorage.removeItem('refreshToken')
            if (!publics.includes(pathname)) {
                resolve('LandingScreen')
            } else {
                resolve('')
            }
        }
    })

    const data = {
        tokens
    }

    const handler = {
        checkToken,
        setTokens
    }

    return (
        <authContext.Provider value={{ authData: data, authHandler: handler }}>
            {children}
        </authContext.Provider>
    )
}

export default AuthProvider