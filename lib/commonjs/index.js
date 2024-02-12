"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mrzParse = mrzParse;
exports.scanOCR = scanOCR;
var _reactNativeVisionCamera = require("react-native-vision-camera");
var _mrzParser = require("./util/mrzParser");
/**
 * Scans OCR.
 */
const plugin = _reactNativeVisionCamera.VisionCameraProxy.initFrameProcessorPlugin('scanOCR');
function scanOCR(frame) {
  'worklet';

  if (plugin == null) {
    throw new Error('Failed to load Frame Processor Plugin "scanOCR"! Please check your dependencies and make sure that the plugin is linked correctly.');
  }
  return plugin.call(frame);
}
function mrzParse(initialLines) {
  return (0, _mrzParser.parseMRZ)(initialLines);
}
//# sourceMappingURL=index.js.map