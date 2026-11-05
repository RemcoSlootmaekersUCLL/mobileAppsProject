import { Text } from "./primitives";
import { View, Pressable, StyleSheet } from "react-native";

type Props = {
  topics: string[];
  selected: string | null;
  onChange: (selected: string | null) => void;
};

const TopicSelector = ({ topics, selected, onChange }: Props) => {
  return (
    <>
      <Text size="lg">Wat zit je mee?</Text>
      <View style={styles.chips}>
        {topics.map((topic) => {
          const isSelected = selected === topic;
          return (
            <Pressable
              key={topic}
              // tapping the chosen chip again clears the choice
              onPress={() => onChange(isSelected ? null : topic)}
              accessibilityRole="radio"
              accessibilityState={{ selected: isSelected }}
              style={[styles.chip, isSelected && styles.chipSelected]}
            >
              <Text
                size="md"
                weight={isSelected ? "bold" : "normal"}
                color={isSelected ? "white" : "black"}
              >
                {topic}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    fontFamily: "serif",
    fontSize: 22,
    color: "#1B2A35",
  },
  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 5,
    marginRight: -8,
  },
  chip: {
    borderWidth: 1,
    borderColor: "#C9D4D9",
    backgroundColor: "#FFFFFF",
    borderRadius: 999,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  chipSelected: { backgroundColor: "#2E6770", borderColor: "#2E6770" },
  chipText: { fontSize: 15, color: "#1B2A35" },
  chipTextSelected: { color: "#FFFFFF", fontWeight: "600" },
});

export default TopicSelector;
