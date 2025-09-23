import HeaderContainer from "@/components/HeaderContainer";
import Screen from "@/components/Screen";
import React from "react";
import { Text } from "react-native";

const Shop = () => {
	return (
		<Screen>
			<HeaderContainer />
			<Text className="text-2xl font-medium">Shop Plants</Text>
		</Screen>
	);
};

export default Shop;
