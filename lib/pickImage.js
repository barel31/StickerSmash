import * as ImagePicker from 'expo-image-picker';

export default async function pickImageAsync() {
	const result = await ImagePicker.launchImageLibraryAsync({
		allowsEditing: true,
		quality: 1,
	});

	return result;
};
