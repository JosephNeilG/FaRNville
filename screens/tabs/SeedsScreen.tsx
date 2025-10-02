import React, { useEffect, useState } from "react";
import { FlatList, ListRenderItem } from "react-native";

import HeaderContainer from "@/components/HeaderContainer";
import ListContainer from "@/components/ListContainer";
import Screen from "@/components/Screen";
import SectionTitle from "@/components/SectionTitle";
import EmptySeedsList from "@/components/seeds/EmptySeedsList";
import SeedsCard from "@/components/seeds/SeedsCard";
import SeedsShimmer from "@/components/shimmers/SeedsShimmer";
import { SHIMMERS } from "@/constants/Shimmers";
import { SeedItemType } from "@/entities/seed.types";
import { useGameStore } from "@/store/gameStore";
import { useRouter } from "expo-router";

const SeedsScreen = () => {
	const router = useRouter();
	const [loading, setLoading] = useState(true);

	const seeds = useGameStore((state) => state.seeds);
	const seeds_count = seeds.reduce((total, seeds) => {
		return total + seeds.pcs_remaining!;
	}, 0);

	const handleEmptyBtnPress = () => {
		router.replace("/(tabs)/shop");
	};

	const renderShimmer = () =>
		SHIMMERS.map((index) => <SeedsShimmer key={index} />);

	const renderEmptySeedsCard = () => (
		<EmptySeedsList onPress={handleEmptyBtnPress} />
	);

	const renderSeedsCard: ListRenderItem<SeedItemType> = ({ item }) => (
		<SeedsCard item={item} />
	);

	useEffect(() => {
		const timer = setTimeout(() => setLoading(false), 1500);
		return () => clearTimeout(timer);
	}, []);

	return (
		<Screen header={<HeaderContainer />}>
			<ListContainer>
				<SectionTitle title_text={`Available Seeds (${seeds_count})`} />

				{loading ? (
					renderShimmer()
				) : (
					<FlatList
						data={seeds}
						keyExtractor={(item) => item.id.toString()}
						renderItem={renderSeedsCard}
						ListEmptyComponent={renderEmptySeedsCard}
						contentContainerStyle={{ paddingBottom: 60, flex: 1 }}
					/>
				)}
			</ListContainer>
		</Screen>
	);
};

export default SeedsScreen;
