import React from "react";
import {Text, View} from "react-native";

export default function AssistantAnswer({ answer }) {
  return (
      <View>
          <Text>Assistant :</Text>
          <Text>{answer}</Text>
      </View>
  );
}
