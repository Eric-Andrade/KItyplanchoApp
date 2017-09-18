import React, { Component } from 'react';
import { addNavigationHelpers, StackNavigator, TabNavigator } from 'react-navigation';
import { Ionicons, EvilIcons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Keyboard } from 'react-native';

import { colors } from './util/constants';
import ButtonHeader from './components/ButtonHeader';
import HistoricalScreen from './screens/HistoricalScreen';
import MeScreen from './screens/MeScreen';
import AuthenticationScreen from './screens/AuthenticationScreen';
import MapScreen from './screens/MapScreen';
import ServicesScreen from './screens/ServicesScreen';
import HowScreen from './screens/HowScreen';

const tabIcon = 27;

const TNavigator = TabNavigator({
    Historical:{
        screen: HistoricalScreen,
        navigationOptions:() =>({
            title: 'Mis pedidos',
            headerTitle: 'Mis pedidos',
            tabBarIcon: ({ tintColor, focused }) =>( 
                <Ionicons name={focused ? 'ios-list' : 'ios-list'} size={tabIcon} style={{color: tintColor}}/>
            )
        })
    },
    Services:{
        screen: ServicesScreen,
        navigationOptions:() =>({
            title: 'Servicios',
            headerTitle: 'Servicios',
            tabBarIcon: ({ tintColor, focused }) =>( 
                <Ionicons name={focused ? 'ios-home' : 'ios-home-outline'} size={tabIcon} style={{color: tintColor}}/>
            )
        })
    },
    Perfil:{
        screen: MeScreen,
        navigationOptions:() =>({
            title: 'Mi cuenta',
            headerTitle: 'Mi cuenta',
            tabBarIcon: ({ tintColor, focused }) =>( 
                <MaterialCommunityIcons name={focused ? 'account-circle' : 'account-circle'} size={tabIcon} style={{color: tintColor}}/>
            )
        })
    },
    Map:{
        screen: MapScreen, 
        navigationOptions:() =>({
            title: 'Mapa',
            header: null,
            tabBarIcon: ({ tintColor, focused }) =>( 
                <MaterialCommunityIcons name={focused ? 'map-marker' : 'map-marker'} size={tabIcon} style={{color: tintColor}}/>
            )
        })
    },
    // How:{
    //     screen: HowScreen,
    //     navigationOptions:() =>({
    //         title: 'Cómo funciona',
    //         headerTitle: '¿Cómo funciona...?',
    //         tabBarIcon: ({ tintColor, focused }) =>( 
    //             <Ionicons name={focused ? 'ios-information-circle' : 'ios-information-circle-outline'} size={tabIcon} style={{color: tintColor}}/>
    //         )
    //     })
    // }
},{
    lazy: true,
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    animationEnabled: false,
    initialRouteName: 'Historical',
    tabBarOptions:{
        showIcon: true,
        showLabel: true,
        activeTintColor: colors.PRIMARY,
        inactiveTintColor: colors.GRAY600,
        pressColor: colors.PRIMARY,
        indicatorStyle: { backgroundColor: colors.PRIMARY },
        style:{
            backgroundColor: colors.WHITE,
            height: 50,
            paddingVertical: 5,
            borderTopWidth: 2,
            borderTopColor: colors.PRIMARYRGBA,
        }
    }
});

const AuthenticationModal = StackNavigator({
    Authentication: {
        screen: AuthenticationScreen,
        navigationOptions: ({ navigation }) => ({
            headerRight: (
                <ButtonHeader side="right" onPress={() => {
                    Keyboard.dismiss();
                    navigation.goBack(null)
                    }}>
                    <EvilIcons name="close" size={tabIcon} color={colors.WHITE}/>
                </ButtonHeader>
            ),
            headerLeft: null
        })
    }
},
    { headerMode: 'none'}
);

const SNavigator = StackNavigator({
    Historical:{
        screen: TNavigator,
        navigationOptions: ({ navigation }) => ({
            headerRight: (
                <ButtonHeader side="right" onPress={() => navigation.navigate('Authentication')}>
                    <MaterialCommunityIcons name='plus' size={tabIcon} color={colors.WHITE}/>
                </ButtonHeader>
            ),
            headerLeft: (null)
        })
    },
    Authentication:{
        screen: AuthenticationModal,
        navigationOptions:() => ({
            title: 'Ingresar',
            header: null
        })
    }
},{
    cardStyle: {
        backgroundColor: colors.GRAY100
    },
    navigationOptions: () => ({
        headerStyle:{
            backgroundColor: colors.PRIMARY,
        },
        headerTitleStyle:{
            color: colors.WHITE,
            fontSize: 20,
            fontWeight: '400',
            fontFamily: 'sspRegular'
        }
    }),
    gesturesEnabled: true,
    mode: 'modal',
})

class AppNavigator extends Component {
    render() {
        return (
            <SNavigator/>
        );
    }
}

export default AppNavigator;