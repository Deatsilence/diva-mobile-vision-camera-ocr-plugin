import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useFrameProcessor,
} from 'react-native-vision-camera';
import {Worklets} from 'react-native-worklets-core';
import {scanOCR} from './../lib/commonjs/index';
import {OCRFrame} from '../lib/typescript';

function App(): JSX.Element {
  const {hasPermission, requestPermission} = useCameraPermission();
  const device = useCameraDevice('back');

  const onValueDetected = Worklets.createRunInJsFn((OCRFrame: OCRFrame) => {
    console.log(OCRFrame);
  });

  const frameProcessor = useFrameProcessor(frame => {
    'worklet';
    const data = scanOCR(frame);
    if (data) {
      onValueDetected(data);
    }
  }, []);

  React.useEffect(() => {
    requestPermission();
  }, []);

  if (device == null) return <Text>Device not available</Text>;

  return (
    <SafeAreaView style={styles.container}>
      <Camera
        style={[StyleSheet.absoluteFill]}
        frameProcessor={frameProcessor}
        device={device}
        isActive={true}
        pixelFormat="yuv"
        orientation={'portrait'}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
