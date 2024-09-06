import React, { useContext, useEffect, useState } from 'react'
import { Image, ImageBackground, Text, TextInput, TouchableOpacity, View } from 'react-native'
import landingImage from '../assets/landing.png'
import qiflix from '../assets/qiflix.png'
import { useNavigation, useRoute } from '@react-navigation/native'
import { authContext } from '../context/AuthContext'

const LandingScreen = () => {
    const [email, setEmail] = useState('')
    // const { authHandler } = useContext(authContext)
    // const navigation = useNavigation();
    // const route = useRoute()
    // useEffect(() => {
    //     authHandler.checkToken(route.name)
    //         .then(goal => {
    //             if (goal !== '') {
    //                 navigation.navigate(goal)
    //             }
    //         })
    // }, [])

    return (
        <View style={{ position: 'relative' }}>
            <ImageBackground source={landingImage} style={{ height: '100%', width: '100%' }} />
            <View style={{ paddingHorizontal: 20, paddingVertical: 50, flexDirection: 'column', position: 'absolute', backgroundColor: '#000000b0', zIndex: 1, height: '100%', width: '100%' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Image source={qiflix} style={{ width: 150, height: 40 }} />
                    <TouchableOpacity onPress={() => navigation.navigate('SignInScreen')} style={{ backgroundColor: 'red', paddingHorizontal: 20, borderRadius: 7, paddingVertical: 8 }}>
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Sign In</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'column', marginTop: '60%', gap: 12, alignItems: 'center' }}>
                    <Text style={{ color: 'white', width: '100%', textAlign: 'center', fontSize: 20 }}>Welcome to your family !!!</Text>
                    <Text style={{ color: 'white', width: '100%', textAlign: 'center', fontSize: 30, fontWeight: 'bold' }}>The biggest domestic and international hits. Everything here is free.</Text>
                    <Text style={{ color: 'white', width: '100%', textAlign: 'center', fontSize: 20 }}>Join today. Cancel anytime.</Text>
                </View>
                <View style={{ position: 'relative', flexDirection: 'row', marginTop: 20, gap: 5, justifyContent: 'center' }}>
                    <TextInput value={email} onChangeText={e => setEmail(e)} style={{ color: 'white', height: 50, zIndex: 1, width: '65%', backgroundColor: 'rgba(52, 52, 52, .588)', borderWidth: 1, paddingHorizontal: 15, borderRadius: 7, borderColor: '#bbb' }} />
                    <TouchableOpacity style={{ backgroundColor: 'red', paddingHorizontal: 20, borderRadius: 7, flexDirection: 'row', zIndex: 1, alignItems: 'center' }}>
                        <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Register</Text>
                    </TouchableOpacity>
                    <View style={{ position: 'absolute', paddingHorizontal: 25, top: 0, left: 0, height: '100%', width: '100%', flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>{email === '' && 'Email Address'}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default LandingScreen