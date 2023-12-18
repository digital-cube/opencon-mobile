import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AuthorsNavigation from "./AuthorsNavigation";
import ScheduleNavigation from "./ScheduleNavigation";
import MoreNavigation from "./MoreNavigation";
import MyScheduleNavigation from "./MyScheduleNavigation";
import { getTheme } from "../tools/getTheme";
import { Feather, EvilIcons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default BottomTabNavigation = () => {
  const theme = getTheme();
  return (
    <Tab.Navigator
      backBehavior="history"
      initialRouteName="Schedule"
      screenOptions={({ route }) => {
        return {
          tabBarActiveTintColor: theme.bottomTabNavActive,
          headerShown: false,
          tabBarInactiveTintColor: theme.bottomTabNavInactive,
          tabBarLabelPosition: "below-icon",
          tabBarLabelStyle: {
            fontSize: 10,
            top: -4,
          },
          tabBarStyle: {
            borderTopColor: theme.textLight,
            borderTopWidth: 0.3,
          },
        };
      }}
    >
      <Tab.Screen
        name="Schedule"
        component={ScheduleNavigation}
        listeners={({ navigation }) => ({
          tabPress: (event) => {
            event.preventDefault();
            navigation.navigate("Schedule", {
              screen: "ScheduleScreen",
            });
          },
        })}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Feather
                name="calendar"
                size={18}
                color={
                  focused
                    ? theme.bottomTabNavActive
                    : theme.bottomTabNavInactive
                }
              />
            );
          },
          tabBarLabel: "Schedule",
        }}
      />
      <Tab.Screen
        name="Authors"
        component={AuthorsNavigation}
        listeners={({ navigation }) => ({
          tabPress: (event) => {
            event.preventDefault();
            navigation.navigate("Authors", {
              screen: "AuthorsScreen",
            });
          },
        })}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Feather
                name="users"
                size={18}
                color={
                  focused
                    ? theme.bottomTabNavActive
                    : theme.bottomTabNavInactive
                }
              />
            );
          },
          tabBarLabel: "Authors",
        }}
      />

      <Tab.Screen
        name="MySchedule"
        component={MyScheduleNavigation}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Feather
                name="bookmark"
                size={18}
                color={
                  focused
                    ? theme.bottomTabNavActive
                    : theme.bottomTabNavInactive
                }
              />
            );
          },
          tabBarLabel: "My Schedule",
        }}
      />
      <Tab.Screen
        name="More"
        component={MoreNavigation}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <EvilIcons
                name="navicon"
                size={18}
                color={
                  focused
                    ? theme.bottomTabNavActive
                    : theme.bottomTabNavInactive
                }
              />
            );
          },
          tabBarLabel: "More",
        }}
      />
    </Tab.Navigator>
  );
};
