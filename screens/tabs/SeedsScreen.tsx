import HeaderContainer from "@/components/HeaderContainer";
import Screen from "@/components/Screen";
import SectionTitle from "@/components/SectionTitle";
import SeedsCard from "@/components/seeds/SeedsCard";
import { PLANT_ITEMS } from "@/constants/PlantItems";
import { PlantItemType } from "@/entities/plant.types";
import React from "react";
import { FlatList, ListRenderItem } from "react-native";

const SeedsScreen = () => {
	const renderSeedsCard: ListRenderItem<PlantItemType> = ({ item }) => (
		<SeedsCard item={item} />
	);

	return (
		<Screen>
			<HeaderContainer />

			<SectionTitle title_text="Available Seeds" />

			<FlatList
				data={PLANT_ITEMS}
				keyExtractor={(item) => item.id.toString()}
				renderItem={renderSeedsCard}
				contentContainerStyle={{ flex: 1 }}
			/>
		</Screen>
	);
};

export default SeedsScreen;
