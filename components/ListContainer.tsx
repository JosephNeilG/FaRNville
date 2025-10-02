import React from "react";
import { View } from "react-native";

const ListContainer = ({ children }: { children: React.ReactNode }) => {
	return (
		<View
			style={{
				width: "100%",
				maxWidth: 600,
				alignSelf: "center",
				flex: 1,
			}}>
			{children}
		</View>
	);
};

export default ListContainer;
