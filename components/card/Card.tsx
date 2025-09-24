import { COLORS } from "@/constants/Colors";
import React, { ReactNode } from "react";
import { Pressable, StyleSheet } from "react-native";

interface CardProps {
	children: ReactNode;
}

const Card = ({ children }: CardProps) => {
	return (
		<Pressable
			className="bg-white p-3 rounded-xl mt-4"
			style={styles.card_shadow}>
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
