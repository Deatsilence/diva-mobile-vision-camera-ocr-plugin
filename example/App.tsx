import React from 'react';
import {LayoutChangeEvent, PixelRatio, SafeAreaView, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useFrameProcessor,
} from 'react-native-vision-camera';
import {Worklets} from 'react-native-worklets-core';
import {OCRFrame, scanOCR} from 'vision-camera-ocr-plugin';
console.log(OCRFrame);
function App(): JSX.Element {
  const [pixelRatio, setPixelRatio] = React.useState<number>(1);
  const [ocr, setOcr] = React.useState<OCRFrame>();
  const {hasPermission, requestPermission} = useCameraPermission();
  const device = useCameraDevice('back');

  const onValueDetected = Worklets.createRunInJsFn((OCRFrame: OCRFrame) => {
    console.log(OCRFrame);
    setOcr(OCRFrame);
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

  const renderOverlay = () => {
    return (
      <>
        {ocr?.result.blocks.map((block, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={{
                position: 'absolute',
                left: block.frame.x * pixelRatio,
                top: block.frame.y * pixelRatio,
                backgroundColor: 'white',
                padding: 8,
                borderRadius: 6,
              }}>
              <Text
                style={{
                  fontSize: 25,
                  justifyContent: 'center',
                  textAlign: 'center',
                }}>
                {block.text}
              </Text>
            </TouchableOpacity>
          );
        })}
      </>
    );
  };

  if (device == null) return <Text>Device not available</Text>;

  return (
    <SafeAreaView style={styles.container}>
      <Camera
        style={[StyleSheet.absoluteFill]}
        frameProcessor={frameProcessor}
        device={device}
        isActive={true}
        pixelFormat="yuv"
        onLayout={(event: LayoutChangeEvent) => {
          setPixelRatio(
            event.nativeEvent.layout.width /
              PixelRatio.getPixelSizeForLayoutSize(
                event.nativeEvent.layout.width,
              ),
          );
        }}
      />
      {renderOverlay()}
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
