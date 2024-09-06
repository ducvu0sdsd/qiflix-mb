import { createContext, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import { accountContext } from "./AccountContext";
import { api, TypeHTTP } from "../utils/api";
export const movieContext = createContext()

const MovieProvider = ({ children }) => {
    const { accountData } = useContext(accountContext)
    const [movies, setMovies] = useState([])
    const [movieWatching, setMoviesWatching] = useState([])
    const [currentMovie, setCurrentMovie] = useState()
    const [reload, setReload] = useState(true)

    useEffect(() => {
        if (accountData.account) {
            api({ path: '/movies', type: TypeHTTP.GET })
                .then(result => {
                    setMovies(result.reverse())
                })
        }
    }, [accountData.account])


    useEffect(() => {
        if (accountData.currentUser) {
            api({ path: `/movies/get-movies-watching-by-user/${accountData.currentUser._id}`, type: TypeHTTP.GET })
                .then(result => {
                    setMoviesWatching(result)
                })
        }
    }, [accountData.currentUser, reload])

    const data = {
        movies,
        movieWatching,
        currentMovie,
        reload
    }

    const handler = {
        setMovies,
        setMoviesWatching,
        setCurrentMovie,
        setReload
    }

    return (
        <movieContext.Provider value={{ movieData: data, movieHandler: handler }}>
            {children}
        </movieContext.Provider>
    )
}

export default MovieProvider