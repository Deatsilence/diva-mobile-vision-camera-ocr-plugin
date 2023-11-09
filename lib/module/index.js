import { VisionCameraProxy } from 'react-native-vision-camera';
const plugin = VisionCameraProxy.initFrameProcessorPlugin('scanOCR');

/**
 * Scans OCR.
 */
export function scanOCR(frame) {
  'worklet';

  if (plugin == null) {
    throw new Error('Failed to load Frame Processor Plugin!');
  }

  return plugin.call(frame);
}
//# sourceMappingURL=index.js.map