import { COLORS } from "@/constants/Colors";
import { PlantItemType } from "@/entities/plant.types";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import React from "react";
import { Image, Text, View } from "react-native";
import Card from "../card/Card";

interface SeedsCard {
	item: PlantItemType;
}

const SeedsCard = ({ item }: SeedsCard) => {
	const pcs_remaining_label =
		item.pcs_remaining > 1 ? "pcs remaining" : "pc remaining";

	return (
		<Card>
			<View className="flex-row items-center justify-between">
				<View className="flex-row items-center gap-3">
					<Image
						source={item.image}
						className="w-[90px] h-[90px] rounded-xl"
					/>

					<View>
						<Text className="text-xl font-medium">{item.name}</Text>
						<Text className="font-normal text-lg text-dark-300">
							{item.pcs_remaining + pcs_remaining_label}
						</Text>
						<Text className="text-dark-100 mt-2">
							Harvest in {item.harvest_time}m
						</Text>
					</View>
				</View>

				<View>
					<Text className="text-right text-dark-100">Profit</Text>
					<View className="flex-row items-center justify-end gap-2">
						<FontAwesome6
							name="arrow-up"
							size={15}
							color={COLORS.primary}
						/>
						<Text className="text-primary text-lg font-medium">
							${item.profit.toFixed(2)}
						</Text>
					</View>
				</View>
			</View>
		</Card>
	);
};

export default SeedsCard;
