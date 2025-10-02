import { SeedItemType } from "@/entities/seed.types";

export const SEED_ITEMS: SeedItemType[] = [
	{
		id: 1,
		name: "Carrot",
		price: 3,
		harvest_duration: 5,
		profit: 5.0,
		image: require("@/assets/images/products/carrot.png"),
	},
	{
		id: 2,
		name: "Potato",
		price: 5,
		harvest_duration: 480,
		profit: 9.0,
		image: require("@/assets/images/products/potato.png"),
	},
	{
		id: 3,
		name: "Cabbage",
		price: 7,
		harvest_duration: 540,
		profit: 12,
		image: require("@/assets/images/products/cabbage.png"),
	},
];
