import HeaderContainer from "@/components/HeaderContainer";
import Screen from "@/components/Screen";
import SectionTitle from "@/components/SectionTitle";
import BuyPlantBottomSheet from "@/components/shop/BuyPlantBottomSheet";
import ShopCard from "@/components/shop/ShopCard";
import { PLANT_ITEMS } from "@/constants/PlantItems";
import { PlantItemType } from "@/entities/plant.types";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { useCallback, useRef } from "react";
import { FlatList, ListRenderItem } from "react-native";

const ShopScreen = () => {
	const bottom_sheet_ref = useRef<BottomSheetModal>(null);

	const handlePresentBuyModalPress = useCallback(() => {
		bottom_sheet_ref.current?.present();
	}, []);

	const handleBuyPress = () => {
		console.log("buy pressed");
		bottom_sheet_ref.current?.dismiss();
	};

	const renderShopCards: ListRenderItem<PlantItemType> = ({ item }) => (
		<ShopCard item={item} onPress={handlePresentBuyModalPress} />
	);

	return (
		<Screen>
			<HeaderContainer />

			<SectionTitle title_text="Shop Plants" />

			<FlatList
				data={PLANT_ITEMS}
				keyExtractor={(item) => item.id.toString()}
				renderItem={renderShopCards}
				contentContainerStyle={{ flex: 1 }}
			/>

			<BuyPlantBottomSheet
				plant_name="Carrot"
				ref={bottom_sheet_ref}
				onBuyPress={handleBuyPress}
			/>
		</Screen>
	);
};

export default ShopScreen;
