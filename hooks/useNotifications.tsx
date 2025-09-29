import * as Notifications from "expo-notifications";
import React, { createContext, ReactNode, useContext, useEffect } from "react";

interface NotificationsContextType {
	scheduleNotificationAsync: (
		request: Notifications.NotificationRequestInput
	) => Promise<string>;
	cancelNotificationAsync: (id: string) => Promise<void>;
}

interface NotificationProviderProps {
	children: ReactNode;
}

const NotificationsContext = createContext<
	NotificationsContextType | undefined
>(undefined);

const NotificationsProvider = ({ children }: NotificationProviderProps) => {
	useEffect(() => {
		const configureNotificationsAsync = async () => {
			const { granted } = await Notifications.requestPermissionsAsync();
			if (!granted) {
				return console.warn("Notification Permission not granted.");
			}

			Notifications.setNotificationHandler({
				handleNotification: async () => ({
					shouldPlaySound: true,
					shouldSetBadge: false,
					shouldShowBanner: true,
					shouldShowList: true,
				}),
			});
		};
		configureNotificationsAsync();
	}, []);

	const scheduleNotificationAsync = async (
		request: Notifications.NotificationRequestInput
	) => {
		return await Notifications.scheduleNotificationAsync(request);
	};

	const cancelNotificationAsync = async (id: string) => {
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
