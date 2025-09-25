import React from "react";
import { StyleProp, Text, TouchableOpacity, ViewStyle } from "react-native";

import { COLORS } from "@/constants/Colors";

interface CustomButtonProps {
	onPress?: () => void;
	button_text: string;
	bg_color?: string;
	font_color?: string;
	border_color?: string;
	bordered?: boolean;
	width?: number | string;
}

const CustomButton = ({
	onPress,
	button_text,
	bg_color = COLORS.primary,
	font_color = COLORS.white,
	border_color = COLORS.dark[300],
	bordered = false,
	width = "100%",
}: CustomButtonProps) => {
	return (
		<TouchableOpacity
			onPress={onPress}
			style={
				{
					backgroundColor: bordered ? "transparent" : bg_color,
					borderColor: bordered ? border_color : undefined,
					borderWidth: bordered ? 1 : 0,
					width: width,
				} as StyleProp<ViewStyle>
			}
			className="py-2 rounded-xl items-center justify-center mt-3">
			<Text
				style={{ color: bordered ? COLORS.dark[300] : font_color }}
				className="text-lg font-normal">
				{button_text}
			</Text>
		</TouchableOpacity>
	);
};

export default CustomButton;
