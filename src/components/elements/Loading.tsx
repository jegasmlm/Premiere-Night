import { ActivityIndicator, Text } from "react-native";
import Layout from "./Layout";

export default function Loading() {
  return (
    <Layout flexDirection="column" gap={8} justifyContent="center" alignItems="center" flex={1}>
      <Text>Loading...</Text>
      <ActivityIndicator />
    </Layout>
  );
}