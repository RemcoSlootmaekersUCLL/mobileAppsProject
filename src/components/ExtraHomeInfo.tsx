import { Text, View, StyleSheet } from "react-native";

const RETENTION_DAYS = 7; // retention policy

// More serious moments can lead to these being necessary
const STEPS = [
  {
    title: "Kies een onderwerp",
    body: "Kies wat past, of laat het open. Niets is verplicht.",
  },
  {
    title: "Krijg een match",
    body: "Een officiële psycholoog zal aan je worden toegewezen.",
  },
  {
    title: "Praat via berichten",
    body: "Zeg zo veel of zo weinig als je maar wilt. Je kan stoppen wanneer je wil.",
  },
];

// Anonymous texting
const PRIVACY = [
  "Geen e-mail of telefoonnummer",
  "Een willekeurige bijnaam die je kan veranderen",
  `Berichten worden automatisch verwijderd na ${RETENTION_DAYS} dagen`,
];

const ExtraHomeInfo = () => {
  return (
    <>
      {/* How it works */}
      <Text style={[styles.sectionTitle, styles.sectionGap]}>
        Hoe het werkt
      </Text>
      <View>
        {STEPS.map((step, i) => (
          <View key={step.title} style={styles.step}>
            <View style={styles.stepRail}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>{i + 1}</Text>
              </View>
              {i < STEPS.length - 1 && <View style={styles.stepLine} />}
            </View>
            <View style={styles.stepBody}>
              <Text style={styles.stepTitle}>{step.title}</Text>
              <Text style={styles.stepText}>{step.body}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Privacy */}
      <Text style={[styles.sectionTitle, styles.sectionGap]}>Jouw privacy</Text>
      <View style={styles.privacyList}>
        {PRIVACY.map((line) => (
          <Text key={line} style={styles.privacyItem}>
            {line}
          </Text>
        ))}
      </View>
      <Text style={styles.footnote}>
        Dit is een eerste gesprek, geen therapie. Als je verder wil gaan, kun je
        de contactgegevens vragen van je gesprekspartner.
      </Text>
    </>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    fontFamily: "serif",
    fontSize: 22,
    color: "#2E6770",
    marginTop: 30,
  },
  sectionGap: { marginTop: 40 },
  step: { flexDirection: "row" },
  stepRail: { alignItems: "center", width: 36 },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: "#2E6770",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
  },
  stepNumberText: { fontSize: 14, fontWeight: "600", color: "#2E6770" },
  stepLine: { flex: 1, width: 1.5, backgroundColor: "#C9D4D9", marginTop: 4 },
  stepBody: { flex: 1, paddingTop: 16, paddingBottom: 8, paddingLeft: 10 },
  stepTitle: { fontSize: 16, fontWeight: "600", color: "#1B2A35" },
  stepText: {
    fontSize: 15,
    lineHeight: 21,
    color: "#52626E",
    marginTop: 3,
  },

  privacyList: { marginTop: 12 },
  privacyItem: {
    fontSize: 15,
    color: "#1B2A35",
    paddingVertical: 11,
    borderBottomWidth: 1,
    borderBottomColor: "#C9D4D9",
  },
  footnote: {
    fontSize: 14,
    lineHeight: 20,
    color: "#52626E",
    marginTop: 18,
  },
});
export default ExtraHomeInfo;
