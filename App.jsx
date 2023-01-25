import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import { GestureHandlerRootView } from "react-native-gesture-handler";

import pickImageAsync from './lib/pickImage';
import ImageViewer from './components/ImageViewer';
import Button from './components/Button';
import IconButton from './components/IconButton';
import CircleButton from './components/CircleButton';
import EmojiPicker from './components/EmojiPicker';
import EmojiList from './components/EmojiList';
import EmojiSticker from './components/EmojiSticker';

const PlaceholderImage = require('./assets/images/background-image.png');

export default function App() {
	const [pickedEmoji, setPickedEmoji] = useState(null);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [selectedImage, setSelectedImage] = useState(null);
	const [showAppOptions, setShowAppOptions] = useState(false);

	const onReset = () => {
		setShowAppOptions(false);
	};

	const onAddSticker = () => {
		setIsModalVisible(true);
	};

	const onModalClose = () => {
		setIsModalVisible(false);
	};

	const onSaveImageAsync = async () => {
		// we will implement this later
	};

	const onPickImageAsync = async () => {
		const result = await pickImageAsync();

		if (!result.canceled) {
			setSelectedImage(result.assets[0].uri);
			setShowAppOptions(true);
		} else {
			alert('You did not select any image.');
		}
	};

	const displayedImage = selectedImage
		? { uri: selectedImage }
		: PlaceholderImage;

	return (
		<GestureHandlerRootView style={styles.container}>
			<View style={styles.imageContainer}>
				<ImageViewer imageSource={displayedImage} />
				{pickedEmoji && (
					<EmojiSticker imageSize={40} stickerSource={pickedEmoji} />
				)}
			</View>
			{!showAppOptions ? (
				<View style={styles.footerContainer}>
					<Button
						theme="primary"
						label="Choose a photo"
						onPress={onPickImageAsync}
					/>
					<Button
						label="Use this photo"
						onPress={() => setShowAppOptions(true)}
					/>
				</View>
			) : (
				<View style={styles.optionsContainer}>
					<View style={styles.optionsRow}>
						<IconButton
							icon="refresh"
							label="Reset"
							onPress={onReset}
						/>
						<CircleButton onPress={onAddSticker} />
						<IconButton
							icon="save-alt"
							label="Save"
							onPress={onSaveImageAsync}
						/>
					</View>
				</View>
			)}
			<StatusBar style="auto" />
			<EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
				<EmojiList
					onSelect={setPickedEmoji}
					onCloseModal={onModalClose}
				/>
			</EmojiPicker>
		</GestureHandlerRootView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#25292e',
		alignItems: 'center',
		justifyContent: 'center',
	},
	imageContainer: {
		flex: 1,
		paddingTop: 58,
	},
	image: {
		width: 320,
		height: 440,
		borderRadius: 18,
	},
	footerContainer: {
		flex: 1 / 3,
		alignItems: 'center',
	},
	optionsContainer: {
		position: 'absolute',
		bottom: 60,
	},
	optionsRow: {
		alignItems: 'center',
		flexDirection: 'row',
	},
});
