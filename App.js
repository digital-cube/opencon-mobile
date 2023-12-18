import { useState, useEffect } from "react";
import { Provider } from "react-redux";
import store from "./store/store";
import Navigation from "./navigation/Navigation";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as Updates from "expo-updates";
import { usePushNotifications } from "./notifications/usePushNotifications";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  const [currentState, setCurrentState] = useState("active");
  const { expoPushToken } = usePushNotifications();

  const handleAppStateChange = (nextAppState) => {
    setCurrentState(nextAppState);
    if (currentState === "active" && nextAppState === "active") {
      checkForUpdates();
    }
  };

  const checkForUpdates = async () => {
    try {
      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();
      }
    } catch (error) {}
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <Provider store={store}>
          <Navigation />
        </Provider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
