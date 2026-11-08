import { StyleSheet, View, Text, Platform } from "react-native";

const serif = Platform.select({
  ios: "Georgia",
  android: "serif",
  default: "serif",
});

const EXPECTATIONS = [
  {
    title: "Dit is geen oplossing op lange termijn.",
    body: "Dit platform biedt je een kort eerste gesprek aan met een psycholoog. Deze kan je advies geven over wat je op dit moment nodig hebt. Voor een oplossing op lange termijn zul je naar meer gepersonaliseerde professionele hulp moeten zoeken. Hier kan je gesprekspartner je bij helpen.",
  },
  {
    title: "Je deelt hoeveel je zelf wil.",
    body: "Jij geeft je grenzen aan tijdens het gesprek met de psycholoog waarmee je verbonden wordt. Deze grenzen dienen gerespecteerd te worden door de pscholoog in kwestie.",
  },
  {
    title: "De psycholoog is er voor jou.",
    body: "De psycholoog luistert actief naar wat je vertelt, zonder te oordelen. Je hoeft je niet te verantwoorden voor wat je voelt of denkt.",
  },
  {
    title: "Je kan op elk moment stoppen.",
    body: "Je mag het gesprek altijd beëindigen, zonder uitleg. Ook de psycholoog kan het gesprek stoppen als dat nodig is, bijvoorbeeld als een andere vorm van hulp beter past. Dan helpt die je op weg naar de juiste hulp.",
  },
  {
    title: "Dit is geen noodhulp.",
    body: "Zit je in een crisis of denk je eraan jezelf iets aan te doen? Wacht dan niet op een gesprek. Gebruik de knop 'Ik heb dringend hulp nodig' onderaan het scherm.",
  },
  {
    title: "Anoniem betekent niet zonder grenzen.",
    body: "Je hoeft je naam niet te geven. Maar bij ernstig gevaar kan de psycholoog je aanmoedigen om hulp in te schakelen. Respectloos gedrag kan leiden tot het stopzetten van het gesprek.",
  },
  {
    title: "Je krijgt geen diagnose.",
    body: "In een kort eerste gesprek wordt geen diagnose gesteld en krijg je geen behandeling. Het gaat om luisteren, ordenen en je een richting wijzen.",
  },
];

const Expectations = () => {
  return (
    <View>
      <Text style={styles.title}>1. Je verwachtingen</Text>
      <View style={styles.list}>
        {EXPECTATIONS.map((e, i) => (
          <View key={e.title} style={[styles.item, i > 0 && styles.divider]}>
            <Text style={styles.itemTitle}>{e.title}</Text>
            <Text style={styles.itemBody}>{e.body}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: { fontFamily: serif, fontSize: 22, color: "#1B2A35" },
  list: { marginTop: 8 },

  item: { paddingVertical: 18 },
  divider: { borderTopWidth: 1, borderTopColor: "#C9D4D9" },

  itemTitle: {
    fontFamily: serif,
    fontSize: 18,
    lineHeight: 24,
    color: "#1B2A35",
  },
  itemBody: {
    fontSize: 15,
    lineHeight: 23,
    color: "#52626E",
    marginTop: 6,
  },
});

export default Expectations;
