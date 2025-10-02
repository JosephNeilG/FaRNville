import {
	BottomSheetBackdrop,
	BottomSheetModal,
	BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, { forwardRef, RefObject, useCallback, useMemo } from "react";
import { Text, View } from "react-native";

import { COLORS } from "@/constants/Colors";
import { SeedItemType } from "@/entities/seed.types";
import { useGameStore } from "@/store/gameStore";
import { bottom_sheet_styles } from "@/stylesheets/components/bottomsheet.stylesheet";
import CustomButton from "../CustomButton";
import IconBox from "../IconBox";
import ListContainer from "../ListContainer";
import QuantityStepper from "../QuantityStepper";
import SectionTitle from "../SectionTitle";

interface BuyPlantBottomSheetProps {
	plant: SeedItemType | null;
	quantity: number;
	onQuantityChange: (value: number) => void;
	onBuyPress: () => void;
}

const BuyPlantBottomSheet = forwardRef<
	BottomSheetModal,
	BuyPlantBottomSheetProps
>(({ plant, quantity, onQuantityChange, onBuyPress }, ref) => {
	const balance = useGameStore((state) => state.balance);

	const snap_points = useMemo(() => ["45%"], []);

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
		(ref as RefObject<BottomSheetModal>)?.current?.dismiss();
	}, []);

	const total_cost = (plant?.price ?? 0) * quantity;

	const is_decrement_disabled = quantity <= 1;
	const next_cost = plant?.price! * (quantity + 1);
	const is_increment_disabled = next_cost > balance;

	const is_buy_btn_disabled = total_cost > balance || total_cost === 0;

	return (
		<BottomSheetModal
			backdropComponent={renderBackdrop}
			ref={ref}
			snapPoints={snap_points}
			backgroundStyle={{ backgroundColor: COLORS.light[100] }}>
			<ListContainer>
				<BottomSheetView style={bottom_sheet_styles.container}>
					<View className="items-center">
						<IconBox icon_name="basket-shopping" />
						<SectionTitle title_text={plant?.name ?? ""} />
					</View>

					<View className="flex-row mt-4 items-center justify-between">
						<Text className="text-lg">Quantity</Text>
						<QuantityStepper
							onQuantityChange={onQuantityChange}
							is_decrement_disabled={is_decrement_disabled}
							is_increment_disabled={is_increment_disabled}
							quantity={quantity}
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
						disabled={is_buy_btn_disabled}
						bg_color={
							is_buy_btn_disabled
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
			</ListContainer>
		</BottomSheetModal>
	);
});

export default BuyPlantBottomSheet;
