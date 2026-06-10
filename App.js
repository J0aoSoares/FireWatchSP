import React, { useEffect, useState } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';

import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import FocosScreen from './src/screens/FocosScreen';
import FocoDetalheScreen from './src/screens/FocoDetalheScreen';
import RelatarScreen from './src/screens/RelatarScreen';
import PerfilScreen from './src/screens/PerfilScreen';

import { obterSessao } from './src/services/storage';
import { colors } from './src/theme/theme';

const RootStack = createNativeStackNavigator();
const FocosStack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

const AppTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: colors.space,
    card: colors.panel,
    border: colors.line,
    text: colors.text,
    primary: colors.ember,
  },
};

const headerStyle = {
  headerStyle: { backgroundColor: colors.space },
  headerTintColor: colors.text,
  headerTitleStyle: { fontWeight: '800' },
  headerShadowVisible: false,
};

function TabIcon({ simbolo, color }) {
  return <Text style={{ fontSize: 18, color }}>{simbolo}</Text>;
}

function FocosStackNavigator() {
  return (
    <FocosStack.Navigator screenOptions={headerStyle}>
      <FocosStack.Screen
        name="FocosLista"
        component={FocosScreen}
        options={{ title: 'Focos de calor' }}
      />
      <FocosStack.Screen
        name="FocoDetalhe"
        component={FocoDetalheScreen}
        options={{ title: 'Detalhe do foco' }}
      />
    </FocosStack.Navigator>
  );
}

function MainTabs() {
  return (
    <Tabs.Navigator
      screenOptions={{
        ...headerStyle,
        tabBarStyle: {
          backgroundColor: colors.panel,
          borderTopColor: colors.line,
        },
        tabBarActiveTintColor: colors.ember,
        tabBarInactiveTintColor: colors.textFaint,
        tabBarLabelStyle: { fontSize: 11, fontWeight: '700' },
      }}
    >
      <Tabs.Screen
        name="Painel"
        component={HomeScreen}
        options={{
          title: 'Painel orbital',
          tabBarLabel: 'Painel',
          tabBarIcon: ({ color }) => <TabIcon simbolo="◉" color={color} />,
        }}
      />
      <Tabs.Screen
        name="Focos"
        component={FocosStackNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <TabIcon simbolo="▲" color={color} />,
        }}
      />
      <Tabs.Screen
        name="Relatar"
        component={RelatarScreen}
        options={{
          title: 'Relatar queimada',
          tabBarLabel: 'Relatar',
          tabBarIcon: ({ color }) => <TabIcon simbolo="✚" color={color} />,
        }}
      />
      <Tabs.Screen
        name="Perfil"
        component={PerfilScreen}
        options={{
          title: 'Perfil & Sobre',
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ color }) => <TabIcon simbolo="◈" color={color} />,
        }}
      />
    </Tabs.Navigator>
  );
}

export default function App() {
  const [carregando, setCarregando] = useState(true);
  const [logado, setLogado] = useState(false);

  useEffect(() => {
    obterSessao()
      .then((sessao) => setLogado(!!sessao))
      .finally(() => setCarregando(false));
  }, []);

  if (carregando) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.space,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ActivityIndicator color={colors.ember} size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer theme={AppTheme}>
      <StatusBar style="light" />
      <RootStack.Navigator
        initialRouteName={logado ? 'Main' : 'Login'}
        screenOptions={{ headerShown: false }}
      >
        <RootStack.Screen name="Login" component={LoginScreen} />
        <RootStack.Screen name="Main" component={MainTabs} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
