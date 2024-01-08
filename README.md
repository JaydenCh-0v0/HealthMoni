# HealthMoni
HealthMoni is a full-stuck Telehealth questionnaire web-based system, combined with user data analysis and visualization. Development with JavaScript, CSS and HTML 5 for the front end, PHP and Jquery for connecting and MySQL for relational database
Also, it is an Arduino-based project that monitors health data such as heart rate, blood pressure, and step count. 
This README file provides an overview of the project, installation instructions, and usage guidelines.

## Table of Contents

- [Introduction](#introduction)
- [User Interface and User Experience Design (UI/UX design)](#user-interface-and-user-experience-design-uiux-design)
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

## User Interface and User Experience Design (UI/UX Design)

The HealthMoni project includes a web-based system with the following pages:

### Home Page
![image](https://github.com/JaydenCh-0v0/HealthMoni/assets/57389495/face70cf-5fb9-4778-af73-c55e90463f25)
This page is designed to show all user measurement data, such as blood pressure, heart rate, and steps. The step count chart helps users convert their step count to kcal consumption. Users can navigate to other pages using the sidebar menu.

### DataView Page
![image](https://github.com/JaydenCh-0v0/HealthMoni/assets/57389495/09703384-0d10-49fa-9b89-50771c10d4b0)
This page is designed to show all user measurement data, such as blood pressure, heart rate, and steps. The responsive table helps users identify whether their data is in a normal state or a dangerous state based on the status column. Users can navigate to other pages using the sidebar menu.

### Booking Page
![image](https://github.com/JaydenCh-0v0/HealthMoni/assets/57389495/fe0eec99-e45b-43df-adb8-8ef83d8a9d75)
This page allows users to make doctor consultations related to blood pressure or heart rate issues. The responsive form collects the user's name, email, and phone number. In the appointment request section, users can select a time slot for their booking. Submitting the form sends the user's information to the database for doctor reservations. If the timeslotis valid, the system will book the timeslot and send a confirmation email to the user's email address. Users can also navigate to other pages using the sidebar menu.

### Doctor Page
![image](https://github.com/JaydenCh-0v0/HealthMoni/assets/57389495/d09f5134-c1b1-4f34-be23-7dfed642e82a)
This page displays information about all doctors. Users can use the search bar to find a specific doctor or view the doctor's information in the doctor list. The page also provides zoom links for each doctor, allowing users to join their reserved doctor's zoom room. Users can navigate to other pages using the sidebar menu.

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
