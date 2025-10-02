import React from "react";
import {
	DimensionValue,
	Platform,
	View,
	useWindowDimensions,
} from "react-native";

const ListContainer = ({ children }: { children: React.ReactNode }) => {
	const { width } = useWindowDimensions();

	let container_width: DimensionValue = "100%";

	if (Platform.OS === "web") {
		if (width > 0) {
			container_width = Math.min(width * 0.9, 600);
		} else {
			container_width = "100%";
		}
	}

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
