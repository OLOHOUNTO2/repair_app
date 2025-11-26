import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Smartphone, Calendar, MapPin, User } from "lucide-react-native";
import { useTheme } from "@/utils/theme";
import StatusBadge from "./StatusBadge";

export default function RequestCard({
  request,
  onPress,
  showTechnician = false,
}) {
  const theme = useTheme();

  const getDeviceIcon = (deviceType) => {
    switch (deviceType?.toLowerCase()) {
      case "smartphone":
      case "phone":
        return Smartphone;
      default:
        return Smartphone;
    }
  };

  const DeviceIcon = getDeviceIcon(request.deviceType);

  return (
    <TouchableOpacity
      onPress={() => onPress?.(request)}
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
      {/* Header Row */}
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
            {request.deviceType} Repair
          </Text>
          <Text
            style={{
              fontFamily: "Roboto_400Regular",
              fontSize: 14,
              color: theme.colors.text.secondary,
            }}
          >
            Request #{request.id}
          </Text>
        </View>
        <StatusBadge status={request.status} />
      </View>

      {/* Device and Issue */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 12,
        }}
      >
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: theme.isDark ? "#3A3A3A" : "#F0F9FF",
            justifyContent: "center",
            alignItems: "center",
            marginRight: 12,
          }}
        >
          <DeviceIcon color={theme.colors.info} size={20} />
        </View>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontFamily: "Roboto_500Medium",
              fontSize: 14,
              color: theme.colors.text.primary,
              marginBottom: 2,
            }}
          >
            {request.issue}
          </Text>
          {request.description && (
            <Text
              style={{
                fontFamily: "Roboto_400Regular",
                fontSize: 12,
                color: theme.colors.text.secondary,
                numberOfLines: 2,
              }}
            >
              {request.description}
            </Text>
          )}
        </View>
      </View>

      {/* Details Row */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
          <Calendar color={theme.colors.text.tertiary} size={14} />
          <Text
            style={{
              fontFamily: "Roboto_400Regular",
              fontSize: 12,
              color: theme.colors.text.tertiary,
              marginLeft: 4,
            }}
          >
            {new Date(request.createdAt).toLocaleDateString()}
          </Text>
        </View>

        {request.location && (
          <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
            <MapPin color={theme.colors.text.tertiary} size={14} />
            <Text
              style={{
                fontFamily: "Roboto_400Regular",
                fontSize: 12,
                color: theme.colors.text.tertiary,
                marginLeft: 4,
              }}
              numberOfLines={1}
            >
              {request.location}
            </Text>
          </View>
        )}

        {showTechnician && request.technician && (
          <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
            <User color={theme.colors.text.tertiary} size={14} />
            <Text
              style={{
                fontFamily: "Roboto_400Regular",
                fontSize: 12,
                color: theme.colors.text.tertiary,
                marginLeft: 4,
              }}
              numberOfLines={1}
            >
              {request.technician.name}
            </Text>
          </View>
        )}

        {request.estimatedCost && (
          <Text
            style={{
              fontFamily: "Roboto_700Bold",
              fontSize: 14,
              color: theme.colors.primary,
            }}
          >
            ${request.estimatedCost}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}
