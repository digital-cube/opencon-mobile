import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Platform } from "react-native";
import MyScheduleScreen from "../screens/MySchedule/MyScheduleScreen";
import SessionDetailsScreen from "../screens/SessionDetails/SessionDetailsScreen";
import AuthorDetailsScreen from "../screens/AuthorDetails/AuthorDetailsScreen";

export default ScheduleNavigation = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="MyScheduleScreen"
    >
      <Stack.Screen component={MyScheduleScreen} name="MyScheduleScreen" />
      <Stack.Screen
        component={SessionDetailsScreen}
        options={{ animation: Platform.OS === "android" ? "none" : "default" }}
        name="MyScheduleSessionDetails"
      />

      <Stack.Screen
        component={AuthorDetailsScreen}
        options={{ animation: Platform.OS === "android" ? "none" : "default" }}
        name="AuthorDetails"
      />
    </Stack.Navigator>
  );
};
