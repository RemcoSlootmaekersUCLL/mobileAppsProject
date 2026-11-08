import { Text, StyleSheet, View } from "react-native";

const APP_NAME = "AnoTalks";

const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.appName}>{APP_NAME}</Text>
      <View
        style={styles.anonBadge}
        accessible
        accessibilityLabel="Je identiteit is verborgen"
      >
        <View style={styles.anonDot} />
        <Text style={styles.anonText}>Anoniem</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  appName: {
    fontFamily: "serif",
    fontSize: 20,
    color: "#1B2A35",
    letterSpacing: 0.3,
  },
  anonDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#2E6770",
    marginRight: 7,
  },
  anonText: { fontSize: 13, color: "#52626E" },
  anonBadge: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#C9D4D9",
    borderRadius: 999,
    paddingVertical: 5,
    paddingHorizontal: 11,
  },
});

export default Header;
