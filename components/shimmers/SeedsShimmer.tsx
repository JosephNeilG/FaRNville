import { COLORS } from "@/constants/Colors";
import React from "react";
import ContentLoader, { Rect } from "react-content-loader/native";
import { useWindowDimensions } from "react-native";

const SeedsShimmer = () => {
	const { width } = useWindowDimensions();

	const container_width = Math.min(width * 0.9, 600);
	return (
		<ContentLoader
			speed={1.4}
			width={container_width}
			height={115}
			viewBox={`0 0 ${container_width} 115`}
			backgroundColor={COLORS.light[300]}
			foregroundColor={COLORS.light[100]}>
			<Rect y="12" rx="12" ry="12" width="90" height="90" />

			<Rect x="105" y="20" rx="4" ry="4" width="100" height="16" />

			<Rect x="105" y="45" rx="4" ry="4" width="70" height="14" />

			<Rect x="105" y="80" rx="4" ry="4" width="110" height="12" />

			<Rect
				x={container_width - 50}
				y="30"
				rx="4"
				ry="4"
				width="50"
				height="12"
			/>

			<Rect
				x={container_width - 70}
				y="55"
				rx="4"
				ry="4"
				width="70"
				height="16"
			/>
		</ContentLoader>
	);
};

export default SeedsShimmer;
