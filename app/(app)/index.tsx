import TopicSelector from "@/components/TopicSelector";
import CrisisModal from "@/components/CrisisModal";
import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyledButton } from "@/components/StyledButton";
import Header from "@/components/Header";
import HomeIntro from "@/components/HomeIntro";
import ExtraHomeInfo from "@/components/ExtraHomeInfo";

const ADJECTIVES = [
  "Stille",
  "Lieve",
  "Voorzichtige",
  "Dappere",
  "Kalme",
  "Slimme",
  "Zachte",
  "Geduldige",
];
const ANIMALS = [
  "Reiger",
  "Vos",
  "Otter",
  "Zwaan",
  "Haas",
  "Uil",
  "Zeehond",
  "Konijn",
];

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

const TOPICS = [
  "Stress",
  "Angst",
  "Eenzaamheid",
  "Schooldruk",
  "Slaap",
  "Relaties",
  "Je niet in je vel voelen",
  "Overig",
];

const pick = <T,>(list: T[]): T =>
  list[Math.floor(Math.random() * list.length)];
const makeNickname = () => `${pick(ADJECTIVES)} ${pick(ANIMALS)}`;

type Props = {
  psychologistsOnline?: number;
};

export default function HomeScreen({ psychologistsOnline = 0 }: Props) {
  const [nickname, setNickname] = useState(makeNickname);
  const [crisisOpen, setCrisisOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const availability =
    psychologistsOnline > 0
      ? `${psychologistsOnline} ${psychologistsOnline === 1 ? "psycholoog is" : "psychologen zijn"} nu beschikbaar`
      : "Er is niemand beschikbaar op dit moment. Je zal in een wachtrij geplaatst worden en verwittigd worden als er iemand vrij is.";

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Header />
        <HomeIntro
          nickname={nickname}
          onNewNickname={() => setNickname(makeNickname())}
        />
        <View style={{ marginTop: 12 }}>
          <TopicSelector
            topics={TOPICS}
            selected={selectedTopic}
            onChange={setSelectedTopic}
          />
        </View>
        {/* Main action */}
        <Pressable
          accessibilityRole="button"
          style={({ pressed }) => [styles.cta, pressed && styles.pressed]}
        >
          <Text style={styles.ctaText}>Start een gesprek</Text>
        </Pressable>
        <Text style={styles.availability}>{availability}</Text>

        <ExtraHomeInfo />
      </ScrollView>

      <View style={styles.crisisBar}>
        <StyledButton
          label="Ik heb dringend hulp nodig"
          backgroundColor="#F6E4E1"
          textColor="#A8433B"
          onPress={() => setCrisisOpen(true)}
        />
      </View>
      <CrisisModal visible={crisisOpen} onClose={() => setCrisisOpen(false)} />
    </SafeAreaView>
  );
}

// Styling
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: color.mist },
  content: { paddingHorizontal: 22, paddingTop: 12, paddingBottom: 20 },
  pressed: { opacity: 0.75 },

  cta: {
    backgroundColor: color.lake,
    borderRadius: 14,
    paddingVertical: 17,
    alignItems: "center",
    marginTop: 18,
  },
  ctaText: { color: color.white, fontSize: 17, fontWeight: "600" },
  availability: {
    fontSize: 14,
    color: color.inkSoft,
    textAlign: "center",
    marginTop: 12,
  },

  crisisBar: {
    paddingHorizontal: 22,
    paddingVertical: 12,
    backgroundColor: "#EDF1F3",
    borderTopWidth: 1,
    borderTopColor: "#C9D4D9",
  },
});
