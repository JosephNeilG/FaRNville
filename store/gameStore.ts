import { PlantItemType } from "@/entities/plant.types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface GameState {
	earnings: number;
	expenses: number;
	profit: number;

	seeds: PlantItemType[];
}

interface GameActions {
	setEarnings: (value: number) => void;
	setExpenses: (value: number) => void;

	buySeed: (plant: PlantItemType, quantity: number) => void;

	reset: () => void;
}

type GameStore = GameState & GameActions;

const initial_state: GameState = {
	earnings: 10,
	expenses: 0,
	profit: 0,

	seeds: [],
};
export const useGameStore = create<GameStore>()(
	persist(
		(set, get) => ({
			...initial_state,

			setEarnings: (value: number) => {
				const expenses = get().expenses;
				set({
					earnings: value,
					profit: value - expenses,
				});
			},

			setExpenses: (value: number) => {
				const earnings = get().earnings;
				set({
					expenses: value,
					profit: earnings - value,
				});
			},

			buySeed: (plant, quantity) => {
				const current_seeds = get().seeds;
				const existing_index = current_seeds.findIndex(
					(seed) => seed.id === plant.id
				);

				if (existing_index >= 0) {
					const updated_seeds = [...current_seeds];
					updated_seeds[existing_index] = {
						...updated_seeds[existing_index],
						pcs_remaining:
							updated_seeds[existing_index].pcs_remaining +
							quantity,
					};
					set({ seeds: updated_seeds });
				} else {
					set({
						seeds: [
							...current_seeds,
							{ ...plant, pcs_remaining: quantity },
						],
					});
				}
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
			}),
		}
	)
);
