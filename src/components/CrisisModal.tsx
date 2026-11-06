import { Text } from "./primitives"; // adjust to your path
import { Linking, Modal, Pressable, StyleSheet, View } from "react-native";

const CRISIS_LINES = [
  {
    name: "Zelfmoordlijn",
    number: "1813",
    note: "Gratis, als je aan zelfdoding denkt",
  },
  {
    name: "Tele-Onthaal",
    number: "106",
    note: "Gratis, iemand om mee te praten",
  },
  {
    name: "Hulpdiensten",
    number: "112",
    note: "Als jij of iemand anders in gevaar is",
  },
];

type Props = {
  visible: boolean;
  onClose: () => void;
};

const CrisisModal = ({ visible, onClose }: Props) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <Pressable style={styles.backdrop} onPress={onClose} />
      <View style={styles.sheet}>
        <View style={styles.sheetHeader}>
          <Text size="xl" weight="bold">
            Je hoeft niet te wachten op een gesprek.
          </Text>
          <Text size="md">Deze nummers zijn gratis. Klik om te bellen.</Text>
        </View>

        {CRISIS_LINES.map((line) => (
          <Pressable
            key={line.number}
            onPress={() => Linking.openURL(`tel:${line.number}`)}
            accessibilityRole="button"
            accessibilityLabel={`Bel ${line.name} op ${line.number}`}
            style={({ pressed }) => [styles.lineRow, pressed && styles.pressed]}
          >
            <View style={styles.lineInfo}>
              <Text size="lg" weight="bold">
                {line.name}
              </Text>
              <Text size="sm">{line.note}</Text>
            </View>
            <Text size="xl" weight="bold">
              {line.number}
            </Text>
          </Pressable>
        ))}

        <Pressable
          onPress={onClose}
          accessibilityRole="button"
          style={styles.sheetClose}
        >
          <Text size="lg">Sluiten</Text>
        </Pressable>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  pressed: { opacity: 0.75 },
  backdrop: { flex: 1, backgroundColor: "rgba(27, 42, 53, 0.45)" },
  sheet: {
    backgroundColor: "#EDF1F3",
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    paddingHorizontal: 22,
    paddingTop: 26,
    paddingBottom: 34,
  },
  sheetHeader: { marginBottom: 14 },
  lineRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  lineInfo: { flex: 1, paddingRight: 12 },
  sheetClose: { alignItems: "center", paddingVertical: 14, marginTop: 4 },
});

export default CrisisModal;
