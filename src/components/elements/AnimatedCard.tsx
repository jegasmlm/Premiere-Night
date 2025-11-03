import React, { useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";

export type AnimatedCardProps = {
  index: number;
  children: React.ReactNode;
}

export default function AnimatedCard({ index, children }: AnimatedCardProps) {
  const progress = useRef(new Animated.Value(0)).current;
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    if (hasAnimatedRef.current) return;
    hasAnimatedRef.current = true;
    Animated.timing(progress, {
      toValue: 1,
      duration: 450,
      delay: index * 120,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [index, progress]);

  const rotate = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ["-3deg", "0deg"],
  });

  const translateY = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [12, 0],
  });

  const opacity = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const scale = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0.98, 1],
  });

  return (
    <Animated.View style={{ opacity, transform: [{ rotate }, { translateY }, { scale }] }}>
      {children}
    </Animated.View>
  );
}


