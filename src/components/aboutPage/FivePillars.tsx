import { Platform, StyleSheet, Text, View } from "react-native";

const serif = Platform.select({
  ios: "Georgia",
  android: "serif",
  default: "serif",
});

const PILLARS = [
  {
    title: "Het beroepsgeheim",
    body: "De psycholoog die met je gekoppeld wordt, is verplicht alles wat je vertelt geheim te houden (artikel 458 van het Strafwetboek). Deze heeft wel de machtiging om iets door te vertellen als de wet dit verplicht, of als er toestemming gegeven is door de cliënt.",
  },
  {
    title: "Eerbiediging van de waardigheid en de rechten van de persoon",
    body: "De psycholoog die met je gekoppeld wordt, is verplicht je rechten te respecteren. Dit zijn: je vrijheid, autonomie, integriteit, waardigheid en privacy.",
  },
  {
    title: "De verantwoordelijkheid",
    body: "De psycholoog die met je gekoppeld wordt, is altijd verantwoordelijk voor de keuzes die hij of zij maakt en de adviezen die hij of zij verstrekt.",
  },
  {
    title: "De bekwaamheid",
    body: "De psycholoog die aan je gekoppeld wordt, dient zijn of haar deskundigheid zelf te evalueren en je door te verwijzen naar een andere psycholoog of, in context van dit platform, het gesprek te beëindigen wanneer hij of zij de limiet van zijn of haar kunnen bereikt.",
  },
  {
    title: "Integriteit en eerlijkheid",
    body: "De psycholoog die aan je gekoppeld wordt, neemt een onafhankelijke positie in. Dit wil niet zeggen dat de psycholoog zijn of haar persoonlijke belangen als prioritair mag beschouwen.",
  },
];

const FivePillars = () => {
  return (
    <View>
      <Text style={styles.title}>Deontologische code: 5 pijlers</Text>

      <View style={styles.list}>
        {PILLARS.map((pillar, i) => (
          <View key={pillar.title} style={styles.row}>
            <View style={styles.rail}>
              <View style={styles.number}>
                <Text style={styles.numberText}>{i + 1}</Text>
              </View>
              {i < PILLARS.length - 1 && <View style={styles.line} />}
            </View>

            <View style={styles.body}>
              <Text style={styles.pillarTitle}>{pillar.title}</Text>
              <Text style={styles.pillarText}>{pillar.body}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: { fontFamily: serif, fontSize: 22, color: "#1B2A35" },
  list: { marginTop: 8 },

  row: { flexDirection: "row" },
  rail: { alignItems: "center", width: 36 },
  number: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: "#2E6770",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
  },
  numberText: { fontSize: 14, fontWeight: "600", color: "#2E6770" },
  line: { flex: 1, width: 1.5, backgroundColor: "#C9D4D9", marginTop: 4 },

  body: { flex: 1, paddingTop: 16, paddingBottom: 8, paddingLeft: 10 },
  pillarTitle: { fontSize: 16, fontWeight: "600", color: "#1B2A35" },
  pillarText: { fontSize: 15, lineHeight: 21, color: "#52626E", marginTop: 3 },
});

export default FivePillars;
