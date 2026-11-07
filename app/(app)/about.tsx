import FivePillars from "@/components/aboutPage/FivePillars";
import Header from "@/components/Header";
import { Link } from "expo-router";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const color = {
  mist: "#EDF1F3", // screen background
  ink: "#1B2A35", // text
  inkSoft: "#52626E", // secondary text
  lake: "#2E6770", // primary action
  lakeTint: "#D3E4E2", // selected chips, nickname panel
  line: "#C9D4D9", // hairlines
  white: "#FFFFFF",
  alert: "#A8433B", // crisis, used only for crisis
  alertTint: "#F6E4E1",
};

const AboutPage = () => {
  return (
    <SafeAreaView style={styles.content} edges={["top"]}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Header />

        <FivePillars />

        <Link
          href={"https://www.compsy.be/nl_BE/le-code-de-deontologie"}
          selectionColor={color.ink}
          target="_blank"
        >
          Meer gedetailleerde info op de website van de Psychologencommissie.
        </Link>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: color.mist },
  content: { paddingHorizontal: 22, paddingTop: 12, paddingBottom: 20 },
});

export default AboutPage;
