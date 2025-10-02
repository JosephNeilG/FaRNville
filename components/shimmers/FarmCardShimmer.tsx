import { COLORS } from "@/constants/Colors";
import React from "react";
import ContentLoader, { Rect } from "react-content-loader/native";

const FarmCardShimmer = () => (
	<ContentLoader
		speed={1.4}
		width="100%"
		height={130}
		viewBox="0 0 400 130"
		preserveAspectRatio="none"
		backgroundColor={COLORS.light[300]}
		foregroundColor={COLORS.light[100]}>
		<Rect y="15" rx="10" ry="10" width="70" height="70" />

		<Rect x="90" y="20" rx="4" ry="4" width="100" height="16" />

		<Rect x="90" y="50" rx="4" ry="4" width="140" height="14" />

		<Rect x={400 - 90} y="20" rx="16" ry="16" width="90" height="26" />

		<Rect x={400 - 55} y="60" rx="4" ry="4" width="55" height="16" />

		<Rect y="105" rx="7" ry="7" width={400} height="14" />
	</ContentLoader>
);

export default FarmCardShimmer;
