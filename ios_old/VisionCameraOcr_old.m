#if __has_include(<VisionCamera/FrameProcessorPlugin.h>)
#import <VisionCamera/FrameProcessorPlugin.h>
#import <VisionCamera/FrameProcessorPluginRegistry.h>

#import "VisionCameraOcr-Bridging-Header.h"

// // Example for a Swift Frame Processor plugin automatic registration
VISION_EXPORT_SWIFT_FRAME_PROCESSOR(VisionCamera, OCRFrameProcessorPlugin)

#endif
