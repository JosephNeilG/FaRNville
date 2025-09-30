import { SeedItemType } from "@/entities/seed.types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface GameState {
	balance: number;
	expenses: number;
	revenue: number;

	seeds: SeedItemType[];
	farmed_plants: SeedItemType[];
}

interface GameActions {
	buySeed: (plant: SeedItemType, quantity: number) => void;
	plantSeed: (
		seed: SeedItemType,
		notification_id: string,
		farm_plant_id: number
	) => void;
	removeFarmPlant: (farm_plant_id: number) => void;
	harvestFarmPlant: (farm_plant_id: number) => void;

	reset: () => void;
}

type GameStore = GameState & GameActions;

const initial_state: GameState = {
	balance: 10,
	expenses: 0,
	revenue: 0,

	seeds: [],
	farmed_plants: [],
};
export const useGameStore = create<GameStore>()(
	persist(
		(set, get) => ({
			...initial_state,

			buySeed: (plant, quantity) => {
				const current_seeds = get().seeds;
				const existing_index = current_seeds.findIndex(
					(seed) => seed.id === plant.id
				);

				const total_cost = plant.price * quantity;

				const new_balance = get().balance - total_cost;
				const new_expenses = get().expenses + total_cost;

				if (existing_index >= 0) {
					const updated_seeds = [...current_seeds];
					updated_seeds[existing_index] = {
						...updated_seeds[existing_index],
						pcs_remaining:
							updated_seeds[existing_index].pcs_remaining! +
							quantity,
					};
					set({
						seeds: updated_seeds,
						balance: new_balance,
						expenses: new_expenses,
					});
				} else {
					set({
						seeds: [
							...current_seeds,
							{ ...plant, pcs_remaining: quantity },
						],
						expenses: new_expenses,
						balance: new_balance,
					});
				}
			},

			plantSeed: (
				seed: SeedItemType,
				notification_id: string,
				farm_plant_id: number
			) => {
				const current_seeds = get().seeds;

				const seed_index = current_seeds.findIndex(
					(s) => s.id === seed.id
				);
				if (seed_index < 0) return;

				const updated_seeds = [...current_seeds];
				updated_seeds[seed_index] = {
					...updated_seeds[seed_index],
					pcs_remaining: updated_seeds[seed_index].pcs_remaining! - 1,
				};

				const filtered_seeds = updated_seeds.filter(
					(seed) => seed.pcs_remaining! > 0
				);

				const new_farmed_plant: SeedItemType = {
					...seed,
					farm_plant_id: farm_plant_id,
					planted_at_time: Date.now(),
					harvest_duration: seed.harvest_duration,
					notification_id: notification_id,
				};

				set({
					seeds: filtered_seeds,
					farmed_plants: [...get().farmed_plants, new_farmed_plant],
				});
			},

			removeFarmPlant: (farm_plant_id: number) => {
				set((state) => ({
					farmed_plants: state.farmed_plants.filter(
						(plant) => plant.farm_plant_id !== farm_plant_id
					),
				}));
			},

			harvestFarmPlant: (farm_plant_id: number) => {
				const farmed_plants = get().farmed_plants;
				const plant_to_harvest = farmed_plants.find(
					(plant) => plant.farm_plant_id === farm_plant_id
				);

				if (!plant_to_harvest) return;

				const new_balance = get().balance + plant_to_harvest.profit;
				const new_revenue = get().revenue + plant_to_harvest.profit;

				const updated_farmed_plants = farmed_plants.filter(
					(plant) => plant.farm_plant_id !== farm_plant_id
				);

				set({
					balance: new_balance,
					revenue: new_revenue,
					farmed_plants: updated_farmed_plants,
				});
			},

			reset: () => {
				set(initial_state);
			},
		}),
		{
			name: "game-storage",
			storage: createJSONStorage(() => AsyncStorage),
			partialize: (state) => ({
				balance: state.balance,
				expenses: state.expenses,
				revenue: state.revenue,
				seeds: state.seeds,
				farmed_plants: state.farmed_plants,
			}),
		}
	)
);
