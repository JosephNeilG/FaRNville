import { COLORS } from "@/constants/Colors";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import React from "react";
import { Text, TouchableOpacity } from "react-native";

interface CardButtonProps {
	label: string;
	icon: keyof typeof FontAwesome6.glyphMap;
	bg_color: string;
	onPress?: () => void;
}

const CardButton = ({ label, icon, bg_color, onPress }: CardButtonProps) => {
	return (
		<TouchableOpacity
			onPress={onPress}
			className="flex-row items-center gap-2 px-3 py-1 rounded-xl"
			style={{ backgroundColor: bg_color }}>
			<FontAwesome6 name={icon} size={14} color={COLORS.white} />

			<Text className="text-white text-sm">{label}</Text>
		</TouchableOpacity>
	);
};

export default CardButton;
