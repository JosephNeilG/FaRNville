import { COLORS } from "@/constants/Colors";
import { PlantItemType } from "@/entities/plant.types";
import { formatSecondsToMinutesSeconds } from "@/helpers/timeHelper";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import React from "react";
import { Image, Text, View } from "react-native";
import * as Progress from "react-native-progress";
import Card from "../card/Card";
import CardButton from "../card/CardButton";

interface FarmCardProps {
	item: PlantItemType;
	onRemovePress: () => void;
	onHarvestPress: () => void;
}

const FarmCard = ({ item, onRemovePress, onHarvestPress }: FarmCardProps) => {
	const is_ready_to_harvest = item.harvest_countdown === 0;
	return (
		<Card>
			<View className="flex-row justify-between mb-3">
				<View className="flex-row items-center gap-3">
					<Image
						source={item.image}
						className="w-[70px] h-[70px] rounded-xl"
					/>

					<View>
						<Text className="text-xl font-medium">{item.name}</Text>

						{is_ready_to_harvest ? (
							<Text className="text-dark-300 text-lg">
								Harvest now!
							</Text>
						) : (
							<Text className="text-dark-300 text-lg">
								Harvest in{" "}
								{formatSecondsToMinutesSeconds(
									item.harvest_countdown
								)}
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
						<View className="mt-2">
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
					)}
				</View>
			</View>

			<Progress.Bar
				progress={item.progress}
				width={null}
				color={
					item.progress < 0.33
						? COLORS.progress.low
						: item.progress < 1
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

export default FarmCard;
