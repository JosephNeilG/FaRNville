import HeaderContainer from "@/components/HeaderContainer";
import Screen from "@/components/Screen";
import SectionTitle from "@/components/SectionTitle";
import ShopCard from "@/components/shop/ShopCard";
import { PLANT_ITEMS } from "@/constants/PlantItems";
import { PlantItemType } from "@/entities/plant.types";
import React from "react";
import { FlatList, ListRenderItem } from "react-native";

const ShopScreen = () => {
	const renderShopCards: ListRenderItem<PlantItemType> = ({ item }) => (
		<ShopCard item={item} />
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
		</Screen>
	);
};

export default ShopScreen;
