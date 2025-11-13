import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as Notifications from 'expo-notifications';
import { usePushNotification } from '../utils/useNotification';

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const [hasMounted, setHasMounted] = useState(false);
  const [loading, setLoading] = useState(true); // start as true
  const [fontsLoaded, error] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
  });

  const { registerAndStorePushToken } = usePushNotification();

  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        const { temperature } = response.notification.request.content.data;
        if (temperature) {
          console.log(`🌡️ Received push notification with temperature: ${temperature}`);
        }
      }
    );
    return () => subscription.remove();
  }, []);

  useEffect(() => {
    if (fontsLoaded || error) {
      SplashScreen.hideAsync().finally(() => {
        setHasMounted(true);
        setLoading(false);
      });
    }
  }, [fontsLoaded, error]);

  // useEffect(() => {
  //   registerAndStorePushToken();
  // }, []);
  useEffect(() => {
    if (__DEV__) {
      if (!global.pushTokenRegistered) {
        global.pushTokenRegistered = true;
        registerAndStorePushToken();
      }
    } else {
      registerAndStorePushToken();
    }
  }, []);

  if (loading || !hasMounted) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
