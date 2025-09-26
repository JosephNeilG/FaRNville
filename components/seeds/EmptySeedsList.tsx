import { COLORS } from "@/constants/Colors";
import React from "react";
import { View } from "react-native";
import CustomButton from "../CustomButton";
import IconBox from "../IconBox";
import SectionTitle from "../SectionTitle";
import Subtitle from "../Subtitle";

interface EmptySeedsListProps {
	onPress: () => void;
}

const EmptySeedsList = ({ onPress }: EmptySeedsListProps) => {
	return (
		<View className="flex-1 items-center justify-center">
			<IconBox
				icon_name="box-open"
				bg_color={COLORS.light[200]}
				icon_color={COLORS.dark[300]}
			/>
			<SectionTitle title_text="No Seeds Yet " />
			<Subtitle subtitle_text="Buy from the shop to start your farm." />

			<CustomButton
				button_text="Go to Shop"
				onPress={onPress}
				width="40%"
			/>
		</View>
	);
};

export default EmptySeedsList;
