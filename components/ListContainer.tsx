import React from "react";
import { Platform, View, useWindowDimensions } from "react-native";

const ListContainer = ({ children }: { children: React.ReactNode }) => {
	const { width } = useWindowDimensions();

	const container_width =
		Platform.OS === "web" ? Math.min(width * 0.9, 600) : "100%";

	return (
		<View
			style={{
				width: container_width,
				alignSelf: "center",
				flex: 1,
			}}>
			{children}
		</View>
	);
};

export default ListContainer;
