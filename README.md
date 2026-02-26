# 🥔 Potato Care: Mobile Application for Deep Learning-Based Potato Health Classification (DEPRECATED)
This project presents a mobile application designed to control and monitor an automated potato segregation prototype that uses deep learning–based health classification. The system integrates image capture, intelligent processing, and automated sorting to improve the efficiency and accuracy of potato quality assessment.

## 📦 Technologies:
- React Native
- Expo Router

## 📲 Features:
- Control the prototype (Capture & Classify) all from your mobile phone
- View Analytics
- View Results 

## 🔃 Process:
1. The mobile phone must be linked with the prototype by connecting the Prototype Microcomputer and Mobile Phone to the same network.
2. Place Potato on the Classification Module, make sure that the Potato is within the frame of the Camera to ensure all sides will be captured.
3. Click the Classify Button on the Home Page to start the classification and segregation, the whole process may take no more than 30 seconds.

The application foresees the capture of images of potatoes by the Raspberry Pi and analyzes them using a trained neural network model (VGG-16) deployed on the automated segregation system prototype to identify their health condition, classifying each sample as Healthy, Bacterial-Infected, or Fungal-Infected. Based on the classification results, the automated mechanism performs real-time segregation of potatoes into their respective categories.

By combining mobile control, artificial intelligence, and automated hardware operation, the system provides a user-controlled solution for reliable quality sorting. This approach minimizes manual inspection, enhances consistency in classification, and supports more efficient agricultural processing and handling.
