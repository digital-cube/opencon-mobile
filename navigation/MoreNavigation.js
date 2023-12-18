import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MoreScreen from "../screens/More/MoreScreen";
import LinksScreen from "../screens/Links/LinksScreen";
import SponsorsScreen from "../screens/Sponsors/SponsorsScreen";

export default MoreNavigation = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="MoreScreen"
    >
      <Stack.Screen component={MoreScreen} name="MoreScreen" />
      <Stack.Screen component={LinksScreen} name="Links" />
      <Stack.Screen component={SponsorsScreen} name="Sponsors" />
    </Stack.Navigator>
  );
};
