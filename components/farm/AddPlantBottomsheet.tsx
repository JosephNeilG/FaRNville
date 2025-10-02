import {
	BottomSheetBackdrop,
	BottomSheetModal,
	BottomSheetView,
} from "@gorhom/bottom-sheet";
import * as Notifications from "expo-notifications";
import { useRouter } from "expo-router";
import React, {
	forwardRef,
	RefObject,
	useCallback,
	useMemo,
	useState,
} from "react";
import { FlatList, ListRenderItem, Text, View } from "react-native";

import { COLORS } from "@/constants/Colors";
import { SeedItemType } from "@/entities/seed.types";
import { useNotifications } from "@/hooks/useNotifications";
import { useGameStore } from "@/store/gameStore";
import { bottom_sheet_styles } from "@/stylesheets/components/bottomsheet.stylesheet";
import CustomButton from "../CustomButton";
import IconBox from "../IconBox";
import QuantityStepper from "../QuantityStepper";
import SectionTitle from "../SectionTitle";
import EmptySeedsList from "../seeds/EmptySeedsList";
import SeedsCard from "../seeds/SeedsCard";

interface RemovePlantBottomSheetProps {
	onAddPlantPress?: () => void;
}

const AddPlantBottomSheet = forwardRef<
	BottomSheetModal,
	RemovePlantBottomSheetProps
>(({ onAddPlantPress }, ref) => {
	const router = useRouter();
	const { scheduleNotificationAsync } = useNotifications();
	const snap_points = useMemo(() => ["80%"], []);
	const seeds = useGameStore((state) => state.seeds);
	const [selected_seed_card, setSelectedSeedCard] =
		useState<SeedItemType | null>(null);
	const [selected_quantity, setSelectedQuantity] = useState(1);

	const is_plant_now_btn_disabled =
		!selected_seed_card || selected_quantity === 0;
	const is_decrement_disabled = selected_quantity <= 1;
	const is_increment_disabled = selected_seed_card
		? selected_quantity >= selected_seed_card?.pcs_remaining!
		: false;

	const renderBackdrop = useCallback(
		(props: any) => (
			<BottomSheetBackdrop
				{...props}
				disappearsOnIndex={-1}
				appearsOnIndex={0}
			/>
		),
		[]
	);

	const handleDismiss = useCallback(() => {
		(ref as RefObject<BottomSheetModal>)?.current?.dismiss();
	}, []);

	const handleEmptyBtnPress = () => {
		router.replace("/(tabs)/shop");
		handleDismiss();
	};

	const handleSeedCardPress = (seed: SeedItemType) => {
		if (selected_seed_card?.id === seed.id) {
			setSelectedSeedCard(null);
			setSelectedQuantity(1);
		} else {
			setSelectedSeedCard(seed);
			setSelectedQuantity(1);
		}
	};

	const handleQuantityChange = (value: number) => {
		const max = selected_seed_card?.pcs_remaining ?? 0;
		setSelectedQuantity(Math.min(value, max));
	};

	const handleAddPlantPress = async () => {
		if (selected_seed_card) {
			for (let i = 0; i < selected_quantity; i++) {
				const farm_plant_id = Date.now() + 1;

				const notification_id = await scheduleNotificationAsync({
					content: {
						title: "Harvest Ready!",
						body: `Your ${selected_seed_card.name} is ready to harvest.`,
						sound: true,
						categoryIdentifier: "harvest",
						data: { farm_plant_id: farm_plant_id },
					},
					trigger: {
						type: Notifications.SchedulableTriggerInputTypes
							.TIME_INTERVAL,
						seconds: selected_seed_card.harvest_duration,
					},
				});

				useGameStore
					.getState()
					.plantSeed(
						selected_seed_card,
						notification_id!,
						farm_plant_id
					);

				setSelectedSeedCard(null);
				setSelectedQuantity(1);
				handleDismiss();
			}
		}
	};

	const renderEmptySeedsCard = () => (
		<EmptySeedsList onPress={handleEmptyBtnPress} />
	);

	const renderSeedsCard: ListRenderItem<SeedItemType> = ({ item }) => (
		<SeedsCard
			item={item}
			onPress={() => handleSeedCardPress(item)}
			is_selected={selected_seed_card?.id === item.id}
		/>
	);

	return (
		<BottomSheetModal
			backdropComponent={renderBackdrop}
			ref={ref}
			snapPoints={snap_points}
			backgroundStyle={{ backgroundColor: COLORS.light[100] }}>
			<BottomSheetView style={bottom_sheet_styles.container}>
				<View className="items-center">
					<IconBox icon_name="leaf" />

					<SectionTitle title_text="Plant your seeds" />
				</View>

				<FlatList
					data={seeds}
					keyExtractor={(item) => item.id.toString()}
					renderItem={renderSeedsCard}
					ListEmptyComponent={renderEmptySeedsCard}
					contentContainerStyle={{ paddingVertical: 10 }}
				/>

				{selected_seed_card && (
					<View className="flex-row my-2 items-center justify-between">
						<Text className="text-lg">Quantity</Text>
						<QuantityStepper
							onQuantityChange={handleQuantityChange}
							quantity={selected_quantity}
							is_decrement_disabled={is_decrement_disabled}
							is_increment_disabled={is_increment_disabled}
						/>
					</View>
				)}

				{seeds.length > 0 && (
					<CustomButton
						onPress={handleAddPlantPress}
						button_text="Plant now"
						disabled={is_plant_now_btn_disabled}
						bg_color={
							is_plant_now_btn_disabled
								? COLORS.dark[100]
								: COLORS.primary
						}
					/>
				)}

				<CustomButton
					onPress={handleDismiss}
					button_text="Cancel"
					bordered
					font_color={COLORS.white}
				/>
			</BottomSheetView>
		</BottomSheetModal>
	);
});

export default AddPlantBottomSheet;
