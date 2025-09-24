import React from "react";
import { Text } from "react-native";

interface SubtitleProps {
	subtitle_text: string;
}

const SubtitleProps = ({ subtitle_text }: SubtitleProps) => {
	return (
		<Text className="text-dark-300 text-lg font-normal mt-1 mb-3">
			{subtitle_text}
		</Text>
	);
};

export default SubtitleProps;
