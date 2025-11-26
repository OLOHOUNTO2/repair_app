import { Tabs } from "expo-router";
import { Home, Plus, ClipboardList, User, Wrench } from "lucide-react-native";
import { useTheme } from "@/utils/theme";

export default function TabLayout() {
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.colors.tabBar.background,
          borderTopWidth: 1,
          borderTopColor: theme.colors.tabBar.border,
          paddingBottom: 10,
          paddingTop: 10,
          height: 80,
        },
        tabBarActiveTintColor: theme.colors.tabBar.active,
        tabBarInactiveTintColor: theme.colors.tabBar.inactive,
        tabBarLabelStyle: {
          fontSize: 11,
          fontFamily: "Roboto_400Regular",
          marginTop: 4,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => <Home color={color} size={20} />,
        }}
      />
      <Tabs.Screen
        name="requests"
        options={{
          title: "Requests",
          tabBarIcon: ({ color, size }) => (
            <ClipboardList color={color} size={20} />
          ),
        }}
      />
      <Tabs.Screen
        name="new-request"
        options={{
          title: "New Request",
          tabBarIcon: ({ color, size }) => (
            <Plus
              color={color}
              size={20}
              fill={color === theme.colors.tabBar.active ? color : "none"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="technician"
        options={{
          title: "Jobs",
          tabBarIcon: ({ color, size }) => <Wrench color={color} size={20} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => <User color={color} size={20} />,
        }}
      />
    </Tabs>
  );
}
