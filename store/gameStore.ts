import { PlantItemType } from "@/entities/plant.types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface GameState {
	earnings: number;
	expenses: number;
	profit: number;

	seeds: PlantItemType[];
	farmed_plants: PlantItemType[];
}

interface GameActions {
	buySeed: (plant: PlantItemType, quantity: number) => void;
	plantSeed: (seed: PlantItemType) => void;
	removeFarmPlant: (farm_plant_id: number) => void;

	reset: () => void;
}

type GameStore = GameState & GameActions;

const initial_state: GameState = {
	earnings: 10,
	expenses: 0,
	profit: 0,

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

				const new_earnings = get().earnings - total_cost;
				const new_expenses = get().expenses + total_cost;

				if (existing_index >= 0) {
					const updated_seeds = [...current_seeds];
					updated_seeds[existing_index] = {
						...updated_seeds[existing_index],
						pcs_remaining:
							updated_seeds[existing_index].pcs_remaining +
							quantity,
					};
					set({
						seeds: updated_seeds,
						earnings: new_earnings,
						expenses: new_expenses,
					});
				} else {
					set({
						seeds: [
							...current_seeds,
							{ ...plant, pcs_remaining: quantity },
						],
						expenses: new_expenses,
						earnings: new_earnings,
					});
				}
			},

			plantSeed: (seed: PlantItemType) => {
				const current_seeds = get().seeds;

				const seed_index = current_seeds.findIndex(
					(s) => s.id === seed.id
				);
				if (seed_index < 0) return;

				const updated_seeds = [...current_seeds];
				updated_seeds[seed_index] = {
					...updated_seeds[seed_index],
					pcs_remaining: updated_seeds[seed_index].pcs_remaining - 1,
				};

				const filtered_seeds = updated_seeds.filter(
					(seed) => seed.pcs_remaining > 0
				);

				const new_farmed_plant: PlantItemType = {
					...seed,
					pcs_remaining: 1,
					farm_plant_id: Date.now(),
				};
				const updated_farmed_plants = [
					...get().farmed_plants,
					new_farmed_plant,
				];

				set({
					seeds: filtered_seeds,
					farmed_plants: updated_farmed_plants,
				});
			},

			removeFarmPlant: (farm_plant_id) => {
				set((state) => ({
					farmed_plants: state.farmed_plants.filter(
						(plant) => plant.farm_plant_id !== farm_plant_id
					),
				}));
			},

			reset: () => {
				set(initial_state);
			},
		}),
		{
			name: "game-storage",
			storage: createJSONStorage(() => AsyncStorage),
			partialize: (state) => ({
				earnings: state.earnings,
				expenses: state.expenses,
				profit: state.profit,
				seeds: state.seeds,
				farmed_plants: state.farmed_plants,
			}),
		}
	)
);
