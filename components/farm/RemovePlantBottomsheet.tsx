import {
	BottomSheetBackdrop,
	BottomSheetModal,
	BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, { forwardRef, RefObject, useCallback, useMemo } from "react";
import { View } from "react-native";

import { COLORS } from "@/constants/Colors";
import { SeedItemType } from "@/entities/seed.types";
import { bottom_sheet_styles } from "@/stylesheets/components/bottomsheet.stylesheet";
import CustomButton from "../CustomButton";
import IconBox from "../IconBox";
import ListContainer from "../ListContainer";
import SectionTitle from "../SectionTitle";
import Subtitle from "../Subtitle";

interface RemovePlantBottomSheetProps {
	plant: SeedItemType | null;
	onRemovePress: () => void;
}

const RemovePlantBottomSheet = forwardRef<
	BottomSheetModal,
	RemovePlantBottomSheetProps
>(({ plant, onRemovePress }, ref) => {
	const snap_points = useMemo(() => ["40%"], []);

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

	return (
		<BottomSheetModal
			backdropComponent={renderBackdrop}
			ref={ref}
			snapPoints={snap_points}
			backgroundStyle={{ backgroundColor: COLORS.light[100] }}>
			<ListContainer>
				<BottomSheetView style={bottom_sheet_styles.container}>
					<View className="items-center">
						<IconBox
							icon_name="triangle-exclamation"
							icon_color={COLORS.danger}
							bg_color={COLORS.accent.red}
						/>

						<SectionTitle title_text="Remove Plant?" />

						<Subtitle
							subtitle_text={`Are you sure you want to remove ${plant?.name}?`}
						/>
					</View>

					<CustomButton
						onPress={onRemovePress}
						button_text="Yes, remove"
						bg_color={COLORS.danger}
					/>

					<CustomButton
						onPress={handleDismiss}
						button_text="Cancel"
						bordered
						font_color={COLORS.white}
					/>
				</BottomSheetView>
			</ListContainer>
		</BottomSheetModal>
	);
});

export default RemovePlantBottomSheet;
