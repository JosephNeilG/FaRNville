import { useGameStore } from "@/store/gameStore";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useShallow } from "zustand/shallow";

const HeaderContainer = () => {
	const insets = useSafeAreaInsets();
	const resetGameStore = useGameStore((state) => state.reset);

	const { earnings, expenses, profit } = useGameStore(
		useShallow((state) => ({
			earnings: state.earnings,
			expenses: state.expenses,
			profit: state.profit,
		}))
	);

	const handleProfilePress = () => {
		resetGameStore();
	};

	return (
		<View
			className="absolute bg-primary left-0 right-0 px-5 rounded-b-[25px] pb-5"
			style={{ paddingTop: insets.top }}>
			<View className="flex-row justify-between items-center">
				<Text className="text-xl text-white font-light">
					Hello, <Text className="font-medium">Joseph Neil</Text>
				</Text>
				<TouchableOpacity
					className="border border-dark-200 rounded-full"
					onPress={handleProfilePress}>
					<Image
						source={require("@/assets/images/joseph.jpg")}
						className="w-[35px] h-[35px] rounded-full"
					/>
				</TouchableOpacity>
			</View>

			<View className="flex-row justify-between items-end mt-6">
				<View>
					<Text className="text-xl text-white font-light">
						Earnings
					</Text>
					<Text className="text-3xl text-white font-medium mt-1">
						${earnings.toFixed(2)}
					</Text>
				</View>

				<View className="flex-row gap-[35px] border border-dark-200 rounded-xl px-4 py-2 bg-[#19734E] items-center">
					<View>
						<Text className={title_style}>Profit</Text>
						<Text className={subtitle_style}>
							${profit.toFixed(2)}
						</Text>
					</View>

					<View className="border-[0.5px] border-dark-200 h-[35px]"></View>

					<View>
						<Text className={title_style}>Expense</Text>
						<Text className={subtitle_style}>
							${expenses.toFixed(2)}
						</Text>
					</View>
				</View>
			</View>
		</View>
	);
};

const title_style = "text-base text-light-200 font-light";
const subtitle_style = "text-lg text-white font-medium";

export default HeaderContainer;
