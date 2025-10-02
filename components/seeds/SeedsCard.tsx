import React from "react";
import { Image, Text, View } from "react-native";

import { SeedItemType } from "@/entities/seed.types";
import { formatSecondsToMinutes } from "@/helpers/timeHelper";
import Card from "../card/Card";
import CardProfit from "../card/CardProfit";
import CardTitle from "../card/CardTitle";

interface SeedsCard {
	item: SeedItemType;
	is_selected?: boolean;
	onPress?: () => void;
}

const SeedsCard = ({ item, is_selected, onPress }: SeedsCard) => {
	const pcs_remaining_label =
		item.pcs_remaining! > 1 ? "pcs remaining" : "pc remaining";

	return (
		<Card onPress={onPress} is_selected={is_selected}>
			<View className="flex-row items-center justify-between">
				<View className="flex-row items-center gap-3">
					<Image
						source={item.image}
						style={{ width: 90, height: 90 }}
						className="rounded-xl"
					/>

					<View>
						<CardTitle title_text={item.name} />
						<Text className="font-normal text-lg text-dark-300">
							{item.pcs_remaining + pcs_remaining_label}
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

export default SeedsCard;
