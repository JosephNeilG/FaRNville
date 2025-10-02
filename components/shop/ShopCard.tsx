import React from "react";
import { Image, Text, View } from "react-native";

import { SeedItemType } from "@/entities/seed.types";
import { formatSecondsToMinutes } from "@/helpers/timeHelper";
import Card from "../card/Card";
import CardProfit from "../card/CardProfit";
import CardTitle from "../card/CardTitle";

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
						style={{ width: 90, height: 90 }}
						className="rounded-xl"
					/>

					<View>
						<CardTitle title_text={item.name} />
						<Text className="font-medium text-lg">
							${item.price.toFixed(2)}/
							<Text className="font-normal text-dark-300">
								pc
							</Text>
						</Text>
						<Text className="text-dark-100 mt-2">
							Harvest in{" "}
							{formatSecondsToMinutes(item.harvest_duration)}
						</Text>
					</View>
				</View>

				<CardProfit profit={item.profit} />
			</View>
		</Card>
	);
};

export default ShopCard;
