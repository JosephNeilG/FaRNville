import { ImageSourcePropType } from "react-native";

export type PlantItemType = {
	id: number;
	name: string;
	price: number;
	harvest_time: number;
	profit: number;
	image: ImageSourcePropType;
};
