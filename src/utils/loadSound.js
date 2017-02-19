import Sound from 'react-native-sound';

export default (filename) => {

  if (!Sound) {
    console.warn('Skipping sound effect because lib react-native-sound not found. Please add it to your project: https://github.com/zmxv/react-native-sound');
    return;
  }

  return new Sound(filename, Sound.MAIN_BUNDLE, error => {
    if (error) console.warn('sound file failed to load', error);
  });

}
