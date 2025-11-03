import { useEffect, useRef, useState } from "react";
import { Alert, Platform, ToastAndroid } from "react-native";

export function useApiRequest<T>(
  apiRequest: () => Promise<T>,
  errorMessage: string,
  deps: React.DependencyList = []
) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<T>();
  const apiRef = useRef(apiRequest);
  const errorRef = useRef(errorMessage);
  const depsKey = JSON.stringify(deps);

  useEffect(() => {
    apiRef.current = apiRequest;
  }, [apiRequest]);

  useEffect(() => {
    errorRef.current = errorMessage;
  }, [errorMessage]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    apiRef.current()
      .then((result) => {
        if (!cancelled) setData(result);
      })
      .catch((error) => {
        console.error(error);

        const message = errorRef.current ?? "An unknown error occurred";

        if (Platform.OS === "android") {
          ToastAndroid.show(message, ToastAndroid.SHORT);
        } else {
          Alert.alert(message);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [depsKey]);

  return { loading, data };
}