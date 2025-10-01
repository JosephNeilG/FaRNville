import { BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { FlatList, ListRenderItem, View } from "react-native";

import CustomButton from "@/components/CustomButton";
import CustomModal from "@/components/CustomModal";
import AddPlantBottomSheet from "@/components/farm/AddPlantBottomsheet";
import FarmCard from "@/components/farm/FarmCard";
import RemovePlantBottomSheet from "@/components/farm/RemovePlantBottomsheet";
import HeaderContainer from "@/components/HeaderContainer";
import IconBox from "@/components/IconBox";
import Screen from "@/components/Screen";
import SectionTitle from "@/components/SectionTitle";
import FarmCardShimmer from "@/components/shimmers/FarmCardShimmer";
import AddPlantCard from "@/components/shop/AddPlantCard";
import Subtitle from "@/components/Subtitle";
import { SHIMMERS } from "@/constants/Shimmers";
import { SeedItemType } from "@/entities/seed.types";
import { useNotifications } from "@/hooks/useNotifications";
import { useGameStore } from "@/store/gameStore";

const FarmScreen = () => {
	const { cancelNotificationAsync } = useNotifications();
	const remove_bottom_sheet_ref = useRef<BottomSheetModal>(null);
	const add_bottom_sheet_ref = useRef<BottomSheetModal>(null);
	const [open_complete_modal, setOpenCompleteModal] = useState(false);
	const [loading, setLoading] = useState(true);

	const farmed_plants = useGameStore((state) => state.farmed_plants);
	const [selected_plant_to_remove, setSelectedPlantToRemove] =
		useState<SeedItemType | null>(null);
	const [harvested_plant, setHarvestedPlant] = useState<SeedItemType | null>(
		null
	);

	const handlePresentRemoveModalPress = useCallback((plant: SeedItemType) => {
		setSelectedPlantToRemove(plant);
		remove_bottom_sheet_ref.current?.present();
	}, []);

	const handlePresentAddModalPress = useCallback(() => {
		add_bottom_sheet_ref.current?.present();
	}, []);

	const handleRemovePress = () => {
		if (selected_plant_to_remove) {
			cancelNotificationAsync(selected_plant_to_remove.notification_id!);

			useGameStore
				.getState()
				.removeFarmPlant(selected_plant_to_remove.farm_plant_id!);

			remove_bottom_sheet_ref.current?.dismiss();
			setSelectedPlantToRemove(null);

			console.log(selected_plant_to_remove.name, "Removed");
		}
	};

	const handleHarvestPress = (plant: SeedItemType) => {
		useGameStore.getState().harvestFarmPlant(plant.farm_plant_id!);
		setHarvestedPlant(plant);
		setOpenCompleteModal(true);
	};

	const handleAcceptHarvestPress = () => {
		setOpenCompleteModal(false);
		setHarvestedPlant(null);
	};

	const handleBackdropPress = () => {
		setOpenCompleteModal(false);
	};

	const renderFarmCards: ListRenderItem<SeedItemType> = ({ item }) => (
		<FarmCard
			onRemovePress={() => handlePresentRemoveModalPress(item)}
			onHarvestPress={() => handleHarvestPress(item)}
			item={item}
		/>
	);

	const renderFooterComponent = () => (
		<AddPlantCard onPress={handlePresentAddModalPress} />
	);

	useEffect(() => {
		const timer = setTimeout(() => setLoading(false), 1500);
		return () => clearTimeout(timer);
	}, []);

	return (
		<Screen header={<HeaderContainer />}>
			<SectionTitle title_text="Farm Status" />

			{loading ? (
				<View>
					{SHIMMERS.map((index) => (
						<FarmCardShimmer key={index} />
					))}
				</View>
			) : (
				<FlatList
					data={farmed_plants}
					keyExtractor={(item) => item.farm_plant_id!.toString()}
					renderItem={renderFarmCards}
					ListFooterComponent={renderFooterComponent}
					contentContainerStyle={{ paddingBottom: 60 }}
				/>
			)}

			<RemovePlantBottomSheet
				onRemovePress={handleRemovePress}
				plant={selected_plant_to_remove}
				ref={remove_bottom_sheet_ref}
			/>

			<AddPlantBottomSheet ref={add_bottom_sheet_ref} />

			<CustomModal
				onClose={handleBackdropPress}
				is_open={open_complete_modal}>
				<IconBox icon_name="check" />

				<SectionTitle title_text="Harvest Complete!" />
				<Subtitle
					subtitle_text={
						harvested_plant
							? `You earned $${harvested_plant.profit.toFixed(
									2
								)} by harvesting ${harvested_plant.name}.`
							: ""
					}
				/>

				<CustomButton
					onPress={handleAcceptHarvestPress}
					button_text="Accept"
				/>
			</CustomModal>
		</Screen>
	);
};

export default FarmScreen;
