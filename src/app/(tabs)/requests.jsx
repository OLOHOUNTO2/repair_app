import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
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
  Search,
  Filter,
  Plus,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
} from "lucide-react-native";
import { useTheme } from "@/utils/theme";
import RequestCard from "@/components/RequestCard";

export default function Requests() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();

  const [loaded, error] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  if (!loaded && !error) {
    return null;
  }

  // Mock data - in a real app, this would come from your backend
  const allRequests = [
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
    {
      id: "REQ003",
      deviceType: "Tablet",
      issue: "Battery Issues",
      description: "iPad battery drains very quickly",
      status: "Completed",
      createdAt: "2024-11-18T09:15:00Z",
      location: "Midtown",
      estimatedCost: 80,
      technician: { name: "Sarah Johnson" },
    },
    {
      id: "REQ004",
      deviceType: "Smartphone",
      issue: "Water Damage",
      description: "Phone fell in water, not turning on",
      status: "Cancelled",
      createdAt: "2024-11-17T16:45:00Z",
      location: "Downtown",
      estimatedCost: 250,
    },
    {
      id: "REQ005",
      deviceType: "Laptop",
      issue: "Overheating",
      description: "Gaming laptop gets very hot during use",
      status: "Assigned",
      createdAt: "2024-11-16T11:20:00Z",
      location: "Uptown",
      estimatedCost: 120,
      technician: { name: "Mike Wilson" },
    },
  ];

  const filters = [
    { id: "all", label: "All", icon: null, count: allRequests.length },
    {
      id: "pending",
      label: "Pending",
      icon: Clock,
      count: allRequests.filter((r) => r.status === "Pending").length,
    },
    {
      id: "in-progress",
      label: "In Progress",
      icon: AlertCircle,
      count: allRequests.filter(
        (r) => r.status === "In Progress" || r.status === "Assigned",
      ).length,
    },
    {
      id: "completed",
      label: "Completed",
      icon: CheckCircle,
      count: allRequests.filter((r) => r.status === "Completed").length,
    },
    {
      id: "cancelled",
      label: "Cancelled",
      icon: XCircle,
      count: allRequests.filter((r) => r.status === "Cancelled").length,
    },
  ];

  const getFilteredRequests = () => {
    let filtered = allRequests;

    // Apply status filter
    if (selectedFilter !== "all") {
      switch (selectedFilter) {
        case "pending":
          filtered = filtered.filter((r) => r.status === "Pending");
          break;
        case "in-progress":
          filtered = filtered.filter(
            (r) => r.status === "In Progress" || r.status === "Assigned",
          );
          break;
        case "completed":
          filtered = filtered.filter((r) => r.status === "Completed");
          break;
        case "cancelled":
          filtered = filtered.filter((r) => r.status === "Cancelled");
          break;
      }
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (r) =>
          r.id.toLowerCase().includes(query) ||
          r.deviceType.toLowerCase().includes(query) ||
          r.issue.toLowerCase().includes(query) ||
          r.description.toLowerCase().includes(query),
      );
    }

    return filtered;
  };

  const filteredRequests = getFilteredRequests();

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <StatusBar style={theme.isDark ? "light" : "dark"} />

      {/* Header */}
      <View
        style={{
          marginTop: insets.top + 20,
          marginHorizontal: 16,
          marginBottom: 20,
        }}
      >
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
              fontFamily: "Roboto_700Bold",
              fontSize: 24,
              color: theme.colors.text.primary,
            }}
          >
            My Requests
          </Text>

          <TouchableOpacity
            onPress={() => router.push("/(tabs)/new-request")}
            style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              backgroundColor: theme.colors.primary,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Plus color="white" size={20} />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: theme.colors.input.background,
            borderWidth: 1,
            borderColor: theme.colors.input.border,
            borderRadius: 12,
            paddingHorizontal: 12,
            marginBottom: 16,
          }}
        >
          <Search color={theme.colors.text.secondary} size={18} />
          <TextInput
            placeholder="Search requests..."
            placeholderTextColor={theme.colors.input.placeholder}
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={{
              flex: 1,
              marginLeft: 8,
              paddingVertical: 12,
              fontFamily: "Roboto_400Regular",
              fontSize: 14,
              color: theme.colors.text.primary,
            }}
          />
          <TouchableOpacity>
            <Filter color={theme.colors.text.secondary} size={18} />
          </TouchableOpacity>
        </View>

        {/* Filter Tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 8 }}
        >
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter.id}
              onPress={() => setSelectedFilter(filter.id)}
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 20,
                backgroundColor:
                  selectedFilter === filter.id
                    ? theme.colors.primary
                    : theme.colors.surface,
                borderWidth: 1,
                borderColor:
                  selectedFilter === filter.id
                    ? theme.colors.primary
                    : theme.colors.border,
              }}
            >
              {filter.icon && (
                <filter.icon
                  color={
                    selectedFilter === filter.id
                      ? "white"
                      : theme.colors.text.secondary
                  }
                  size={16}
                  style={{ marginRight: 6 }}
                />
              )}
              <Text
                style={{
                  fontFamily: "Roboto_500Medium",
                  fontSize: 14,
                  color:
                    selectedFilter === filter.id
                      ? "white"
                      : theme.colors.text.primary,
                  marginRight: 4,
                }}
              >
                {filter.label}
              </Text>
              <View
                style={{
                  backgroundColor:
                    selectedFilter === filter.id
                      ? "rgba(255, 255, 255, 0.3)"
                      : theme.colors.border,
                  borderRadius: 10,
                  paddingHorizontal: 6,
                  paddingVertical: 2,
                  minWidth: 20,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontFamily: "Roboto_500Medium",
                    fontSize: 12,
                    color:
                      selectedFilter === filter.id
                        ? "white"
                        : theme.colors.text.secondary,
                  }}
                >
                  {filter.count}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Requests List */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingBottom: insets.bottom + 26,
        }}
        showsVerticalScrollIndicator={false}
      >
        {filteredRequests.length > 0 ? (
          filteredRequests.map((request) => (
            <RequestCard
              key={request.id}
              request={request}
              onPress={(req) => router.push(`/request/${req.id}`)}
              showTechnician={true}
            />
          ))
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              paddingVertical: 60,
              paddingHorizontal: 32,
            }}
          >
            <View
              style={{
                width: 80,
                height: 80,
                borderRadius: 40,
                backgroundColor: theme.isDark
                  ? "rgba(9, 177, 75, 0.15)"
                  : "#E8F5E8",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 24,
              }}
            >
              <Search
                size={36}
                color={theme.colors.primary}
                strokeWidth={1.5}
              />
            </View>

            <Text
              style={{
                fontSize: 20,
                fontFamily: "Roboto_700Bold",
                color: theme.colors.text.primary,
                textAlign: "center",
                marginBottom: 8,
              }}
            >
              {searchQuery.trim()
                ? "No matching requests"
                : "No requests found"}
            </Text>

            <Text
              style={{
                fontSize: 14,
                fontFamily: "Roboto_400Regular",
                color: theme.colors.text.secondary,
                textAlign: "center",
                lineHeight: 20,
                marginBottom: 32,
              }}
            >
              {searchQuery.trim()
                ? "Try adjusting your search or filter criteria"
                : selectedFilter === "all"
                  ? "You haven't created any repair requests yet"
                  : `No ${filters.find((f) => f.id === selectedFilter)?.label.toLowerCase()} requests`}
            </Text>

            {!searchQuery.trim() && selectedFilter === "all" && (
              <TouchableOpacity
                onPress={() => router.push("/(tabs)/new-request")}
                style={{
                  backgroundColor: theme.colors.primary,
                  paddingHorizontal: 24,
                  paddingVertical: 12,
                  borderRadius: 24,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Plus color="white" size={16} style={{ marginRight: 8 }} />
                <Text
                  style={{
                    fontFamily: "Roboto_500Medium",
                    fontSize: 16,
                    color: "white",
                  }}
                >
                  Create First Request
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
}
