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
  disabled?: boolean;
}

export function StyledButton({
  label,
  onPress,
  variant = "primary",
  backgroundColor,
  textColor,
  isLoading = false,
  testID,
  disabled = false,
}: StyledButtonProps) {
  const isDisabled = disabled || isLoading;

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.base,
        styles[variant],
        backgroundColor ? { backgroundColor } : null,
        pressed && styles.pressed,
        isLoading && styles.disabled,
        disabled && styles.disabled,
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
  pressed: { opacity: 0.85 },
  disabled: { backgroundColor: "#C9D4D9" },
});
