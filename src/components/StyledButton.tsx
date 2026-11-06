import { Pressable, StyleSheet } from "react-native";
import { Spinner } from "./primitives/Spinner";
import { Text } from "./primitives/Text";

interface StyledButtonProps {
  label: string;
  onPress: () => void;
  variant?: "primary" | "secondary";
  backgroundColor?: string;
  textColor?: string;
  isLoading?: boolean;
  testID?: string;
}

export function StyledButton({
  label,
  onPress,
  variant = "primary",
  backgroundColor,
  textColor,
  isLoading = false,
  testID,
}: StyledButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={isLoading}
      style={[
        styles.base,
        styles[variant],
        backgroundColor ? { backgroundColor } : null,
        isLoading && styles.disabled,
      ]}
      testID={testID}
    >
      {isLoading ? (
        <Spinner size="small" />
      ) : (
        <Text size="lg" weight="medium" color={textColor}>
          {label}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 14,
  },
  primary: {},
  secondary: {},
  disabled: {},
});
