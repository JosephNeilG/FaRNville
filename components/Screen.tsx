import React, { ReactNode } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface ScreenProps {
	children: ReactNode;
	header?: ReactNode;
}

const Screen = ({ children, header }: ScreenProps) => {
	return (
		<SafeAreaView className="flex-1" edges={["left", "right", "bottom"]}>
			{header}

			<View className="flex-1 px-5">{children}</View>
		</SafeAreaView>
	);
};

export default Screen;
