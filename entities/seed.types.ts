import { ImageSourcePropType } from "react-native";

export type SeedItemType = {
	id: number;
	name: string;
	price: number;
	harvest_duration: number;
	profit: number;
	image: ImageSourcePropType;
	pcs_remaining?: number;
	progress?: number;
	farm_plant_id?: number;
	planted_at_time?: number;
};
