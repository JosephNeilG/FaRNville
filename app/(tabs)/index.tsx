import HeaderContainer from "@/components/HeaderContainer";
import Screen from "@/components/Screen";
import React from "react";
import { Text } from "react-native";

const Farm = () => {
	return (
		<Screen>
			<HeaderContainer />
			<Text className="text-2xl font-medium">Farm Status</Text>
		</Screen>
	);
};

export default Farm;
