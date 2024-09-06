import React, { useContext, useEffect, useState } from 'react'
import { Image, ImageBackground, Text, TextInput, TouchableOpacity, View } from 'react-native'
import landingImage from '../assets/landing.png'
import qiflix from '../assets/qiflix.png'
import { utilsContext } from '../context/UtilsContext'
import { notifyType } from '../utils/notify'
import { api, baseURL, TypeHTTP } from '../utils/api'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { accountContext } from '../context/AccountContext'
import { useNavigation, useRoute } from '@react-navigation/native'
import axios from 'axios'
import { authContext } from '../context/AuthContext'

const SignInScreen = () => {
    const { utilsHandler } = useContext(utilsContext)
    const { accountHandler } = useContext(accountContext)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { authHandler } = useContext(authContext)
    const navigation = useNavigation();
    const route = useRoute()
    useEffect(() => {
        authHandler.checkToken(route.name)
            .then(goal => {
                if (goal !== '') {
                    navigation.navigate(goal)
                }
            })
    }, [])


    const handleSignIn = () => {
        if (!/^[a-zA-Z0-9._%+-]+(@gmail.com)$/.test(email)) {
            utilsHandler.notify(notifyType.WARNING, 'Please, enter valid email')
            return
        }
        if (!/.{6,20}/.test(password)) {
            utilsHandler.notify(notifyType.WARNING, 'Please, enter valid password')
            return
        }
        axios.post(baseURL + '/auths/sign-in', { email, password })
            .then(async (res) => {
                await AsyncStorage.setItem('accessToken', JSON.stringify(res.data.accessToken))
                await AsyncStorage.setItem('refreshToken', JSON.stringify(res.data.refreshToken))
                accountHandler.setAccount(res.data.account)
                navigation.navigate('ManagementProfileScreen')
            })
            .catch(res => {
                utilsHandler.notify(notifyType.FAIL, "Email or password doesn't exists in the system")
            })
    }

    return (
        <View style={{ position: 'relative' }}>
            <ImageBackground source={landingImage} style={{ height: '100%', width: '100%', backgroundColor: 'red' }} />
            <View style={{ paddingHorizontal: 20, paddingVertical: 50, flexDirection: 'column', position: 'absolute', backgroundColor: '#000000b0', zIndex: 1, height: '100%', width: '100%' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Image source={qiflix} style={{ width: 150, height: 40 }} />

                </View>
                <View style={{ flexDirection: 'column', marginTop: '60%', gap: 12, paddingHorizontal: 10 }}>
                    <Text style={{ color: 'white', fontSize: 21, fontWeight: 'bold' }}>HELLO! WELCOME TO THE FAMILY.</Text>
                    <Text style={{ color: 'white', fontSize: 17 }}>Help us get to know you better. You know, because family stays close.</Text>
                    <View style={{ position: 'relative', flexDirection: 'row', marginTop: 10, gap: 5, justifyContent: 'center' }}>
                        <TextInput value={email} onChangeText={e => setEmail(e)} style={{ color: 'white', height: 50, zIndex: 1, width: '100%', backgroundColor: 'rgba(52, 52, 52, .588)', borderWidth: 1, paddingHorizontal: 15, borderRadius: 7, borderColor: '#bbb' }} />
                        <View style={{ position: 'absolute', paddingHorizontal: 15, top: 0, left: 0, height: '100%', width: '100%', flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ color: 'white', fontWeight: 'bold' }}>{email === '' && 'Email Address'}</Text>
                        </View>
                    </View>
                    <View style={{ position: 'relative', flexDirection: 'row', marginTop: 5, gap: 5, justifyContent: 'center' }}>
                        <TextInput value={password} secureTextEntry={true} onChangeText={e => setPassword(e)} style={{ color: 'white', height: 50, zIndex: 1, width: '100%', backgroundColor: 'rgba(52, 52, 52, .588)', borderWidth: 1, paddingHorizontal: 15, borderRadius: 7, borderColor: '#bbb' }} />
                        <View style={{ position: 'absolute', paddingHorizontal: 15, top: 0, left: 0, height: '100%', width: '100%', flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ color: 'white', fontWeight: 'bold' }}>{password === '' && 'Password'}</Text>
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => handleSignIn()} style={{ backgroundColor: 'red', paddingHorizontal: 20, borderRadius: 5, paddingVertical: 12, flexDirection: 'row', justifyContent: 'center' }}>
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>SIGN IN</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default SignInScreen