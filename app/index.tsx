import { useEffect } from "react";
import { View, StyleSheet, Image, Text, Platform } from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { appLogo } from "@/assets/images/logo";
import { useAuth } from "@/context/AuthContext";
import Colors from "@/constants/Colors";
import Animated, { FadeIn } from "react-native-reanimated";
import Logo from "@/assets/images/logo1.jpeg";

export default function SplashScreen() {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    const redirectAfterSplash = () => {
      // Short timeout to show splash
      setTimeout(() => {
        if (user) {
          router.replace("/dashboard");
        } else {
          router.replace("/login");
        }
      }, 2000);
    };

    if (!isLoading) {
      redirectAfterSplash();
    }
  }, [isLoading, user, router]);

  const Content = () => (
    <Animated.View
      entering={FadeIn.duration(1000)}
      style={styles.logoContainer}
    >
      <Image source={Logo} style={styles.logo} />
      <Animated.Text entering={FadeIn.delay(500)} style={styles.appName}>
        Grain Technik
      </Animated.Text>
      <Animated.Text entering={FadeIn.delay(700)} style={styles.tagline}>
        Each grain matters
      </Animated.Text>
    </Animated.View>
  );

  if (Platform.OS === "web") {
    return (
      <View style={[styles.container, styles.webGradient]}>
        <Content />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#172033", "#1E3A8A"]}
        style={styles.background}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Content />
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webGradient: {
    backgroundImage: "linear-gradient(135deg, #172033 0%, #1E3A8A 100%)",
    justifyContent: "center",
    alignItems: "center",
  },
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    alignItems: "center",
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 24,
  },
  appName: {
    fontSize: 32,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    color: "#E5E7EB",
    fontWeight: "500",
  },
});
