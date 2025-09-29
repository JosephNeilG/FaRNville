import React, { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import * as Progress from "react-native-progress";

import { COLORS } from "@/constants/Colors";
import { SeedItemType } from "@/entities/seed.types";
import { formatSecondsToMinutesSeconds } from "@/helpers/timeHelper";
import Card from "../card/Card";
import CardButton from "../card/CardButton";
import CardProfit from "../card/CardProfit";
import CardTitle from "../card/CardTitle";

interface FarmCardProps {
	item: SeedItemType;
	onRemovePress: () => void;
	onHarvestPress: () => void;
}

const FarmCard = ({ item, onRemovePress, onHarvestPress }: FarmCardProps) => {
	const [time_left, setTimeLeft] = useState(item.harvest_duration);

	useEffect(() => {
		const interval = setInterval(() => {
			if (item.planted_at_time) {
				const now = Date.now();
				const elapsed_sec = Math.floor(
					(now - item.planted_at_time) / 1000
				);
				const remaining = Math.max(
					item.harvest_duration - elapsed_sec,
					0
				);

				setTimeLeft(remaining);
			}
		}, 1000);

		return () => clearInterval(interval);
	}, [item.planted_at_time]);

	const progress = 1 - time_left / item.harvest_duration;
	const is_ready_to_harvest = time_left === 0;

	return (
		<Card>
			<View className="flex-row justify-between mb-3">
				<View className="flex-row items-center gap-3">
					<Image
						source={item.image}
						className="w-[70px] h-[70px] rounded-xl"
					/>

					<View>
						<CardTitle title_text={item.name} />

						{is_ready_to_harvest ? (
							<Text className={subtitle_style}>Harvest now!</Text>
						) : (
							<Text className={subtitle_style}>
								Harvest in{" "}
								{formatSecondsToMinutesSeconds(time_left)}
							</Text>
						)}
					</View>
				</View>

				<View>
					{is_ready_to_harvest ? (
						<CardButton
							onPress={onHarvestPress}
							bg_color={COLORS.primary}
							icon="check"
							label="Harvest"
						/>
					) : (
						<CardButton
							onPress={onRemovePress}
							bg_color={COLORS.danger}
							icon="xmark"
							label="Remove"
						/>
					)}

					{is_ready_to_harvest && (
						<CardProfit
							profit={item.profit}
							show_header={false}
							style={{ marginTop: 7 }}
						/>
					)}
				</View>
			</View>

			<Progress.Bar
				progress={progress}
				width={null}
				color={
					progress < 0.33
						? COLORS.progress.low
						: progress < 1
						? COLORS.progress.medium
						: COLORS.primary
				}
				unfilledColor={COLORS.light[200]}
				borderWidth={0}
				borderRadius={14}
				height={14}
			/>
		</Card>
	);
};

const subtitle_style = "text-dark-300 text-lg";

export default FarmCard;
