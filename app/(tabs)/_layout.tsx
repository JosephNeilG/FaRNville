import { COLORS } from "@/constants/Colors";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

const TabLayout = () => {
	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				tabBarActiveTintColor: COLORS.primary,
				tabBarInactiveTintColor: COLORS.dark_100,
				sceneStyle: styles.scene,
				tabBarStyle: styles.tab_bar,
				tabBarLabelStyle: styles.tab_label,
			}}>
			<Tabs.Screen
				name="shop"
				options={{
					title: "Shop",
					tabBarIcon: ({ color }) => (
						<FontAwesome6 name="store" size={21} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="index"
				options={{
					title: "Farm",
					tabBarIcon: ({ color }) => (
						<FontAwesome6 name="tractor" size={21} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="seeds"
				options={{
					title: "Seeds",
					tabBarIcon: ({ color }) => (
						<FontAwesome6 name="leaf" size={21} color={color} />
					),
				}}
			/>
		</Tabs>
	);
};

const styles = StyleSheet.create({
	scene: {
		backgroundColor: COLORS.light_100,
	},
	tab_label: {
		fontSize: 14,
		marginTop: 4,
	},
	tab_bar: {
		position: "absolute",
		borderColor: "transparent",
		elevation: 0,
		shadowOffset: { width: 0, height: 0 },
		borderRadius: 25,
		paddingTop: 5,
		height: 80,
		paddingHorizontal: 20,
	},
});

export default TabLayout;
