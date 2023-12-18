import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthorsScreen from "../screens/Authors/AuthorsScreen";
import AuthorDetailsScreen from "../screens/AuthorDetails/AuthorDetailsScreen";
import { Platform } from "react-native";

export default AuthorsNavigation = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="AuthorsScreen"
    >
      <Stack.Screen component={AuthorsScreen} name="AuthorsScreen" />
      <Stack.Screen
        component={AuthorDetailsScreen}
        options={{ animation: Platform.OS === "android" ? "none" : "default" }}
        name="AuthorDetails"
      />
    </Stack.Navigator>
  );
};
