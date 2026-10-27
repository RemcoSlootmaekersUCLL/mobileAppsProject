import React, { useCallback, useState } from 'react';
import {
  Linking,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const APP_NAME = 'AnoTalks';
const RETENTION_DAYS = 7; // retention policy

const TOPICS = [
  'Stress',
  'Angst',
  'Eenzaamheid',
  'Schooldruk',
  'Slaap',
  'Relaties',
  'Je niet in je vel voelen',
  'Nog niet zeker',
];
const NOT_SURE = 'Nog niet zeker';

const ADJECTIVES = ['Stille', 'Lieve', 'Voorzichtige', 'Dappere', 'Kalme', 'Slimme', 'Zachte', 'Geduldige'];
const ANIMALS = ['Reiger', 'Vos', 'Otter', 'Zwaan', 'Haas', 'Uil', 'Zeehond', 'Konijn'];

// More serious moments can lead to these being necessary
const CRISIS_LINES = [
  { name: 'Zelfmoordlijn', number: '1813', note: 'Gratis, voor wanneer je zelfmoordgedachten hebt.' },
  { name: 'Tele-Onthaal', number: '106', note: 'Gratis, om iemand te hebben om tegen te praten.' },
  { name: 'Emergency services', number: '112', note: 'Als jij of iemand anders in gevaar is.' },
];

const STEPS = [
  { title: 'Kies een onderwerp', body: 'Kies wat past, of laat het open. Niets is verplicht.' },
  { title: 'Krijg een match', body: 'Een officiële psycholoog zal aan je worden toegewezen.' },
  { title: 'Praat via berichten', body: 'Zeg zo veel of zo weinig als je maar wilt. Je kan stoppen wanneer je wil.' },
];

// Anonymous texting
const PRIVACY = [
  'Geen e-mail of telefoonnummer',
  'Een willekeurige bijnaam die je kan veranderen',
  `Berichten worden automatisch verwijderd na ${RETENTION_DAYS} dagen`,
];

const color = {
  mist: '#EDF1F3', // screen background
  ink: '#1B2A35', // text
  inkSoft: '#52626E', // secondary text
  lake: '#2E6770', // primary action
  lakeTint: '#D3E4E2', // selected chips, nickname panel
  line: '#C9D4D9', // hairlines
  white: '#FFFFFF',
  alert: '#A8433B', // crisis, used only for crisis
  alertTint: '#F6E4E1',
};

const serif = Platform.select({ ios: 'Georgia', android: 'serif', default: 'serif' });

const pick = <T,>(list: T[]): T => list[Math.floor(Math.random() * list.length)];
const makeNickname = () => `${pick(ADJECTIVES)} ${pick(ANIMALS)}`;

type Props = {
  /** Number of verified psychologists available right now (from your backend). */
  psychologistsOnline?: number;
  /** Called when the user taps the main button. Navigate to your queue/chat screen here. */
  onStart?: (request: { nickname: string; topics: string[] }) => void;
};

export default function HomeScreen({ psychologistsOnline = 0, onStart }: Props) {
  const [nickname, setNickname] = useState(makeNickname);
  const [topics, setTopics] = useState<string[]>([]);
  const [crisisOpen, setCrisisOpen] = useState(false);

  const toggleTopic = useCallback((topic: string) => {
    setTopics((current) => {
      if (topic === NOT_SURE) return current.includes(NOT_SURE) ? [] : [NOT_SURE];
      const withoutNotSure = current.filter((t) => t !== NOT_SURE);
      return withoutNotSure.includes(topic)
        ? withoutNotSure.filter((t) => t !== topic)
        : [...withoutNotSure, topic];
    });
  }, []);

  const availability =
    psychologistsOnline > 0
      ? `${psychologistsOnline} ${psychologistsOnline === 1 ? 'psycholoog is' : 'psychologen zijn'} nu beschikbaar`
      : 'Er is niemand beschikbaar op dit moment. Je zal in een wachtrij geplaatst worden en verwittigd worden als er iemand vrij is.';

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.appName}>{APP_NAME}</Text>
          <View style={styles.anonBadge} accessible accessibilityLabel="Your identity is hidden">
            <View style={styles.anonDot} />
            <Text style={styles.anonText}>Anoniem</Text>
          </View>
        </View>

        {/* Hero */}
        <Text style={styles.headline}>Zeg het luidop tegen iemand die luistert.</Text>
        <Text style={styles.lede}>
          Heb een eerste gesprek met een psycholoog, zonder je naam te moeten vermelden.
        </Text>

        {/* The memorable element: your anonymous name */}
        <View style={styles.nickPanel}>
          <Text style={styles.nickLabel}>Jij bent</Text>
          <Text style={styles.nickName} accessibilityRole="header">
            {nickname}
          </Text>
          <Pressable
            onPress={() => setNickname(makeNickname())}
            accessibilityRole="button"
            accessibilityLabel="Get a different nickname"
            style={({ pressed }) => [styles.nickButton, pressed && styles.pressed]}
          >
            <Text style={styles.nickButtonText}>Krijg een nieuwe naam</Text>
          </Pressable>
        </View>

        {/* Topics */}
        <Text style={styles.sectionTitle}>Wat zit je mee?</Text>
        <View style={styles.chips}>
          {TOPICS.map((topic) => {
            const selected = topics.includes(topic);
            return (
              <Pressable
                key={topic}
                onPress={() => toggleTopic(topic)}
                accessibilityRole="button"
                accessibilityState={{ selected }}
                style={[styles.chip, selected && styles.chipSelected]}
              >
                <Text style={[styles.chipText, selected && styles.chipTextSelected]}>{topic}</Text>
              </Pressable>
            );
          })}
        </View>

        {/* Main action */}
        <Pressable
          onPress={() => onStart?.({ nickname, topics })}
          accessibilityRole="button"
          style={({ pressed }) => [styles.cta, pressed && styles.pressed]}
        >
          <Text style={styles.ctaText}>Start een gesprek</Text>
        </Pressable>
        <Text style={styles.availability}>{availability}</Text>

        {/* How it works: a real sequence, so the numbering carries meaning */}
        <Text style={[styles.sectionTitle, styles.sectionGap]}>Hoe het werkt</Text>
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
          Dit is een eerste gesprek, geen therapie. Als je verder wil gaan, kun je de contactgegevens vragen van je gesprekspartner.
        </Text>
      </ScrollView>

      {/* Always visible crisis bar */}
      <View style={styles.crisisBar}>
        <Pressable
          onPress={() => setCrisisOpen(true)}
          accessibilityRole="button"
          accessibilityLabel="Need urgent help? Show crisis numbers"
          style={({ pressed }) => [styles.crisisButton, pressed && styles.pressed]}
        >
          <Text style={styles.crisisButtonText}>Ik heb dringed hulp nodig</Text>
        </Pressable>
      </View>

      {/* Crisis sheet */}
      <Modal
        visible={crisisOpen}
        transparent
        animationType="slide"
        onRequestClose={() => setCrisisOpen(false)}
      >
        <Pressable style={styles.backdrop} onPress={() => setCrisisOpen(false)} />
        <View style={styles.sheet}>
          <Text style={styles.sheetTitle}>Je hoeft niet te wachten op een gesprek.</Text>
          <Text style={styles.sheetLede}>Deze nummers zijn gratis. Klik om te bellen.</Text>
          {CRISIS_LINES.map((line) => (
            <Pressable
              key={line.number}
              onPress={() => Linking.openURL(`tel:${line.number}`)}
              accessibilityRole="button"
              accessibilityLabel={`Call ${line.name} on ${line.number}`}
              style={({ pressed }) => [styles.lineRow, pressed && styles.pressed]}
            >
              <View style={styles.lineInfo}>
                <Text style={styles.lineName}>{line.name}</Text>
                <Text style={styles.lineNote}>{line.note}</Text>
              </View>
              <Text style={styles.lineNumber}>{line.number}</Text>
            </Pressable>
          ))}
          <Pressable
            onPress={() => setCrisisOpen(false)}
            accessibilityRole="button"
            style={styles.sheetClose}
          >
            <Text style={styles.sheetCloseText}>Sluiten</Text>
          </Pressable>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

// Styling

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: color.mist },
  content: { paddingHorizontal: 22, paddingTop: 12, paddingBottom: 120 },
  pressed: { opacity: 0.75 },

  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  appName: { fontFamily: serif, fontSize: 20, color: color.ink, letterSpacing: 0.3 },
  anonBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: color.line,
    borderRadius: 999,
    paddingVertical: 5,
    paddingHorizontal: 11,
  },
  anonDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: color.lake, marginRight: 7 },
  anonText: { fontSize: 13, color: color.inkSoft },

  headline: {
    fontFamily: serif,
    fontSize: 34,
    lineHeight: 40,
    color: color.ink,
    marginTop: 30,
  },
  lede: { fontSize: 16, lineHeight: 23, color: color.inkSoft, marginTop: 12, maxWidth: 340 },

  nickPanel: {
    backgroundColor: color.lakeTint,
    borderRadius: 22,
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginTop: 26,
  },
  nickLabel: { fontSize: 14, color: color.inkSoft },
  nickName: { fontFamily: serif, fontSize: 30, color: color.ink, marginTop: 4 },
  nickButton: { alignSelf: 'flex-start', marginTop: 12, paddingVertical: 6 },
  nickButtonText: {
    fontSize: 15,
    color: color.lake,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },

  sectionTitle: { fontFamily: serif, fontSize: 22, color: color.ink, marginTop: 30 },
  sectionGap: { marginTop: 40 },

  chips: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 14, marginRight: -8 },
  chip: {
    borderWidth: 1,
    borderColor: color.line,
    backgroundColor: color.white,
    borderRadius: 999,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  chipSelected: { backgroundColor: color.lake, borderColor: color.lake },
  chipText: { fontSize: 15, color: color.ink },
  chipTextSelected: { color: color.white, fontWeight: '600' },

  cta: {
    backgroundColor: color.lake,
    borderRadius: 14,
    paddingVertical: 17,
    alignItems: 'center',
    marginTop: 18,
  },
  ctaText: { color: color.white, fontSize: 17, fontWeight: '600' },
  availability: { fontSize: 14, color: color.inkSoft, textAlign: 'center', marginTop: 12 },

  step: { flexDirection: 'row' },
  stepRail: { alignItems: 'center', width: 36 },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: color.lake,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  stepNumberText: { fontSize: 14, fontWeight: '600', color: color.lake },
  stepLine: { flex: 1, width: 1.5, backgroundColor: color.line, marginTop: 4 },
  stepBody: { flex: 1, paddingTop: 16, paddingBottom: 8, paddingLeft: 10 },
  stepTitle: { fontSize: 16, fontWeight: '600', color: color.ink },
  stepText: { fontSize: 15, lineHeight: 21, color: color.inkSoft, marginTop: 3 },

  privacyList: { marginTop: 12 },
  privacyItem: {
    fontSize: 15,
    color: color.ink,
    paddingVertical: 11,
    borderBottomWidth: 1,
    borderBottomColor: color.line,
  },
  footnote: { fontSize: 14, lineHeight: 20, color: color.inkSoft, marginTop: 18 },

  crisisBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 22,
    paddingTop: 12,
    paddingBottom: 24,
    backgroundColor: color.mist,
    borderTopWidth: 1,
    borderTopColor: color.line,
  },
  crisisButton: {
    backgroundColor: color.alertTint,
    borderWidth: 1,
    borderColor: color.alert,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  crisisButtonText: { color: color.alert, fontSize: 16, fontWeight: '600' },

  backdrop: { flex: 1, backgroundColor: 'rgba(27, 42, 53, 0.45)' },
  sheet: {
    backgroundColor: color.mist,
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    paddingHorizontal: 22,
    paddingTop: 26,
    paddingBottom: 34,
  },
  sheetTitle: { fontFamily: serif, fontSize: 24, color: color.ink },
  sheetLede: { fontSize: 15, color: color.inkSoft, marginTop: 6, marginBottom: 14 },
  lineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: color.white,
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  lineInfo: { flex: 1, paddingRight: 12 },
  lineName: { fontSize: 16, fontWeight: '600', color: color.ink },
  lineNote: { fontSize: 14, color: color.inkSoft, marginTop: 2 },
  lineNumber: { fontFamily: serif, fontSize: 26, color: color.alert },
  sheetClose: { alignItems: 'center', paddingVertical: 14, marginTop: 4 },
  sheetCloseText: { fontSize: 16, color: color.inkSoft },
});
