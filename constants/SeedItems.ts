import { SeedItemType } from "@/entities/seed.types";

export const SEED_ITEMS: SeedItemType[] = [
	{
		id: 1,
		name: "Carrot",
		price: 3,
		harvest_time: 5,
		profit: 5.0,
		image: require("@/assets/images/products/carrot.png"),
		pcs_remaining: 0,
		harvest_countdown: 260,
		progress: 0.1,
	},
	{
		id: 2,
		name: "Potato",
		price: 5,
		harvest_time: 8,
		profit: 9.0,
		image: require("@/assets/images/products/potato.png"),
		pcs_remaining: 0,
		harvest_countdown: 83,
		progress: 0.8,
	},
	{
		id: 3,
		name: "Cabbage",
		price: 7,
		harvest_time: 9,
		profit: 12,
		image: require("@/assets/images/products/cabbage.png"),
		pcs_remaining: 0,
		harvest_countdown: 0,
		progress: 1,
	},
];
