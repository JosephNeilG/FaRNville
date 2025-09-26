import React from "react";
import { FlatList, ListRenderItem } from "react-native";

import HeaderContainer from "@/components/HeaderContainer";
import Screen from "@/components/Screen";
import SectionTitle from "@/components/SectionTitle";
import EmptySeedsList from "@/components/seeds/EmptySeedsList";
import SeedsCard from "@/components/seeds/SeedsCard";
import { SeedItemType } from "@/entities/seed.types";
import { useGameStore } from "@/store/gameStore";
import { useRouter } from "expo-router";

const SeedsScreen = () => {
	const router = useRouter();
	const seeds = useGameStore((state) => state.seeds);

	const handleEmptyBtnPress = () => {
		router.replace("/(tabs)/shop");
	};

	const renderEmptySeedsCard = () => (
		<EmptySeedsList onPress={handleEmptyBtnPress} />
	);

	const renderSeedsCard: ListRenderItem<SeedItemType> = ({ item }) => (
		<SeedsCard item={item} />
	);

	return (
		<Screen>
			<HeaderContainer />

			<SectionTitle title_text="Available Seeds" />

			<FlatList
				data={seeds}
				keyExtractor={(item) => item.id.toString()}
				renderItem={renderSeedsCard}
				ListEmptyComponent={renderEmptySeedsCard}
				contentContainerStyle={{ paddingBottom: 60, flex: 1 }}
			/>
		</Screen>
	);
};

export default SeedsScreen;
