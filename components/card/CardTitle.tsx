import React from "react";
import { Text } from "react-native";

interface CardTitleProps {
	title_text: string;
}

const CardTitle = ({ title_text }: CardTitleProps) => {
	return <Text className="text-xl font-medium">{title_text}</Text>;
};

export default CardTitle;
