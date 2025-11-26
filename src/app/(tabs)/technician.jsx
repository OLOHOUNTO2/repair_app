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
  MapPin,
  Clock,
  DollarSign,
  Star,
  CheckCircle,
  AlertCircle,
  Wrench,
} from "lucide-react-native";
import { useTheme } from "@/utils/theme";
import Card from "@/components/Card";
import StatusBadge from "@/components/StatusBadge";
import RequestCard from "@/components/RequestCard";

export default function TechnicianDashboard() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();

  const [loaded, error] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("available");

  if (!loaded && !error) {
    return null;
  }

  // Mock data - in a real app, this would come from your backend
  const availableJobs = [
    {
      id: "REQ006",
      deviceType: "Smartphone",
      issue: "Screen Replacement",
      description: "Samsung Galaxy S23 screen needs replacement",
      status: "Pending",
      createdAt: "2024-11-25T08:00:00Z",
      location: "Downtown",
      estimatedCost: 180,
      distance: "2.3 km",
      urgency: "medium",
    },
    {
      id: "REQ007",
      deviceType: "Laptop",
      issue: "Keyboard Not Working",
      description: "Dell XPS 13 keyboard completely unresponsive",
      status: "Pending",
      createdAt: "2024-11-25T09:30:00Z",
      location: "Midtown",
      estimatedCost: 120,
      distance: "4.1 km",
      urgency: "high",
    },
    {
      id: "REQ008",
      deviceType: "Tablet",
      issue: "Charging Port Issues",
      description: "iPad Pro charging port loose and intermittent",
      status: "Pending",
      createdAt: "2024-11-25T10:15:00Z",
      location: "Uptown",
      estimatedCost: 90,
      distance: "6.8 km",
      urgency: "low",
    },
  ];

  const myJobs = [
    {
      id: "REQ001",
      deviceType: "Smartphone",
      issue: "Screen Cracked",
      description: "iPhone 14 Pro screen is completely shattered",
      status: "In Progress",
      createdAt: "2024-11-20T10:00:00Z",
      location: "Downtown",
      estimatedCost: 150,
      technician: { name: "You" },
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
      technician: { name: "You" },
    },
  ];

  const stats = [
    {
      label: "Jobs Completed",
      value: "24",
      icon: CheckCircle,
      color: theme.colors.success,
    },
    {
      label: "Active Jobs",
      value: "2",
      icon: AlertCircle,
      color: theme.colors.info,
    },
    { label: "Rating", value: "4.8", icon: Star, color: theme.colors.warning },
    {
      label: "Earnings",
      value: "$2,340",
      icon: DollarSign,
      color: theme.colors.primary,
    },
  ];

  const tabs = [
    { id: "available", label: "Available Jobs", count: availableJobs.length },
    { id: "my-jobs", label: "My Jobs", count: myJobs.length },
  ];

  const getJobsForTab = () => {
    return selectedTab === "available" ? availableJobs : myJobs;
  };

  const getFilteredJobs = () => {
    let jobs = getJobsForTab();

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      jobs = jobs.filter(
        (job) =>
          job.id.toLowerCase().includes(query) ||
          job.deviceType.toLowerCase().includes(query) ||
          job.issue.toLowerCase().includes(query) ||
          job.location.toLowerCase().includes(query),
      );
    }

    return jobs;
  };

  const handleAcceptJob = (jobId) => {
    // In a real app, this would make an API call
    console.log("Accepting job:", jobId);
    // Show success message and update UI
  };

  const handleJobPress = (job) => {
    router.push(`/request/${job.id}`);
  };

  const renderJobCard = (job) => {
    const isAvailable = selectedTab === "available";

    return (
      <TouchableOpacity
        key={job.id}
        onPress={() => handleJobPress(job)}
        style={{
          backgroundColor: theme.colors.card.background,
          borderRadius: 12,
          padding: 16,
          marginHorizontal: 16,
          marginBottom: 12,
          borderWidth: 1,
          borderColor: theme.colors.border,
          shadowColor: theme.colors.shadow,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 2,
        }}
      >
        {/* Header */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: 12,
          }}
        >
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontFamily: "Roboto_500Medium",
                fontSize: 16,
                color: theme.colors.text.primary,
                marginBottom: 4,
              }}
            >
              {job.deviceType} - {job.issue}
            </Text>
            <Text
              style={{
                fontFamily: "Roboto_400Regular",
                fontSize: 14,
                color: theme.colors.text.secondary,
              }}
            >
              Request #{job.id}
            </Text>
          </View>

          {isAvailable && job.urgency && (
            <StatusBadge
              status={
                job.urgency === "high"
                  ? "Urgent"
                  : job.urgency === "medium"
                    ? "Medium"
                    : "Low"
              }
              type={
                job.urgency === "high"
                  ? "error"
                  : job.urgency === "medium"
                    ? "warning"
                    : "success"
              }
              size="small"
            />
          )}

          {!isAvailable && <StatusBadge status={job.status} />}
        </View>

        {/* Description */}
        <Text
          style={{
            fontFamily: "Roboto_400Regular",
            fontSize: 14,
            color: theme.colors.text.secondary,
            marginBottom: 12,
            lineHeight: 20,
          }}
        >
          {job.description}
        </Text>

        {/* Details Row */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: isAvailable ? 16 : 0,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
            <MapPin color={theme.colors.text.tertiary} size={14} />
            <Text
              style={{
                fontFamily: "Roboto_400Regular",
                fontSize: 12,
                color: theme.colors.text.tertiary,
                marginLeft: 4,
                marginRight: 16,
              }}
            >
              {job.location}
            </Text>

            {isAvailable && job.distance && (
              <>
                <Clock color={theme.colors.text.tertiary} size={14} />
                <Text
                  style={{
                    fontFamily: "Roboto_400Regular",
                    fontSize: 12,
                    color: theme.colors.text.tertiary,
                    marginLeft: 4,
                  }}
                >
                  {job.distance}
                </Text>
              </>
            )}
          </View>

          <Text
            style={{
              fontFamily: "Roboto_700Bold",
              fontSize: 16,
              color: theme.colors.primary,
            }}
          >
            ${job.estimatedCost}
          </Text>
        </View>

        {/* Accept Button for Available Jobs */}
        {isAvailable && (
          <TouchableOpacity
            onPress={(e) => {
              e.stopPropagation();
              handleAcceptJob(job.id);
            }}
            style={{
              backgroundColor: theme.colors.primary,
              borderRadius: 8,
              paddingVertical: 12,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontFamily: "Roboto_500Medium",
                fontSize: 14,
                color: "white",
              }}
            >
              Accept Job
            </Text>
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    );
  };

  const filteredJobs = getFilteredJobs();

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
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
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
                Technician Dashboard
              </Text>
              <Text
                style={{
                  fontFamily: "Roboto_700Bold",
                  fontSize: 24,
                  color: theme.colors.text.primary,
                }}
              >
                Find Jobs
              </Text>
            </View>

            <View
              style={{
                width: 44,
                height: 44,
                borderRadius: 22,
                backgroundColor: theme.colors.primary,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Wrench color="white" size={20} />
            </View>
          </View>
        </View>

        {/* Stats Cards */}
        <View
          style={{
            flexDirection: "row",
            marginHorizontal: 16,
            marginBottom: 24,
            gap: 8,
          }}
        >
          {stats.map((stat, index) => (
            <View
              key={index}
              style={{
                flex: 1,
                backgroundColor: theme.colors.card.background,
                borderRadius: 12,
                padding: 12,
                borderWidth: 1,
                borderColor: theme.colors.border,
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                  backgroundColor: `${stat.color}20`,
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 6,
                }}
              >
                <stat.icon color={stat.color} size={16} />
              </View>
              <Text
                style={{
                  fontFamily: "Roboto_700Bold",
                  fontSize: 16,
                  color: theme.colors.text.primary,
                  marginBottom: 2,
                }}
              >
                {stat.value}
              </Text>
              <Text
                style={{
                  fontFamily: "Roboto_400Regular",
                  fontSize: 10,
                  color: theme.colors.text.secondary,
                  textAlign: "center",
                }}
              >
                {stat.label}
              </Text>
            </View>
          ))}
        </View>

        {/* Search Bar */}
        <View
          style={{
            marginHorizontal: 16,
            marginBottom: 16,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: theme.colors.input.background,
              borderWidth: 1,
              borderColor: theme.colors.input.border,
              borderRadius: 12,
              paddingHorizontal: 12,
            }}
          >
            <Search color={theme.colors.text.secondary} size={18} />
            <TextInput
              placeholder="Search jobs..."
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
        </View>

        {/* Tab Navigation */}
        <View
          style={{
            flexDirection: "row",
            marginHorizontal: 16,
            marginBottom: 20,
            backgroundColor: theme.colors.surface,
            borderRadius: 12,
            padding: 4,
            borderWidth: 1,
            borderColor: theme.colors.border,
          }}
        >
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.id}
              onPress={() => setSelectedTab(tab.id)}
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                paddingVertical: 12,
                borderRadius: 8,
                backgroundColor:
                  selectedTab === tab.id ? theme.colors.primary : "transparent",
              }}
            >
              <Text
                style={{
                  fontFamily: "Roboto_500Medium",
                  fontSize: 14,
                  color:
                    selectedTab === tab.id
                      ? "white"
                      : theme.colors.text.primary,
                  marginRight: 6,
                }}
              >
                {tab.label}
              </Text>
              <View
                style={{
                  backgroundColor:
                    selectedTab === tab.id
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
                      selectedTab === tab.id
                        ? "white"
                        : theme.colors.text.secondary,
                  }}
                >
                  {tab.count}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Jobs List */}
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => renderJobCard(job))
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
              <Wrench
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
              {searchQuery.trim() ? "No matching jobs" : "No jobs available"}
            </Text>

            <Text
              style={{
                fontSize: 14,
                fontFamily: "Roboto_400Regular",
                color: theme.colors.text.secondary,
                textAlign: "center",
                lineHeight: 20,
              }}
            >
              {searchQuery.trim()
                ? "Try adjusting your search criteria"
                : selectedTab === "available"
                  ? "Check back later for new repair requests"
                  : "You don't have any active jobs"}
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
