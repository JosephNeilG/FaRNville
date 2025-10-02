import { useGameStore } from "@/store/gameStore";
import * as Notifications from "expo-notifications";
import { useRouter } from "expo-router";
import React, { createContext, ReactNode, useContext, useEffect } from "react";
import { Platform } from "react-native";

interface NotificationsContextType {
	scheduleNotificationAsync: (
		request: Notifications.NotificationRequestInput
	) => Promise<string | undefined>;
	cancelNotificationAsync: (id: string) => Promise<void>;
}

interface NotificationProviderProps {
	children: ReactNode;
}

const NotificationsContext = createContext<
	NotificationsContextType | undefined
>(undefined);

const is_web = Platform.OS === "web";

const NotificationsProvider = ({ children }: NotificationProviderProps) => {
	const router = useRouter();

	useEffect(() => {
		const configureNotificationsAsync = async () => {
			if (is_web) {
				console.log("Notification not supported on web.");
				return;
			}

			const { granted } = await Notifications.requestPermissionsAsync();
			if (!granted) {
				return console.warn("Notification Permission not granted.");
			}

			Notifications.setNotificationCategoryAsync("harvest", [
				{
					buttonTitle: "Harvest Now",
					identifier: "harvest_now",
					options: { opensAppToForeground: false },
				},
				{
					buttonTitle: "Plant Again",
					identifier: "plant_again",
					options: { opensAppToForeground: true },
				},
				{
					buttonTitle: "Later",
					identifier: "later",
					options: { opensAppToForeground: false },
				},
			]);

			Notifications.setNotificationHandler({
				handleNotification: async () => ({
					shouldPlaySound: true,
					shouldSetBadge: false,
					shouldShowBanner: true,
					shouldShowList: true,
				}),
			});
		};

		Notifications.addNotificationResponseReceivedListener((response) => {
			const { actionIdentifier, notification } = response;
			const farm_plant_id =
				notification.request.content.data.farm_plant_id;

			if (actionIdentifier === "harvest_now") {
				useGameStore
					.getState()
					.harvestFarmPlant(farm_plant_id as number);
			} else if (actionIdentifier === "plant_another") {
				router.replace("/");
			} else if (actionIdentifier === "later") {
				console.log("pressed later");
			}
		});

		configureNotificationsAsync();
	}, []);

	const scheduleNotificationAsync = async (
		request: Notifications.NotificationRequestInput
	) => {
		if (is_web) {
			console.log("Schedule notification not supported on web.");
			return;
		}
		return await Notifications.scheduleNotificationAsync(request);
	};

	const cancelNotificationAsync = async (id: string) => {
		if (is_web) {
			console.log("Cancel notificatio not supported on web.");
			return;
		}

		try {
			console.log("Cancelling notification: ", id);
			await Notifications.cancelScheduledNotificationAsync(id);
		} catch (error) {
			console.log("Error cancelling notification:", error);
		}
	};

	const value = { scheduleNotificationAsync, cancelNotificationAsync };

	return (
		<NotificationsContext.Provider value={value}>
			{children}
		</NotificationsContext.Provider>
	);
};

const useNotifications = () => {
	const context = useContext(NotificationsContext);
	if (!context) {
		throw new Error(
			"useNotifications must be called from within a NotificationProvider."
		);
	}
	return context;
};

export { NotificationsProvider, useNotifications };
