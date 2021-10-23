import { MotiView } from "@motify/components";
import React from "react";

import { Text, View } from "react-native";
import { Avatar } from "../Avatar";

import { styles } from "./styles";

type User = {
  name: string;
  avatar_url: string;
};

export type MessageProps = {
  id: string;
  text: string;
  user: User;
};

type Props = {
  data: MessageProps;
};

export function Message({ data }: Props) {
  return (
    <MotiView
      style={styles.container}
      from={{ opacity: 0, translateY: -50 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: "timing", duration: 500 }}
    >
      <Text style={styles.message}>{data.text}</Text>
      <View style={styles.footer}>
        <Avatar imageUri={data.user.avatar_url} size="SMALL" />
        <Text style={styles.userName}>{data.user.name}</Text>
      </View>
    </MotiView>
  );
}
