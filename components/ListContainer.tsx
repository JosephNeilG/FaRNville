import React, { ReactNode } from "react";
import { Platform, View } from "react-native";

interface ListContainerProps {
	children: ReactNode;
}
const ListContainer = ({ children }: ListContainerProps) => {
	return (
		<View
			className={`flex-1 self-center ${Platform.OS === "web" ? "w-[400px]" : "w-full"}`}>
			{children}
		</View>
	);
};

export default ListContainer;
