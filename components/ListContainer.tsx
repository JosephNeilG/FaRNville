import React, { ReactNode } from "react";
import { Platform, View } from "react-native";

interface ListContainerProps {
	children: ReactNode;
}
const ListContainer = ({ children }: ListContainerProps) => {
	return (
		<View
			style={{ width: Platform.OS === "web" ? 400 : "100%" }}
			className={`flex-1 self-center`}>
			{children}
		</View>
	);
};

export default ListContainer;
