import { BottomSheetModal } from "@gorhom/bottom-sheet";
import pluralize from "pluralize";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { FlatList, ListRenderItem, View } from "react-native";

import CustomButton from "@/components/CustomButton";
import CustomModal from "@/components/CustomModal";
import HeaderContainer from "@/components/HeaderContainer";
import IconBox from "@/components/IconBox";
import Screen from "@/components/Screen";
import SectionTitle from "@/components/SectionTitle";
import SeedsShimmer from "@/components/shimmers/SeedsShimmer";
import BuyPlantBottomSheet from "@/components/shop/BuyPlantBottomSheet";
import ShopCard from "@/components/shop/ShopCard";
import Subtitle from "@/components/Subtitle";
import { COLORS } from "@/constants/Colors";
import { SEED_ITEMS } from "@/constants/SeedItems";
import { SHIMMERS } from "@/constants/Shimmers";
import { SeedItemType } from "@/entities/seed.types";
import { useGameStore } from "@/store/gameStore";

const ShopScreen = () => {
	const bottom_sheet_ref = useRef<BottomSheetModal>(null);
	const [open_confirm_modal, setOpenConfirmModal] = useState(false);
	const [open_success_modal, setOpenSuccessModal] = useState(false);
	const [loading, setLoading] = useState(true);

	const [selected_plant, setSelectedPlant] = useState<SeedItemType | null>(
		null
	);
	const [selected_quantity, setSelectedQuantity] = useState(1);

	const buySeed = useGameStore((state) => state.buySeed);

	const handlePresentBuyModalPress = useCallback((plant: SeedItemType) => {
		setSelectedPlant(plant);
		setSelectedQuantity(1);
		bottom_sheet_ref.current?.present();
	}, []);

	const handleBuyPress = () => {
		console.log("buy pressed");

		setOpenConfirmModal(true);
		bottom_sheet_ref.current?.dismiss();
	};

	const handleAcceptBtnPress = () => {
		if (selected_plant) {
			buySeed(selected_plant, selected_quantity);
		}

		setOpenConfirmModal(false);
		setOpenSuccessModal(true);
	};

	const handleConfirmModalDismiss = () => setOpenConfirmModal(false);
	const handleSuccessModalDismiss = () => setOpenSuccessModal(false);
	const handleGotItBtnPress = () => setOpenSuccessModal(false);

	const renderShopCards: ListRenderItem<SeedItemType> = ({ item }) => (
		<ShopCard
			onPress={() => handlePresentBuyModalPress(item)}
			item={item}
		/>
	);

	useEffect(() => {
		const timer = setTimeout(() => setLoading(false), 1500);
		return () => clearTimeout(timer);
	}, []);

	const pluralize_plant_name = pluralize(
		selected_plant?.name ?? "",
		selected_quantity
	);
	const total_cost = (selected_plant?.price! * selected_quantity).toFixed(2);

	return (
		<Screen header={<HeaderContainer />}>
			<SectionTitle title_text="Shop Seeds" />

			{loading ? (
				<View>
					{SHIMMERS.map((index) => (
						<SeedsShimmer key={index} />
					))}
				</View>
			) : (
				<FlatList
					data={SEED_ITEMS}
					keyExtractor={(item) => item.id.toString()}
					renderItem={renderShopCards}
					contentContainerStyle={{ flex: 1 }}
				/>
			)}

			<BuyPlantBottomSheet
				onBuyPress={handleBuyPress}
				onQuantityChange={setSelectedQuantity}
				plant={selected_plant}
				quantity={selected_quantity}
				ref={bottom_sheet_ref}
			/>

			<CustomModal
				onClose={handleConfirmModalDismiss}
				is_open={open_confirm_modal}>
				<IconBox icon_name="credit-card" />

				<SectionTitle title_text="Confirm Purchase?" />
				<Subtitle
					subtitle_text={`Buy ${selected_quantity} ${pluralize_plant_name} for $${total_cost}?`}
				/>

				<CustomButton
					onPress={handleAcceptBtnPress}
					button_text="Accept"
				/>
				<CustomButton
					onPress={handleConfirmModalDismiss}
					button_text="Cancel"
					bordered
					font_color={COLORS.white}
				/>
			</CustomModal>

			<CustomModal
				onClose={handleSuccessModalDismiss}
				is_open={open_success_modal}>
				<IconBox icon_name="check" />

				<SectionTitle title_text="Purchase Successful!" />
				<Subtitle
					subtitle_text={`You bought ${selected_quantity} ${pluralize_plant_name}. ${
						selected_quantity > 1 ? "They're" : "It's"
					} now in your Seeds.`}
				/>

				<CustomButton
					onPress={handleGotItBtnPress}
					button_text="Got it"
				/>
			</CustomModal>
		</Screen>
	);
};

export default ShopScreen;
