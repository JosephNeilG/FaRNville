import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import React from "react";
import { TouchableOpacity, View } from "react-native";

import { COLORS } from "@/constants/Colors";

interface QuantityStepperProps {
	quantity: number;
	onQuantityChange?: (value: number) => void;
}

const QuantityStepper = ({
	quantity,
	onQuantityChange,
}: QuantityStepperProps) => {
	if (!onQuantityChange) return;

	const handleDecrement = () => {
		const new_quantity = Math.max(0, quantity - 1);
		onQuantityChange(new_quantity);
	};

	const handleIncrement = () => {
		onQuantityChange(quantity + 1);
	};

	const handleChange = (text: string) => {
		const numeric = parseInt(text, 10);
		onQuantityChange(isNaN(numeric) ? 0 : numeric);
	};

	return (
		<View className="flex-row gap-1 items-center">
			<TouchableOpacity
				onPress={handleDecrement}
				className="border border-light-300 h-[23px] w-[23px] items-center justify-center rounded-md">
				<FontAwesome6 name="minus" size={12} color={COLORS.dark[400]} />
			</TouchableOpacity>

			<BottomSheetTextInput
				onChangeText={handleChange}
				value={String(quantity)}
				keyboardType="numeric"
				className="text-center w-[30px] font-semibold"
			/>

			<TouchableOpacity
				onPress={handleIncrement}
				className="border border-primary h-[23px] w-[23px] items-center justify-center rounded-md">
				<FontAwesome6 name="plus" size={12} color={COLORS.primary} />
			</TouchableOpacity>
		</View>
	);
};

export default QuantityStepper;
