import React, { useState, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Animated,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { router, useLocalSearchParams } from "expo-router";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import {
  ArrowLeft,
  Smartphone,
  Laptop,
  Tablet,
  Monitor,
  Camera,
  MapPin,
  Upload,
  CheckCircle,
} from "lucide-react-native";
import { useTheme } from "@/utils/theme";
import Card from "@/components/Card";
import KeyboardAvoidingAnimatedView from "@/components/KeyboardAvoidingAnimatedView";

export default function NewRequest() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const params = useLocalSearchParams();

  const [loaded, error] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  const [formData, setFormData] = useState({
    deviceType: params.device || "",
    issue: "",
    description: "",
    location: "",
    urgency: "medium",
    photos: [],
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Keyboard handling
  const focusedPadding = 12;
  const paddingAnimation = useRef(
    new Animated.Value(insets.bottom + focusedPadding),
  ).current;

  const animateTo = (value) => {
    Animated.timing(paddingAnimation, {
      toValue: value,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleInputFocus = () => {
    if (Platform.OS === "web") {
      return;
    }
    animateTo(focusedPadding);
  };

  const handleInputBlur = () => {
    if (Platform.OS === "web") {
      return;
    }
    animateTo(insets.bottom + focusedPadding);
  };

  if (!loaded && !error) {
    return null;
  }

  const deviceTypes = [
    { id: "smartphone", label: "Smartphone", icon: Smartphone },
    { id: "laptop", label: "Laptop", icon: Laptop },
    { id: "tablet", label: "Tablet", icon: Tablet },
    { id: "desktop", label: "Desktop", icon: Monitor },
    { id: "camera", label: "Camera", icon: Camera },
  ];

  const commonIssues = [
    "Screen Cracked/Broken",
    "Won't Turn On",
    "Battery Issues",
    "Water Damage",
    "Software Problems",
    "Charging Issues",
    "Audio Problems",
    "Camera Not Working",
    "Overheating",
    "Other",
  ];

  const urgencyLevels = [
    {
      id: "low",
      label: "Low",
      description: "Can wait a few days",
      color: theme.colors.success,
    },
    {
      id: "medium",
      label: "Medium",
      description: "Within 24-48 hours",
      color: theme.colors.warning,
    },
    {
      id: "high",
      label: "High",
      description: "Urgent, same day",
      color: theme.colors.error,
    },
  ];

  const handleSubmit = async () => {
    if (!formData.deviceType || !formData.issue || !formData.description) {
      Alert.alert("Missing Information", "Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Here you would typically send the data to your backend
      // For now, we'll simulate a successful submission
      await new Promise((resolve) => setTimeout(resolve, 2000));

      Alert.alert(
        "Request Submitted!",
        "Your repair request has been submitted successfully. You'll receive updates on the progress.",
        [
          {
            text: "OK",
            onPress: () => router.replace("/(tabs)/requests"),
          },
        ],
      );
    } catch (error) {
      Alert.alert("Error", "Failed to submit request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderDeviceSelection = () => (
    <Card>
      <Text
        style={{
          fontFamily: "Roboto_500Medium",
          fontSize: 18,
          color: theme.colors.text.primary,
          marginBottom: 16,
        }}
      >
        What device needs repair?
      </Text>

      <View style={{ gap: 12 }}>
        {deviceTypes.map((device) => (
          <TouchableOpacity
            key={device.id}
            onPress={() => setFormData({ ...formData, deviceType: device.id })}
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: 16,
              borderRadius: 12,
              borderWidth: 2,
              borderColor:
                formData.deviceType === device.id
                  ? theme.colors.primary
                  : theme.colors.border,
              backgroundColor:
                formData.deviceType === device.id
                  ? `${theme.colors.primary}10`
                  : theme.colors.surface,
            }}
          >
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor:
                  formData.deviceType === device.id
                    ? theme.colors.primary
                    : theme.colors.border,
                justifyContent: "center",
                alignItems: "center",
                marginRight: 12,
              }}
            >
              <device.icon
                color={
                  formData.deviceType === device.id
                    ? "white"
                    : theme.colors.text.secondary
                }
                size={20}
              />
            </View>
            <Text
              style={{
                fontFamily: "Roboto_500Medium",
                fontSize: 16,
                color:
                  formData.deviceType === device.id
                    ? theme.colors.primary
                    : theme.colors.text.primary,
              }}
            >
              {device.label}
            </Text>
            {formData.deviceType === device.id && (
              <CheckCircle
                color={theme.colors.primary}
                size={20}
                style={{ marginLeft: "auto" }}
              />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </Card>
  );

  const renderIssueSelection = () => (
    <Card>
      <Text
        style={{
          fontFamily: "Roboto_500Medium",
          fontSize: 18,
          color: theme.colors.text.primary,
          marginBottom: 16,
        }}
      >
        What's the problem?
      </Text>

      <View style={{ gap: 8 }}>
        {commonIssues.map((issue) => (
          <TouchableOpacity
            key={issue}
            onPress={() => setFormData({ ...formData, issue })}
            style={{
              padding: 12,
              borderRadius: 8,
              borderWidth: 1,
              borderColor:
                formData.issue === issue
                  ? theme.colors.primary
                  : theme.colors.border,
              backgroundColor:
                formData.issue === issue
                  ? `${theme.colors.primary}10`
                  : theme.colors.surface,
            }}
          >
            <Text
              style={{
                fontFamily: "Roboto_400Regular",
                fontSize: 14,
                color:
                  formData.issue === issue
                    ? theme.colors.primary
                    : theme.colors.text.primary,
              }}
            >
              {issue}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </Card>
  );

  const renderDetailsForm = () => (
    <KeyboardAvoidingAnimatedView style={{ flex: 1 }} behavior="padding">
      <Animated.View style={{ paddingBottom: paddingAnimation }}>
        <Card>
          <Text
            style={{
              fontFamily: "Roboto_500Medium",
              fontSize: 18,
              color: theme.colors.text.primary,
              marginBottom: 16,
            }}
          >
            Provide more details
          </Text>

          {/* Description */}
          <View style={{ marginBottom: 20 }}>
            <Text
              style={{
                fontFamily: "Roboto_500Medium",
                fontSize: 14,
                color: theme.colors.text.primary,
                marginBottom: 8,
              }}
            >
              Description *
            </Text>
            <TextInput
              multiline
              numberOfLines={4}
              placeholder="Describe the issue in detail..."
              placeholderTextColor={theme.colors.input.placeholder}
              value={formData.description}
              onChangeText={(text) =>
                setFormData({ ...formData, description: text })
              }
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              style={{
                backgroundColor: theme.colors.input.background,
                borderWidth: 1,
                borderColor: theme.colors.input.border,
                borderRadius: 8,
                padding: 12,
                fontFamily: "Roboto_400Regular",
                fontSize: 14,
                color: theme.colors.text.primary,
                textAlignVertical: "top",
                minHeight: 100,
              }}
            />
          </View>

          {/* Location */}
          <View style={{ marginBottom: 20 }}>
            <Text
              style={{
                fontFamily: "Roboto_500Medium",
                fontSize: 14,
                color: theme.colors.text.primary,
                marginBottom: 8,
              }}
            >
              Location
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: theme.colors.input.background,
                borderWidth: 1,
                borderColor: theme.colors.input.border,
                borderRadius: 8,
                paddingHorizontal: 12,
              }}
            >
              <MapPin color={theme.colors.text.secondary} size={16} />
              <TextInput
                placeholder="Enter your location"
                placeholderTextColor={theme.colors.input.placeholder}
                value={formData.location}
                onChangeText={(text) =>
                  setFormData({ ...formData, location: text })
                }
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                style={{
                  flex: 1,
                  marginLeft: 8,
                  paddingVertical: 12,
                  fontFamily: "Roboto_400Regular",
                  fontSize: 14,
                  color: theme.colors.text.primary,
                }}
              />
            </View>
          </View>

          {/* Urgency */}
          <View style={{ marginBottom: 20 }}>
            <Text
              style={{
                fontFamily: "Roboto_500Medium",
                fontSize: 14,
                color: theme.colors.text.primary,
                marginBottom: 12,
              }}
            >
              Urgency Level
            </Text>
            <View style={{ gap: 8 }}>
              {urgencyLevels.map((level) => (
                <TouchableOpacity
                  key={level.id}
                  onPress={() =>
                    setFormData({ ...formData, urgency: level.id })
                  }
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    padding: 12,
                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor:
                      formData.urgency === level.id
                        ? level.color
                        : theme.colors.border,
                    backgroundColor:
                      formData.urgency === level.id
                        ? `${level.color}10`
                        : theme.colors.surface,
                  }}
                >
                  <View
                    style={{
                      width: 16,
                      height: 16,
                      borderRadius: 8,
                      borderWidth: 2,
                      borderColor:
                        formData.urgency === level.id
                          ? level.color
                          : theme.colors.border,
                      backgroundColor:
                        formData.urgency === level.id
                          ? level.color
                          : "transparent",
                      marginRight: 12,
                    }}
                  />
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        fontFamily: "Roboto_500Medium",
                        fontSize: 14,
                        color: theme.colors.text.primary,
                      }}
                    >
                      {level.label}
                    </Text>
                    <Text
                      style={{
                        fontFamily: "Roboto_400Regular",
                        fontSize: 12,
                        color: theme.colors.text.secondary,
                      }}
                    >
                      {level.description}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Photo Upload Placeholder */}
          <TouchableOpacity
            style={{
              borderWidth: 2,
              borderColor: theme.colors.border,
              borderStyle: "dashed",
              borderRadius: 8,
              padding: 24,
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <Upload color={theme.colors.text.secondary} size={32} />
            <Text
              style={{
                fontFamily: "Roboto_500Medium",
                fontSize: 14,
                color: theme.colors.text.primary,
                marginTop: 8,
              }}
            >
              Add Photos (Optional)
            </Text>
            <Text
              style={{
                fontFamily: "Roboto_400Regular",
                fontSize: 12,
                color: theme.colors.text.secondary,
                textAlign: "center",
                marginTop: 4,
              }}
            >
              Photos help technicians understand the issue better
            </Text>
          </TouchableOpacity>
        </Card>
      </Animated.View>
    </KeyboardAvoidingAnimatedView>
  );

  const steps = [
    { title: "Device Type", component: renderDeviceSelection },
    { title: "Issue", component: renderIssueSelection },
    { title: "Details", component: renderDetailsForm },
  ];

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return formData.deviceType !== "";
      case 1:
        return formData.issue !== "";
      case 2:
        return formData.description.trim() !== "";
      default:
        return false;
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <StatusBar style={theme.isDark ? "light" : "dark"} />

      {/* Header */}
      <View
        style={{
          marginTop: insets.top + 10,
          marginHorizontal: 16,
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: theme.colors.surface,
            borderWidth: 1,
            borderColor: theme.colors.border,
            justifyContent: "center",
            alignItems: "center",
            marginRight: 16,
          }}
        >
          <ArrowLeft color={theme.colors.text.primary} size={20} />
        </TouchableOpacity>

        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontFamily: "Roboto_700Bold",
              fontSize: 20,
              color: theme.colors.text.primary,
            }}
          >
            New Repair Request
          </Text>
          <Text
            style={{
              fontFamily: "Roboto_400Regular",
              fontSize: 14,
              color: theme.colors.text.secondary,
            }}
          >
            Step {currentStep + 1} of {steps.length}: {steps[currentStep].title}
          </Text>
        </View>
      </View>

      {/* Progress Bar */}
      <View
        style={{
          marginHorizontal: 16,
          marginBottom: 20,
        }}
      >
        <View
          style={{
            height: 4,
            backgroundColor: theme.colors.border,
            borderRadius: 2,
          }}
        >
          <View
            style={{
              height: "100%",
              width: `${((currentStep + 1) / steps.length) * 100}%`,
              backgroundColor: theme.colors.primary,
              borderRadius: 2,
            }}
          />
        </View>
      </View>

      {/* Content */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingBottom: insets.bottom + 100,
        }}
        showsVerticalScrollIndicator={false}
      >
        {steps[currentStep].component()}
      </ScrollView>

      {/* Bottom Actions */}
      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: theme.colors.surface,
          borderTopWidth: 1,
          borderTopColor: theme.colors.border,
          paddingHorizontal: 16,
          paddingTop: 16,
          paddingBottom: insets.bottom + 16,
        }}
      >
        <View style={{ flexDirection: "row", gap: 12 }}>
          {currentStep > 0 && (
            <TouchableOpacity
              onPress={() => setCurrentStep(currentStep - 1)}
              style={{
                flex: 1,
                height: 48,
                borderRadius: 24,
                borderWidth: 1,
                borderColor: theme.colors.border,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: "Roboto_500Medium",
                  fontSize: 16,
                  color: theme.colors.text.primary,
                }}
              >
                Back
              </Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            onPress={() => {
              if (currentStep < steps.length - 1) {
                setCurrentStep(currentStep + 1);
              } else {
                handleSubmit();
              }
            }}
            disabled={!canProceed() || isSubmitting}
            style={{
              flex: 2,
              height: 48,
              borderRadius: 24,
              backgroundColor:
                canProceed() && !isSubmitting
                  ? theme.colors.primary
                  : theme.colors.border,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontFamily: "Roboto_500Medium",
                fontSize: 16,
                color:
                  canProceed() && !isSubmitting
                    ? "white"
                    : theme.colors.text.disabled,
              }}
            >
              {isSubmitting
                ? "Submitting..."
                : currentStep < steps.length - 1
                  ? "Next"
                  : "Submit Request"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
