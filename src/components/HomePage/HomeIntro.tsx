import { Text, Pressable, StyleSheet, View } from "react-native";

type Props = {
  nickname: string;
  onNewNickname: () => void;
};

const HomeIntro = ({ nickname, onNewNickname }: Props) => {
  return (
    <>
      <Text style={styles.headline}>
        Zeg het luidop tegen iemand die luistert.
      </Text>
      <Text style={styles.lede}>
        Heb een eerste gesprek met een psycholoog, zonder je naam te moeten
        vermelden.
      </Text>

      <View style={styles.nickPanel}>
        <Text style={styles.nickLabel}>Jij bent</Text>
        <Text style={styles.nickName} accessibilityRole="header">
          {nickname}
        </Text>
        <Pressable
          onPress={onNewNickname}
          accessibilityRole="button"
          accessibilityLabel="Kies een andere naam"
          style={({ pressed }) => [
            styles.nickButton,
            pressed && styles.pressed,
          ]}
        >
          <Text style={styles.nickButtonText}>Ik wil een nieuwe naam</Text>
        </Pressable>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  pressed: { opacity: 0.75 },
  headline: {
    fontFamily: "serif",
    fontSize: 34,
    lineHeight: 40,
    color: "#1B2A35",
  },
  lede: {
    fontSize: 16,
    lineHeight: 23,
    color: "#52626E",
    marginTop: 12,
    maxWidth: 340,
  },

  nickPanel: {
    backgroundColor: "#D3E4E2",
    borderRadius: 22,
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginTop: 26,
  },
  nickLabel: { fontSize: 14, color: "#52626E" },
  nickName: {
    fontFamily: "serif",
    fontSize: 30,
    color: "#1B2A35",
    marginTop: 4,
  },
  nickButton: { alignSelf: "flex-start", marginTop: 12, paddingVertical: 6 },
  nickButtonText: {
    fontSize: 15,
    color: "#2E6770",
    fontWeight: "600",
    textDecorationLine: "underline",
  },
});

export default HomeIntro;
