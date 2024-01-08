# HealthMoni

HealthMoni is an Arduino-based project that monitors health data such as heart rate, blood pressure, and step count. This README file provides an overview of the project, installation instructions, and usage guidelines.

## Table of Contents

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Introduction

The HealthMoni project uses an Arduino board to collect health data from sensors and display it on an OLED screen. It can monitor heart rate, blood pressure, and step count.

The main components used in this project are:
- Arduino board
- WiFi module
- OLED display
- Heart rate sensor
- Blood pressure sensor
- Step counter

The `final.ino` file contains the Arduino code that runs on the board to collect and process the health data.

Additionally, the `acclemetor.py` file in the `HealthMoni/Microbit` directory contains code for a Microbit-based step counter.

## Prerequisites

Before running the HealthMoni project, make sure you have the following:

- Arduino IDE installed on your computer
- Arduino board (compatible with the code)
- WiFi module (compatible with the code)
- OLED display (compatible with the code)
- Heart rate sensor
- Blood pressure sensor
- Step counter (Arduino or Microbit)

## Installation

To install and run the HealthMoni project, follow these steps:

1. Download and install the Arduino IDE from the official Arduino website: [https://www.arduino.cc/en/software](https://www.arduino.cc/en/software)

2. Connect the Arduino board to your computer using a USB cable.

3. Open the Arduino IDE and navigate to **File > Open**.

4. Browse to the location of the `final.ino` file in the `HealthMoni/Arduino` directory and open it.

5. In the Arduino IDE, go to **Tools > Board** and select the appropriate board that you are using.

6. Go to **Tools > Port** and select the port to which your Arduino board is connected.

7. Click the **Upload** button (right arrow icon) to compile and upload the code to the Arduino board.

8. Once the upload is complete, the HealthMoni project should be running on your Arduino board.

To use the Microbit-based step counter, follow these steps:

1. Connect the Microbit to your computer using a USB cable.

2. Copy the contents of the `acclemetor.py` file from the `HealthMoni/Microbit` directory.

3. Open the [Microbit Python Editor](https://python.microbit.org/v/2.0).

4. Paste the code into the editor.

5. Click the **Download** button to download the code onto the Microbit.

6. Disconnect the Microbit from the computer.

7. The Microbit will now count steps based on accelerometer data.

## Usage

To use the HealthMoni project, follow these instructions:

1. Ensure that the Arduino board is powered on and connected to the required sensors.

2. The OLED display will show the following information:
   - Heart rate (bpm)
   - Systolic blood pressure (mmHg)
   - Diastolic blood pressure (mmHg)

3. The step count will be updated and displayed on the OLED screen periodically. The step count will also be sent to a ThingSpeak channel for data logging.

4. You can customize the code to adjust thresholds or modify the behavior of the project according to your needs.

To use the Microbit-based step counter:

1. Ensure that the Microbit is powered on.

2. The Microbit will count steps based on accelerometer data.

## Contributing

Contributions to the HealthMoni project are welcome. If you encounter any issues or have suggestions for improvements, please submit them as GitHub issues.

If you would like to contribute code to the project, you can fork the repository, make your changes, and submit a pull request.

## License

The HealthMoni project is licensed under the [MIT License](LICENSE). You are free to modify and distribute the code as long as you include the original license file.
