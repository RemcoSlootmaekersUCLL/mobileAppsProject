import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function AppLayout() {
  // Uncomment when you implement Supabase authentication:
  // const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  // if (!isAuthenticated) return <Redirect href="/login" />;
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#2E6770",
        tabBarInactiveTintColor: "#52626E",
        tabBarStyle: { backgroundColor: "#EDF1F3", borderTopColor: "#C9D4D9" },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: "Over ons",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={
                focused ? "information-circle" : "information-circle-outline"
              }
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
