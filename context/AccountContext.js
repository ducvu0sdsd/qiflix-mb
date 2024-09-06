import { createContext, useEffect, useState } from "react";
import { api, TypeHTTP } from "../utils/api";

export const accountContext = createContext()

const AccountProvider = ({ children }) => {

    const [account, setAccount] = useState()
    const [users, setUsers] = useState([])
    const [currentUser, setCurrentUser] = useState()

    useEffect(() => {
        if (account) {
            api({ path: `/users/${account?._id}`, type: TypeHTTP.GET })
                .then(result => {
                    setUsers(result)
                })
        }
    }, [account])

    const data = {
        account,
        users,
        currentUser
    }

    const handler = {
        setAccount,
        setUsers,
        setCurrentUser
    }

    return (
        <accountContext.Provider value={{ accountData: data, accountHandler: handler }}>
            {children}
        </accountContext.Provider>
    )
}

export default AccountProvider