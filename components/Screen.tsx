import React, { ReactNode } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

interface ScreenProps {
	children: ReactNode;
}

const Screen = ({ children }: ScreenProps) => {
	return (
		<SafeAreaView className="flex-1 pt-[150px] px-5">
			{children}
		</SafeAreaView>
	);
};

export default Screen;
