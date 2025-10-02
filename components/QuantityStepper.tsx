import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import React from "react";
import { TouchableOpacity, View } from "react-native";

import { COLORS } from "@/constants/Colors";

interface QuantityStepperProps {
	quantity: number;
	onQuantityChange?: (value: number) => void;
	is_decrement_disabled?: boolean;
	is_increment_disabled?: boolean;
}

const QuantityStepper = ({
	quantity,
	onQuantityChange,
	is_decrement_disabled,
	is_increment_disabled,
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
				disabled={is_decrement_disabled}
				className={`border h-[23px] w-[23px] items-center justify-center rounded-md border-dark-100 ${is_decrement_disabled ? "opacity-50" : "border-dark-100"}`}>
				<FontAwesome6 name="minus" size={12} color={COLORS.dark[400]} />
			</TouchableOpacity>

			<BottomSheetTextInput
				onChangeText={handleChange}
				value={String(quantity)}
				keyboardType="numeric"
				className="font-semibold"
				style={{ width: 30, textAlign: "center" }}
			/>

			<TouchableOpacity
				onPress={handleIncrement}
				disabled={is_increment_disabled}
				className={`border h-[23px] w-[23px] items-center justify-center rounded-md border-primary ${
					is_increment_disabled ? "opacity-50" : "border-primary"
				}`}>
				<FontAwesome6 name="plus" size={12} color={COLORS.primary} />
			</TouchableOpacity>
		</View>
	);
};

export default QuantityStepper;
