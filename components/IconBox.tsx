import { COLORS } from "@/constants/Colors";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import React from "react";
import { View } from "react-native";

interface IconBoxProps {
	icon_name: keyof typeof FontAwesome6.glyphMap;
	bg_color?: string;
	icon_color?: string;
	icon_size?: number;
}

const IconBox = ({
	icon_name,
	bg_color = COLORS.green[100],
	icon_color = COLORS.primary,
	icon_size = 20,
}: IconBoxProps) => {
	return (
		<View
			className="h-[45px] w-[45px] items-center justify-center rounded-xl mb-2"
			style={{ backgroundColor: bg_color }}>
			<FontAwesome6
				name={icon_name}
				size={icon_size}
				color={icon_color}
			/>
		</View>
	);
};

export default IconBox;
