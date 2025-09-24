import FarmCard from "@/components/farm/FarmCard";
import RemovePlantBottomSheet from "@/components/farm/RemovePlantBottomsheet";
import HeaderContainer from "@/components/HeaderContainer";
import Screen from "@/components/Screen";
import SectionTitle from "@/components/SectionTitle";
import AddPlantCard from "@/components/shop/AddPlantCard";
import { PLANT_ITEMS } from "@/constants/PlantItems";
import { PlantItemType } from "@/entities/plant.types";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { useCallback, useRef } from "react";
import { FlatList, ListRenderItem } from "react-native";

const FarmScreen = () => {
	const remove_bottom_sheet_ref = useRef<BottomSheetModal>(null);

	const handlePresentBuyModalPress = useCallback(() => {
		remove_bottom_sheet_ref.current?.present();
	}, []);

	const handleRemovePress = () => {
		console.log("remove pressed");
		remove_bottom_sheet_ref.current?.dismiss();
	};

	const renderFarmCards: ListRenderItem<PlantItemType> = ({ item }) => (
		<FarmCard item={item} onRemovePress={handlePresentBuyModalPress} />
	);
	return (
		<Screen>
			<HeaderContainer />

			<SectionTitle title_text="Farm Status" />

			<FlatList
				data={PLANT_ITEMS}
				keyExtractor={(item) => item.id.toString()}
				renderItem={renderFarmCards}
				contentContainerStyle={{ flex: 1 }}
				ListFooterComponent={AddPlantCard}
			/>

			<RemovePlantBottomSheet
				onRemovePress={handleRemovePress}
				ref={remove_bottom_sheet_ref}
			/>
		</Screen>
	);
};

export default FarmScreen;
