import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import React from "react";
import { Image, Text, View } from "react-native";

import { COLORS } from "@/constants/Colors";
import { SeedItemType } from "@/entities/seed.types";
import Card from "../card/Card";

interface ShopCardProps {
	item: SeedItemType;
	onPress?: () => void;
}

const ShopCard = ({ item, onPress }: ShopCardProps) => {
	return (
		<Card onPress={onPress}>
			<View className="flex-row items-center justify-between">
				<View className="flex-row items-center gap-3">
					<Image
						source={item.image}
						className="w-[90px] h-[90px] rounded-xl"
					/>

					<View>
						<Text className="text-xl font-medium">{item.name}</Text>
						<Text className="font-medium text-lg">
							${item.price.toFixed(2)}/
							<Text className="font-normal text-dark-300">
								pc
							</Text>
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

export default ShopCard;
