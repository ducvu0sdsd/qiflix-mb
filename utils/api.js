import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
// export const baseURL = 'http://192.168.88.206:8080'
export const baseURL = 'https://qiflix-be.vercel.app'

export const TypeHTTP = {
    GET: 'get',
    POST: 'post',
    PUT: 'put',
    DELETE: 'delete'
}

export const api = ({ body, type, path, port = baseURL }) => {
    return new Promise(async (rejects, resolve) => {
        const accessTokenString = await AsyncStorage.getItem('accessToken');
        if (accessTokenString) {
            const accessToken = JSON.parse(accessTokenString);
            switch (type) {
                case TypeHTTP.GET:
                    axios.get(baseURL + path, { headers: { Authorization: 'Access ' + accessToken } })
                        .then(res => {
                            rejects(res.data)
                        })
                        .catch(() => {
                            refreshToken()
                                .then(async (res) => {
                                    if (res) {
                                        const accessTokenString = await AsyncStorage.getItem('accessToken');
                                        if (accessTokenString) {
                                            const accessToken = JSON.parse(accessTokenString);
                                            axios.get(baseURL + path, { headers: { Authorization: 'Access ' + accessToken } })
                                                .then(res => {
                                                    rejects(res.data)
                                                })
                                        }
                                    }
                                })
                        })
                    break
                case TypeHTTP.DELETE:
                    axios.delete(baseURL + path, { headers: { Authorization: 'Access ' + accessToken } })
                        .then(res => {
                            rejects(res.data)
                        })
                        .catch(() => {
                            refreshToken()
                                .then(async (res) => {
                                    if (res) {
                                        const accessTokenString = await AsyncStorage.getItem('accessToken');
                                        if (accessTokenString) {
                                            const accessToken = JSON.parse(accessTokenString);
                                            axios.delete(baseURL + path, { headers: { Authorization: 'Access ' + accessToken } })
                                                .then(res => {
                                                    rejects(res.data)
                                                })
                                        }
                                    }
                                })
                        })
                    break
                case TypeHTTP.POST:
                    axios.post(baseURL + path, body, { headers: { Authorization: 'Access ' + accessToken } })
                        .then(res => {
                            rejects(res.data)
                        })
                        .catch(() => {
                            refreshToken()
                                .then(async (res) => {
                                    if (res) {
                                        const accessTokenString = await AsyncStorage.getItem('accessToken');
                                        if (accessTokenString) {
                                            const accessToken = JSON.parse(accessTokenString);
                                            axios.post(baseURL + path, body, { headers: { Authorization: 'Access ' + accessToken } })
                                                .then(res => {
                                                    rejects(res.data)
                                                })
                                        }
                                    }
                                })
                        })
                    break
                case TypeHTTP.PUT:
                    axios.put(baseURL + path, body, { headers: { Authorization: 'Access ' + accessToken } })
                        .then(res => {
                            rejects(res.data)
                        })
                        .catch(() => {
                            refreshToken()
                                .then(async (res) => {
                                    if (res) {
                                        const accessTokenString = await AsyncStorage.getItem('accessToken');
                                        if (accessTokenString) {
                                            const accessToken = JSON.parse(accessTokenString);
                                            axios.put(baseURL + path, body, { headers: { Authorization: 'Access ' + accessToken } })
                                                .then(res => {
                                                    rejects(res.data)
                                                })
                                        }
                                    }
                                })
                        })
                    break
                default:
                    return undefined
            }
        } else {
            return undefined
        }
    })
}

export const refreshToken = () => {
    return new Promise(async (rejects, resolve) => {
        const refreshTokenString = await AsyncStorage.getItem('refreshToken');
        if (refreshTokenString) {
            const refreshToken = JSON.parse(refreshTokenString);
            axios.post(baseURL + '/auths/refresh-token', {}, {
                headers: {
                    Authorization: 'Refresh ' + refreshToken
                }
            })
                .then(async (res) => {
                    await AsyncStorage.setItem('accessToken', JSON.stringify(res.data.accessToken))
                    await AsyncStorage.setItem('refreshToken', JSON.stringify(res.data.refreshToken))
                    rejects(true)
                })
                .catch((error) => {
                    rejects(false)
                })
        } else {
            rejects(false)
        }
    })
}