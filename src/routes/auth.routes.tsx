import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack'
import { Home } from '@screens/Home'

import { Onboarding1, Onboarding2, Onboarding3 } from '@screens/Onboarding'
import { PasswordRecovered, RecoverPassword } from '@screens/RecoverPassword'
import { SignIn } from '@screens/SignIn'

export type AuthRoutesType = {
  onboarding_1: undefined
  onboarding_2: undefined
  onboarding_3: undefined
  sign_in: undefined
  recover_password: undefined
  password_recovered: undefined
  home: undefined
}

export type AuthNavigatorRoutesProps = NativeStackNavigationProp<AuthRoutesType>

const { Navigator, Screen } = createNativeStackNavigator<AuthRoutesType>()

export function AuthRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="onboarding_1" component={Onboarding1} />
      <Screen name="onboarding_2" component={Onboarding2} />
      <Screen name="onboarding_3" component={Onboarding3} />
      <Screen name="sign_in" component={SignIn} />
      <Screen name="recover_password" component={RecoverPassword} />
      <Screen name="password_recovered" component={PasswordRecovered} />
      <Screen name="home" component={Home} />
    </Navigator>
  )
}
