import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
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
  Bell,
  Plus,
  Wrench,
  Smartphone,
  Laptop,
  Tablet,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react-native";
import { useTheme } from "@/utils/theme";
import Card from "@/components/Card";
import StatusBadge from "@/components/StatusBadge";
import RequestCard from "@/components/RequestCard";

export default function Home() {
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

  // Mock data - in a real app, this would come from your backend
  const recentRequests = [
    {
      id: "REQ001",
      deviceType: "Smartphone",
      issue: "Screen Cracked",
      description: "iPhone 14 Pro screen is completely shattered",
      status: "In Progress",
      createdAt: "2024-11-20T10:00:00Z",
      location: "Downtown",
      estimatedCost: 150,
      technician: { name: "John Smith" },
    },
    {
      id: "REQ002",
      deviceType: "Laptop",
      issue: "Won't Turn On",
      description: "MacBook Pro not responding to power button",
      status: "Pending",
      createdAt: "2024-11-19T14:30:00Z",
      location: "Uptown",
      estimatedCost: 200,
    },
  ];

  const quickActions = [
    {
      icon: Smartphone,
      label: "Phone Repair",
      color: theme.colors.info,
      onPress: () => router.push("/(tabs)/new-request?device=smartphone"),
    },
    {
      icon: Laptop,
      label: "Laptop Repair",
      color: theme.colors.warning,
      onPress: () => router.push("/(tabs)/new-request?device=laptop"),
    },
    {
      icon: Tablet,
      label: "Tablet Repair",
      color: theme.colors.success,
      onPress: () => router.push("/(tabs)/new-request?device=tablet"),
    },
    {
      icon: Wrench,
      label: "Other Device",
      color: theme.colors.primary,
      onPress: () => router.push("/(tabs)/new-request"),
    },
  ];

  const stats = [
    {
      label: "Active Requests",
      value: "2",
      icon: Clock,
      color: theme.colors.info,
    },
    {
      label: "Completed",
      value: "8",
      icon: CheckCircle,
      color: theme.colors.success,
    },
    {
      label: "Pending",
      value: "1",
      icon: AlertCircle,
      color: theme.colors.warning,
    },
  ];

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
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 24,
          }}
        >
          <View>
            <Text
              style={{
                fontFamily: "Roboto_400Regular",
                fontSize: 16,
                color: theme.colors.text.secondary,
              }}
            >
              Welcome back!
            </Text>
            <Text
              style={{
                fontFamily: "Roboto_700Bold",
                fontSize: 24,
                color: theme.colors.text.primary,
              }}
            >
              Repair Dashboard
            </Text>
          </View>

          <TouchableOpacity
            style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              backgroundColor: theme.colors.surface,
              borderWidth: 1,
              borderColor: theme.colors.border,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Bell color={theme.colors.text.secondary} size={20} />
          </TouchableOpacity>
        </View>

        {/* Stats Cards */}
        <View
          style={{
            flexDirection: "row",
            marginHorizontal: 16,
            marginBottom: 24,
            gap: 12,
          }}
        >
          {stats.map((stat, index) => (
            <View
              key={index}
              style={{
                flex: 1,
                backgroundColor: theme.colors.card.background,
                borderRadius: 12,
                padding: 16,
                borderWidth: 1,
                borderColor: theme.colors.border,
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: `${stat.color}20`,
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 8,
                }}
              >
                <stat.icon color={stat.color} size={20} />
              </View>
              <Text
                style={{
                  fontFamily: "Roboto_700Bold",
                  fontSize: 20,
                  color: theme.colors.text.primary,
                  marginBottom: 4,
                }}
              >
                {stat.value}
              </Text>
              <Text
                style={{
                  fontFamily: "Roboto_400Regular",
                  fontSize: 12,
                  color: theme.colors.text.secondary,
                  textAlign: "center",
                }}
              >
                {stat.label}
              </Text>
            </View>
          ))}
        </View>

        {/* Quick Actions */}
        <Card>
          <Text
            style={{
              fontFamily: "Roboto_500Medium",
              fontSize: 18,
              color: theme.colors.text.primary,
              marginBottom: 16,
            }}
          >
            Quick Actions
          </Text>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            {quickActions.map((action, index) => (
              <TouchableOpacity
                key={index}
                onPress={action.onPress}
                style={{
                  alignItems: "center",
                  flex: 1,
                }}
              >
                <View
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 28,
                    backgroundColor: `${action.color}20`,
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: 8,
                  }}
                >
                  <action.icon color={action.color} size={24} />
                </View>
                <Text
                  style={{
                    fontFamily: "Roboto_400Regular",
                    fontSize: 12,
                    color: theme.colors.text.primary,
                    textAlign: "center",
                  }}
                >
                  {action.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Card>

        {/* Recent Requests */}
        <Card>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <Text
              style={{
                fontFamily: "Roboto_500Medium",
                fontSize: 18,
                color: theme.colors.text.primary,
              }}
            >
              Recent Requests
            </Text>
            <TouchableOpacity onPress={() => router.push("/(tabs)/requests")}>
              <Text
                style={{
                  fontFamily: "Roboto_500Medium",
                  fontSize: 14,
                  color: theme.colors.primary,
                }}
              >
                View All
              </Text>
            </TouchableOpacity>
          </View>

          {recentRequests.length > 0 ? (
            <View style={{ marginHorizontal: -16 }}>
              {recentRequests.map((request, index) => (
                <RequestCard
                  key={request.id}
                  request={request}
                  onPress={(req) => router.push(`/request/${req.id}`)}
                  showTechnician={true}
                />
              ))}
            </View>
          ) : (
            <View style={{ alignItems: "center", paddingVertical: 32 }}>
              <Text
                style={{
                  fontFamily: "Roboto_400Regular",
                  fontSize: 14,
                  color: theme.colors.text.secondary,
                  textAlign: "center",
                }}
              >
                No recent requests
              </Text>
              <TouchableOpacity
                onPress={() => router.push("/(tabs)/new-request")}
                style={{
                  marginTop: 12,
                  backgroundColor: theme.colors.primary,
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  borderRadius: 20,
                }}
              >
                <Text
                  style={{
                    fontFamily: "Roboto_500Medium",
                    fontSize: 14,
                    color: "white",
                  }}
                >
                  Create First Request
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </Card>

        {/* New Request FAB */}
        <TouchableOpacity
          onPress={() => router.push("/(tabs)/new-request")}
          style={{
            position: "absolute",
            bottom: insets.bottom + 100,
            right: 20,
            width: 56,
            height: 56,
            borderRadius: 28,
            backgroundColor: theme.colors.primary,
            justifyContent: "center",
            alignItems: "center",
            shadowColor: theme.colors.shadow,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 8,
          }}
        >
          <Plus color="white" size={24} />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
