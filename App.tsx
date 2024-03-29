import { AuthProvider } from '@contexts/AuthContext'
import { Routes } from '@routes/index'
import { QueryClientProvider } from '@tanstack/react-query'
import { THEME } from '@theme/index'
import { useFonts } from 'expo-font'
import { StatusBar } from 'expo-status-bar'
import { NativeBaseProvider } from 'native-base'
import { queryClient } from 'src/lib/react-query'
// SplashScreen.preventAutoHideAsync()

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    Proxima_Nova_Regular: require('./assets/fonts/Proxima_Nova_Regular.otf'),
    Proxima_Nova_Semibold: require('./assets/fonts/Proxima_Nova_Semibold.otf'),
  })

  // const onLayoutRootView = useCallback(async () => {
  //   if (fontsLoaded || fontError) {
  //     await SplashScreen.hideAsync()
  //   }
  // }, [fontsLoaded, fontError])

  // if (!fontsLoaded && !fontError) {
  //   return null
  // }

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar style="dark" backgroundColor="transparent" translucent />
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          {fontsLoaded && <Routes />}
        </QueryClientProvider>
      </AuthProvider>
    </NativeBaseProvider>
  )
}
