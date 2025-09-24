import { COLORS } from "@/constants/Colors";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";

interface QuantityStepperProps {
	onQuantityChange?: (value: number) => void;
}

const QuantityStepper = ({ onQuantityChange }: QuantityStepperProps) => {
	const [quantity, setQuantity] = useState(1);

	const handleDecrement = () => {
		const new_quantity = quantity - 1;

		if (new_quantity < 0) {
			setQuantity(0);
			onQuantityChange?.(0);
			return;
		}

		setQuantity(new_quantity);
		onQuantityChange?.(new_quantity);
	};

	const handleIncrement = () => {
		const new_quantity = quantity + 1;
		setQuantity(new_quantity);
		onQuantityChange?.(new_quantity);
	};

	const handleChange = (text: string) => {
		const numeric = parseInt(text, 10);

		if (isNaN(numeric)) {
			setQuantity(0);
			onQuantityChange?.(0);
			return;
		}

		setQuantity(numeric);
		onQuantityChange?.(numeric);
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
