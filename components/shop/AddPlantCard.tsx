import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import React from "react";
import { Text, TouchableOpacity } from "react-native";

import { COLORS } from "@/constants/Colors";

interface AddPlantCardProps {
	onPress: () => void;
}

const AddPlantCard = ({ onPress }: AddPlantCardProps) => {
	return (
		<TouchableOpacity
			onPress={onPress}
			className="h-[110px] rounded-xl mt-4 border-2 border-dashed border-dark-300 items-center justify-center">
			<FontAwesome6 name="leaf" size={22} color={COLORS.primary} />
			<Text className="text-dark-300 text-xl font-regular mt-1">
				Plant a Seed
			</Text>
		</TouchableOpacity>
	);
};

export default AddPlantCard;
