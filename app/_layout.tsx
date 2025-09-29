import { NotificationsProvider } from "@/hooks/useNotifications";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Stack } from "expo-router";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import "./global.css";

export default function RootLayout() {
	return (
		<GestureHandlerRootView>
			<BottomSheetModalProvider>
				<NotificationsProvider>
					<Stack>
						<Stack.Screen
							name="(tabs)"
							options={{ headerShown: false }}
						/>
					</Stack>
				</NotificationsProvider>
			</BottomSheetModalProvider>
		</GestureHandlerRootView>
	);
}
