import React, { ReactNode } from "react";
import {
	GestureResponderEvent,
	Modal,
	Platform,
	Pressable,
	View,
	useWindowDimensions,
} from "react-native";

interface CustomModalProps {
	is_open: boolean;
	onClose: () => void;
	children: ReactNode;
}

const CustomModal = ({ is_open, onClose, children }: CustomModalProps) => {
	const { width } = useWindowDimensions();

	const modal_width =
		Platform.OS === "web" ? Math.min(width * 0.9, 600) : "90%";

	const handleBackdropPress = (event: GestureResponderEvent) => {
		if (event.target === event.currentTarget) onClose();
	};

	return (
		<Modal visible={is_open} transparent statusBarTranslucent>
			<Pressable
				onPress={handleBackdropPress}
				className="flex-1 justify-center items-center bg-[rgba(0,0,0,0.5)]">
				<View
					className="bg-light-100 p-5 rounded-xl items-center"
					style={{ width: modal_width }}>
					{children}
				</View>
			</Pressable>
		</Modal>
	);
};

export default CustomModal;
