import HeaderContainer from "@/components/HeaderContainer";
import Screen from "@/components/Screen";
import React from "react";
import { Text } from "react-native";

const Seeds = () => {
	return (
		<Screen>
			<HeaderContainer />
			<Text className="text-2xl font-medium">Available Seeds (4)</Text>
		</Screen>
	);
};

export default Seeds;
