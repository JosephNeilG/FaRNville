import { COLORS } from "@/constants/Colors";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import React from "react";
import { Text, View, ViewStyle } from "react-native";

interface CardProfitProps {
	profit: number;
	show_header?: boolean;
	style?: ViewStyle;
}

const CardProfit = ({ profit, show_header = true, style }: CardProfitProps) => {
	return (
		<View style={style}>
			{show_header && (
				<Text className="text-right text-dark-100">Profit</Text>
			)}

			<View className="flex-row items-center justify-end gap-2">
				<FontAwesome6
					name="arrow-up"
					size={15}
					color={COLORS.primary}
				/>
				<Text className="text-primary text-lg font-medium">
					${`${profit.toFixed(2)}`}
				</Text>
			</View>
		</View>
	);
};

export default CardProfit;
