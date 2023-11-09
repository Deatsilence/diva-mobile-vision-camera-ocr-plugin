package com.visioncameraocr.ocrframeprocessorplugin

import com.mrousavy.camera.frameprocessor.Frame
import android.annotation.SuppressLint
import android.graphics.Point
import android.graphics.Rect
import android.media.Image
import androidx.camera.core.ImageProxy
import com.facebook.react.bridge.WritableNativeArray
import com.facebook.react.bridge.WritableNativeMap
import com.google.android.gms.tasks.Task
import com.google.android.gms.tasks.Tasks
import com.google.mlkit.vision.common.InputImage
import com.google.mlkit.vision.text.Text
import com.google.mlkit.vision.text.TextRecognition
import com.google.mlkit.vision.text.latin.TextRecognizerOptions
import com.mrousavy.camera.frameprocessor.FrameProcessorPlugin

class OCRFrameProcessorPluginPlugin(options: Map<String, Any>?): FrameProcessorPlugin(options) {
  private fun getBlockArray(blocks: MutableList<Text.TextBlock>): List<Map<String, Any>> {
        val resultList = mutableListOf<Map<String, Any>>()

        for (block in blocks) {
            val result = mutableMapOf<String, Any>()
            result["text"] = block.text
            result["recognizedLanguages"] = getRecognizedLanguages(block.recognizedLanguage)
            result["cornerPoints"] = getCornerPoints(block.cornerPoints)
            result["frame"] = getFrame(block.boundingBox)
            result["lines"] = getLineArray(block.lines)

            resultList.add(result)
        }
        return resultList.toList()
    }

    private fun getLineArray(lines: MutableList<Text.Line>): List<Map<String, Any>> {
        val lineList = mutableListOf<Map<String, Any>>()

        for (line in lines) {
            val lineMap = mutableMapOf<String, Any>()

            lineMap["text"] = line.text
            lineMap["recognizedLanguages"] = getRecognizedLanguages(line.recognizedLanguage)
            lineMap["cornerPoints"] = getCornerPoints(line.cornerPoints)
            lineMap["frame"] = getFrame(line.boundingBox)
            lineMap["elements"] = getElementArray(line.elements)

            lineList.add(lineMap)
        }
        return lineList.toList()
    }

    private fun getElementArray(elements: MutableList<Text.Element>): List<Map<String, Any>> {
        val elementList = mutableListOf<Map<String, Any>>()

        for (element in elements) {
            val elementMapItem = mutableMapOf<String, Any>()

            elementMapItem["text"] = element.text
            elementMapItem["cornerPoints"] = getCornerPoints(element.cornerPoints)
            elementMapItem["frame"] = getFrame(element.boundingBox)

            elementList.add(elementMapItem)
        }
        return elementList.toList()
    }

    private fun getRecognizedLanguages(recognizedLanguage: String): List<String> {
        val recognizedLanguages = mutableListOf<String>()
        recognizedLanguages.add(recognizedLanguage)
        return recognizedLanguages
    }

    private fun getCornerPoints(points: Array<out Point>?): Any {
        val cornerPointsList = mutableListOf<Map<String, Any>>()

        if (points == null) {
            return cornerPointsList.toList()
        }

        for (point in points) {
            val pointMapItem = mutableMapOf<String, Any>()
            pointMapItem["x"] = point.x
            pointMapItem["y"] = point.y
            cornerPointsList.add(pointMapItem)
        }
        return cornerPointsList.toList()
    }

    private fun getFrame(boundingBox: Rect?): Map<String, Any> {
        val frame = mutableMapOf<String, Any>()

        if (boundingBox != null) {
            frame["x"] = boundingBox.exactCenterX().toDouble()
            frame["y"] = boundingBox.exactCenterY().toDouble()
            frame["width"] = boundingBox.width()
            frame["height"] = boundingBox.height()
            frame["boundingCenterX"] = boundingBox.centerX()
            frame["boundingCenterY"] = boundingBox.centerY()
        }
        return frame
    }

    private fun getDegreesFromOrientationName(orientationName: String): Int {
        return when (orientationName) {
            "PORTRAIT" -> 0
            "LANDSCAPE_RIGHT" -> 90
            "PORTRAIT_UPSIDE_DOWN" -> 180
            "LANDSCAPE_LEFT" -> 270
            else -> 0 // Default to 0 degrees for unrecognized names
        }
    }

    override fun callback(frame: Frame, arguments: Map<String, Any>?): Any? {

        val resultList = mutableMapOf<String, Any>()

        val recognizer = TextRecognition.getClient(TextRecognizerOptions.DEFAULT_OPTIONS)

        @SuppressLint("UnsafeOptInUsageError")
        val mediaImage: Image? = frame.getImage()

        if (mediaImage != null) {
            val image = InputImage.fromMediaImage(mediaImage, getDegreesFromOrientationName(frame.getOrientation()))
            val task: Task<Text> = recognizer.process(image)
            try {
                val text: Text = Tasks.await<Text>(task)
                resultList["text"] = text.text
                resultList["blocks"] = getBlockArray(text.textBlocks)
            } catch (e: Exception) {
                return null
            }
        }

        val returnData = mutableMapOf<String, Any>()
        returnData["result"] = resultList

        return returnData
    }
}