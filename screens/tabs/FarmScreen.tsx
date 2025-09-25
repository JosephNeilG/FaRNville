import { BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { useCallback, useRef, useState } from "react";
import { FlatList, ListRenderItem } from "react-native";

import CustomButton from "@/components/CustomButton";
import CustomModal from "@/components/CustomModal";
import AddPlantBottomSheet from "@/components/farm/AddPlantBottomsheet";
import FarmCard from "@/components/farm/FarmCard";
import RemovePlantBottomSheet from "@/components/farm/RemovePlantBottomsheet";
import HeaderContainer from "@/components/HeaderContainer";
import IconBox from "@/components/IconBox";
import Screen from "@/components/Screen";
import SectionTitle from "@/components/SectionTitle";
import AddPlantCard from "@/components/shop/AddPlantCard";
import Subtitle from "@/components/Subtitle";
import { PLANT_ITEMS } from "@/constants/PlantItems";
import { PlantItemType } from "@/entities/plant.types";

const FarmScreen = () => {
	const [open_complete_modal, setOpenCompleteModal] = useState(false);

	const remove_bottom_sheet_ref = useRef<BottomSheetModal>(null);
	const add_bottom_sheet_ref = useRef<BottomSheetModal>(null);

	const handlePresentRemoveModalPress = useCallback(() => {
		remove_bottom_sheet_ref.current?.present();
	}, []);

	const handlePresentAddModalPress = useCallback(() => {
		add_bottom_sheet_ref.current?.present();
	}, []);

	const handleRemovePress = () => {
		console.log("remove pressed");
		remove_bottom_sheet_ref.current?.dismiss();
	};

	const handleHarvestPress = () => {
		console.log("harvest pressed");
		setOpenCompleteModal(true);
	};

	const handleAcceptHarvestPress = () => {
		console.log("accept pressed");
		setOpenCompleteModal(false);
	};

	const handleBackdropPress = () => {
		setOpenCompleteModal(false);
	};

	const handleAddPlantPress = () => {
		console.log("add plant pressed");
		add_bottom_sheet_ref.current?.dismiss();
	};

	const renderFarmCards: ListRenderItem<PlantItemType> = ({ item }) => (
		<FarmCard
			item={item}
			onRemovePress={handlePresentRemoveModalPress}
			onHarvestPress={handleHarvestPress}
		/>
	);

	const renderFooterComponent = () => (
		<AddPlantCard onPress={handlePresentAddModalPress} />
	);

	return (
		<Screen>
			<HeaderContainer />

			<SectionTitle title_text="Farm Status" />

			<FlatList
				data={PLANT_ITEMS}
				keyExtractor={(item) => item.id.toString()}
				renderItem={renderFarmCards}
				ListFooterComponent={renderFooterComponent}
				contentContainerStyle={{ flex: 1 }}
			/>

			<RemovePlantBottomSheet
				onRemovePress={handleRemovePress}
				ref={remove_bottom_sheet_ref}
			/>

			<AddPlantBottomSheet
				onAddPlantPress={handleAddPlantPress}
				ref={add_bottom_sheet_ref}
			/>

			<CustomModal
				onClose={handleBackdropPress}
				is_open={open_complete_modal}>
				<IconBox icon_name="check" />

				<SectionTitle title_text="Harvest Complete!" />
				<Subtitle subtitle_text="You earned $5.00 by harvesting Carrot." />

				<CustomButton
					onPress={handleAcceptHarvestPress}
					button_text="Accept"
				/>
			</CustomModal>
		</Screen>
	);
};

export default FarmScreen;
