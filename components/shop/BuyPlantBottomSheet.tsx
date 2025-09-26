import {
	BottomSheetBackdrop,
	BottomSheetModal,
	BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, { forwardRef, useCallback, useMemo } from "react";
import { Text, View } from "react-native";

import { COLORS } from "@/constants/Colors";
import { PlantItemType } from "@/entities/plant.types";
import { useGameStore } from "@/store/gameStore";
import CustomButton from "../CustomButton";
import IconBox from "../IconBox";
import QuantityStepper from "../QuantityStepper";
import SectionTitle from "../SectionTitle";

interface BuyPlantBottomSheetProps {
	plant: PlantItemType | null;
	quantity: number;
	onQuantityChange: (value: number) => void;
	onBuyPress: () => void;
}

const BuyPlantBottomSheet = forwardRef<
	BottomSheetModal,
	BuyPlantBottomSheetProps
>(({ plant, quantity, onQuantityChange, onBuyPress }, ref) => {
	const earnings = useGameStore((state) => state.earnings);

	const snap_points = useMemo(() => ["40%"], []);

	const renderBackdrop = useCallback(
		(props: any) => (
			<BottomSheetBackdrop
				{...props}
				disappearsOnIndex={-1}
				appearsOnIndex={0}
			/>
		),
		[]
	);

	const handleDismiss = useCallback(() => {
		(ref as React.RefObject<BottomSheetModal>)?.current?.dismiss();
	}, []);

	if (!plant) return;

	const total_cost = plant.price * quantity;
	const is_plant_now_btn_disabled = total_cost > earnings || total_cost === 0;

	return (
		<BottomSheetModal
			backdropComponent={renderBackdrop}
			ref={ref}
			snapPoints={snap_points}
			backgroundStyle={{ backgroundColor: COLORS.light[100] }}>
			<BottomSheetView className="flex-1 px-5 pb-6">
				<View className="items-center">
					<IconBox icon_name="basket-shopping" />
					<SectionTitle title_text={plant.name} />
				</View>

				<View className="flex-row mt-4 items-center justify-between">
					<Text className="text-lg">Quantity</Text>
					<QuantityStepper
						quantity={quantity}
						onQuantityChange={onQuantityChange}
					/>
				</View>

				<View className="flex-row mt-3 items-center justify-between">
					<Text className="text-lg">Total Cost</Text>
					<Text className="font-semibold text-2xl">
						${total_cost.toFixed(2)}
					</Text>
				</View>

				<CustomButton
					onPress={onBuyPress}
					button_text="Buy Now"
					disabled={is_plant_now_btn_disabled}
					bg_color={
						is_plant_now_btn_disabled
							? COLORS.dark[100]
							: COLORS.primary
					}
				/>

				<CustomButton
					onPress={handleDismiss}
					button_text="Cancel"
					bordered
					font_color={COLORS.white}
				/>
			</BottomSheetView>
		</BottomSheetModal>
	);
});

export default BuyPlantBottomSheet;
