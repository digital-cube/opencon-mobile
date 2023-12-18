import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ScheduleScreen from "../screens/Schedule/ScheduleScreen";
import SessionDetailsScreen from "../screens/SessionDetails/SessionDetailsScreen";
import AuthorDetailsScreen from "../screens/AuthorDetails/AuthorDetailsScreen";
import { Platform } from "react-native";

export default ScheduleNavigation = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="ScheduleScreen"
    >
      <Stack.Screen component={ScheduleScreen} name="ScheduleScreen" />
      <Stack.Screen
        component={SessionDetailsScreen}
        options={{ animation: Platform.OS === "android" ? "none" : "default" }}
        name="SessionDetails"
      />
      <Stack.Screen
        component={AuthorDetailsScreen}
        options={{ animation: Platform.OS === "android" ? "none" : "default" }}
        name="AuthorDetails"
      />
    </Stack.Navigator>
  );
};
