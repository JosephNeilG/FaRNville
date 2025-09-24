import React from "react";
import { Text } from "react-native";

interface SectionTitleProps {
	title_text: string;
}

const SectionTitle = ({ title_text }: SectionTitleProps) => {
	return <Text className="text-2xl font-medium">{title_text}</Text>;
};

export default SectionTitle;
