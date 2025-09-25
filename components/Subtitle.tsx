import React from "react";
import { Text } from "react-native";

interface Subtitle {
	subtitle_text: string;
}

const Subtitle = ({ subtitle_text }: Subtitle) => {
	return (
		<Text className="text-dark-300 text-lg font-normal mt-1 mb-3 text-center">
			{subtitle_text}
		</Text>
	);
};

export default Subtitle;
