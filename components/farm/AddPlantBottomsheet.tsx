import { COLORS } from "@/constants/Colors";
import { PLANT_ITEMS } from "@/constants/PlantItems";
import { PlantItemType } from "@/entities/plant.types";
import {
	BottomSheetBackdrop,
	BottomSheetModal,
	BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, { forwardRef, useCallback, useMemo } from "react";
import { FlatList, ListRenderItem, View } from "react-native";
import CustomButton from "../CustomButton";
import IconBox from "../IconBox";
import SectionTitle from "../SectionTitle";
import SeedsCard from "../seeds/SeedsCard";

interface RemovePlantBottomSheetProps {
	onAddPlantPress: () => void;
}

const AddPlantBottomSheet = forwardRef<
	BottomSheetModal,
	RemovePlantBottomSheetProps
>(({ onAddPlantPress }, ref) => {
	const snap_points = useMemo(() => ["80%"], []);

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

	const renderSeedsCard: ListRenderItem<PlantItemType> = ({ item }) => (
		<SeedsCard item={item} />
	);

	return (
		<BottomSheetModal
			backdropComponent={renderBackdrop}
			ref={ref}
			snapPoints={snap_points}
			backgroundStyle={{ backgroundColor: COLORS.light[100] }}>
			<BottomSheetView className="flex-1 px-5 pb-6">
				<View className="items-center">
					<IconBox icon_name="leaf" />

					<SectionTitle title_text="Plant your seeds" />
				</View>

				<FlatList
					data={PLANT_ITEMS}
					keyExtractor={(item) => item.id.toString()}
					renderItem={renderSeedsCard}
					contentContainerStyle={{ flex: 1, paddingBottom: 10 }}
				/>

				<CustomButton
					onPress={onAddPlantPress}
					button_text="Plant now"
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

export default AddPlantBottomSheet;
