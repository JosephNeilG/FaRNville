import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface GameState {
	earnings: number;
	expenses: number;
	profit: number;
}

interface GameActions {
	setEarnings: (value: number) => void;
	setExpenses: (value: number) => void;

	reset: () => void;
}

type GameStore = GameState & GameActions;

const initial_state: GameState = {
	earnings: 10,
	expenses: 0,
	profit: 0,
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
			}),
		}
	)
);
