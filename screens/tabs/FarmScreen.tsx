import FarmCard from "@/components/farm/FarmCard";
import HeaderContainer from "@/components/HeaderContainer";
import Screen from "@/components/Screen";
import SectionTitle from "@/components/SectionTitle";
import AddPlantCard from "@/components/shop/AddPlantCard";
import { PLANT_ITEMS } from "@/constants/PlantItems";
import { PlantItemType } from "@/entities/plant.types";
import React from "react";
import { FlatList, ListRenderItem } from "react-native";

const FarmScreen = () => {
	const renderFarmCards: ListRenderItem<PlantItemType> = ({ item }) => (
		<FarmCard item={item} />
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
		</Screen>
	);
};

export default FarmScreen;
