# WatcherHW_webapp
WatcherHW is an open source web application that monitor hardware performance at run time.
The app gets hardware information using python and display it every 5 seconds.

# How the apps work
It gets hardware information using python. 
Python scripts are run using Java Runtime library.
Then information is displayed through Java Spring Boot as a backend.
The frontend is in React Typescript

# Version
The current version is only available for Windows.
This is not a CRUD web application. In order to monitor your computer hardware you need to download and run it.

# Requirements
Make sure you have python install and java install.

# How to install
1. Download python_scripts folder
2. Download watcherhw-0.0.1-SNAPSHOT.jar
3. Keep the python_scripts folder and .jar file in the same folder

# How to run
Open your command prompt for windows.
cd into the directory that have the .jar file and python_scripts
Run
java -jar watcherhw-0.0.1-SNAPSHOT.jar

# Incoming feature
Prediction using machine learning python sklearn library.
Other OS compability.