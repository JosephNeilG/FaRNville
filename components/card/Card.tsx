import React, { ReactNode } from "react";
import { Pressable, StyleSheet } from "react-native";

import { COLORS } from "@/constants/Colors";

interface CardProps {
	children: ReactNode;
	is_selected?: boolean;
	onPress?: () => void;
}

const Card = ({ children, is_selected, onPress }: CardProps) => {
	return (
		<Pressable
			onPress={onPress}
			style={[
				{
					borderWidth: is_selected ? 2 : 2,
					borderColor: is_selected ? COLORS.primary : "transparent",
					borderRadius: 12,
				},
				styles.card_shadow,
			]}
			className="bg-white p-3 rounded-xl mt-4">
			{children}
		</Pressable>
	);
};

export default Card;

const styles = StyleSheet.create({
	card_shadow: {
		elevation: 3,
		shadowColor: COLORS.dark[100],
		shadowOffset: { width: 0, height: 3 },
		shadowOpacity: 0.1,
		shadowRadius: 1,
	},
});
