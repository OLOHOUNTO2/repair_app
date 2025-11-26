import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import {
  User,
  Settings,
  Bell,
  HelpCircle,
  Shield,
  CreditCard,
  Star,
  MapPin,
  Phone,
  Mail,
  Edit,
  LogOut,
  ChevronRight,
} from "lucide-react-native";
import { useTheme } from "@/utils/theme";
import Card from "@/components/Card";

export default function Profile() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();

  const [loaded, error] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  if (!loaded && !error) {
    return null;
  }

  // Mock user data - in a real app, this would come from your backend
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    location: "New York, NY",
    userType: "customer", // or "technician"
    rating: 4.8,
    joinDate: "January 2024",
    completedRequests: 12,
    avatar: null,
  };

  const menuSections = [
    {
      title: "Account",
      items: [
        {
          icon: Edit,
          label: "Edit Profile",
          onPress: () => router.push("/profile/edit"),
        },
        {
          icon: Bell,
          label: "Notifications",
          onPress: () => router.push("/profile/notifications"),
        },
        {
          icon: CreditCard,
          label: "Payment Methods",
          onPress: () => router.push("/profile/payment"),
        },
      ],
    },
    {
      title: "Support",
      items: [
        {
          icon: HelpCircle,
          label: "Help Center",
          onPress: () => router.push("/help"),
        },
        {
          icon: Shield,
          label: "Privacy Policy",
          onPress: () => router.push("/privacy"),
        },
        {
          icon: Settings,
          label: "Settings",
          onPress: () => router.push("/settings"),
        },
      ],
    },
  ];

  const handleLogout = () => {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Sign Out",
        style: "destructive",
        onPress: () => {
          // In a real app, this would clear auth tokens and redirect to login
          console.log("User logged out");
        },
      },
    ]);
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <StatusBar style={theme.isDark ? "light" : "dark"} />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingBottom: insets.bottom + 26,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View
          style={{
            marginTop: insets.top + 20,
            marginHorizontal: 16,
            marginBottom: 24,
          }}
        >
          <Text
            style={{
              fontFamily: "Roboto_700Bold",
              fontSize: 24,
              color: theme.colors.text.primary,
            }}
          >
            Profile
          </Text>
        </View>

        {/* User Info Card */}
        <Card>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            {/* Avatar */}
            <View
              style={{
                width: 80,
                height: 80,
                borderRadius: 40,
                backgroundColor: theme.colors.primary,
                justifyContent: "center",
                alignItems: "center",
                marginRight: 16,
              }}
            >
              {user.avatar ? (
                // In a real app, you'd use an Image component here
                <Text
                  style={{
                    fontFamily: "Roboto_700Bold",
                    fontSize: 32,
                    color: "white",
                  }}
                >
                  {user.name.charAt(0)}
                </Text>
              ) : (
                <User color="white" size={40} />
              )}
            </View>

            {/* User Details */}
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontFamily: "Roboto_700Bold",
                  fontSize: 20,
                  color: theme.colors.text.primary,
                  marginBottom: 4,
                }}
              >
                {user.name}
              </Text>
              <Text
                style={{
                  fontFamily: "Roboto_400Regular",
                  fontSize: 14,
                  color: theme.colors.text.secondary,
                  marginBottom: 8,
                }}
              >
                {user.userType === "technician" ? "Technician" : "Customer"}
              </Text>

              {user.userType === "technician" && (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Star
                    color={theme.colors.warning}
                    size={16}
                    fill={theme.colors.warning}
                  />
                  <Text
                    style={{
                      fontFamily: "Roboto_500Medium",
                      fontSize: 14,
                      color: theme.colors.text.primary,
                      marginLeft: 4,
                    }}
                  >
                    {user.rating}
                  </Text>
                </View>
              )}
            </View>

            <TouchableOpacity
              onPress={() => router.push("/profile/edit")}
              style={{
                width: 36,
                height: 36,
                borderRadius: 18,
                backgroundColor: theme.colors.surface,
                borderWidth: 1,
                borderColor: theme.colors.border,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Edit color={theme.colors.text.secondary} size={16} />
            </TouchableOpacity>
          </View>

          {/* Contact Info */}
          <View style={{ gap: 12 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Mail color={theme.colors.text.secondary} size={16} />
              <Text
                style={{
                  fontFamily: "Roboto_400Regular",
                  fontSize: 14,
                  color: theme.colors.text.primary,
                  marginLeft: 12,
                }}
              >
                {user.email}
              </Text>
            </View>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Phone color={theme.colors.text.secondary} size={16} />
              <Text
                style={{
                  fontFamily: "Roboto_400Regular",
                  fontSize: 14,
                  color: theme.colors.text.primary,
                  marginLeft: 12,
                }}
              >
                {user.phone}
              </Text>
            </View>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MapPin color={theme.colors.text.secondary} size={16} />
              <Text
                style={{
                  fontFamily: "Roboto_400Regular",
                  fontSize: 14,
                  color: theme.colors.text.primary,
                  marginLeft: 12,
                }}
              >
                {user.location}
              </Text>
            </View>
          </View>
        </Card>

        {/* Stats Card */}
        <Card>
          <Text
            style={{
              fontFamily: "Roboto_500Medium",
              fontSize: 18,
              color: theme.colors.text.primary,
              marginBottom: 16,
            }}
          >
            Activity
          </Text>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <View style={{ alignItems: "center" }}>
              <Text
                style={{
                  fontFamily: "Roboto_700Bold",
                  fontSize: 24,
                  color: theme.colors.primary,
                  marginBottom: 4,
                }}
              >
                {user.completedRequests}
              </Text>
              <Text
                style={{
                  fontFamily: "Roboto_400Regular",
                  fontSize: 12,
                  color: theme.colors.text.secondary,
                  textAlign: "center",
                }}
              >
                {user.userType === "technician"
                  ? "Jobs Completed"
                  : "Requests Made"}
              </Text>
            </View>

            <View
              style={{
                width: 1,
                backgroundColor: theme.colors.divider,
                marginHorizontal: 20,
              }}
            />

            <View style={{ alignItems: "center" }}>
              <Text
                style={{
                  fontFamily: "Roboto_700Bold",
                  fontSize: 24,
                  color: theme.colors.success,
                  marginBottom: 4,
                }}
              >
                {user.rating}
              </Text>
              <Text
                style={{
                  fontFamily: "Roboto_400Regular",
                  fontSize: 12,
                  color: theme.colors.text.secondary,
                  textAlign: "center",
                }}
              >
                Average Rating
              </Text>
            </View>

            <View
              style={{
                width: 1,
                backgroundColor: theme.colors.divider,
                marginHorizontal: 20,
              }}
            />

            <View style={{ alignItems: "center" }}>
              <Text
                style={{
                  fontFamily: "Roboto_700Bold",
                  fontSize: 24,
                  color: theme.colors.info,
                  marginBottom: 4,
                }}
              >
                {user.joinDate.split(" ")[1]}
              </Text>
              <Text
                style={{
                  fontFamily: "Roboto_400Regular",
                  fontSize: 12,
                  color: theme.colors.text.secondary,
                  textAlign: "center",
                }}
              >
                Member Since
              </Text>
            </View>
          </View>
        </Card>

        {/* Menu Sections */}
        {menuSections.map((section, sectionIndex) => (
          <Card key={sectionIndex}>
            <Text
              style={{
                fontFamily: "Roboto_500Medium",
                fontSize: 18,
                color: theme.colors.text.primary,
                marginBottom: 16,
              }}
            >
              {section.title}
            </Text>

            <View style={{ gap: 4 }}>
              {section.items.map((item, itemIndex) => (
                <TouchableOpacity
                  key={itemIndex}
                  onPress={item.onPress}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingVertical: 12,
                    paddingHorizontal: 4,
                  }}
                >
                  <View
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 18,
                      backgroundColor: theme.isDark ? "#3A3A3A" : "#F0F9FF",
                      justifyContent: "center",
                      alignItems: "center",
                      marginRight: 12,
                    }}
                  >
                    <item.icon color={theme.colors.text.secondary} size={18} />
                  </View>

                  <Text
                    style={{
                      flex: 1,
                      fontFamily: "Roboto_400Regular",
                      fontSize: 16,
                      color: theme.colors.text.primary,
                    }}
                  >
                    {item.label}
                  </Text>

                  <ChevronRight color={theme.colors.text.tertiary} size={16} />
                </TouchableOpacity>
              ))}
            </View>
          </Card>
        ))}

        {/* Logout Button */}
        <TouchableOpacity
          onPress={handleLogout}
          style={{
            marginHorizontal: 16,
            marginTop: 8,
            backgroundColor: theme.colors.card.background,
            borderRadius: 12,
            padding: 16,
            borderWidth: 1,
            borderColor: theme.colors.error,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <LogOut color={theme.colors.error} size={20} />
          <Text
            style={{
              fontFamily: "Roboto_500Medium",
              fontSize: 16,
              color: theme.colors.error,
              marginLeft: 8,
            }}
          >
            Sign Out
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
