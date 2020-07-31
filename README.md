# Pandemap

This is the public repository for IBM's call for code submission named Pandemap. This README goes in-depth into explaining what the application is, what technologies it uses and how to run the application locally.

1. [Short description](#short-description)
1. [Demo video](#demo-video)
1. [The architecture](#the-architecture)
1. [Longer description](#longer-description)
1. [Our Roadmap](#our-roadmap)
1. [Using the Project](#using-the-project)
1. [Built Using](#built-using)

## Short Description

### What is the current problem?

Most univerisities in the USA and around the world are trying to open up during this lethal pandemic. Due to this, a lot of students are going to be subject to interacting with other students and with this large infux of students, it might be difficult to practice social distancing. 

### How can technology come into play?

With advanced machine learning algorithms and every student having access to a smartphone, technology can be accurately used to calculate how many people are in a given area at a certain time frame using location data and CCTV. This can provide students analytics to recommend them good ways to practice social distancing.

### The idea behind Pandemap

Using custom machine learning algorithms powered by IBM's Watson, and location data, Pandemap calculates the percentage of a place (e.g. a cafe, a library, etc) is full and recommends students other locations to go to in order to help them socially distance while still attempting to maintain the normalcy of univeristy life in this pandemic. For example, if they want to eat at a particular restaurnt, it would look at how full that restaurant is, and if it is crowded, the application would suggest the user to go to another closeby restaurant where social distancing would be possible and safe.

## Demo Video

[![Watch our Video]()(https://www.youtube.com)]

## The Architecture

![Pandemap Architecture](https://raw.githubusercontent.com/tejjogani/Pandemap/master/src/architecture.png)

1. The user interacts with out React-Native Front End and looks for a location.
2. The application makes a request to our Django-based backend hosted on IBM Cloud to check how crowded that location is.
3. Our backend looks at data from our SQL Database and our Machine Learning model on Watson Studio to calculate what percentage of a specific location is full
4. If the location is filled over a threshold value, the server sends a response to the front end to redirect the user to another, safer location. 
5. The routing is done through the HERE Maps API and their flex-polyline module.

## Longer Description

[You can look at our longer description here] ()

## Our Roadmap 



## Using the Project

The few prerequisites to get this project running are that you must have React-Native installed. The application we are uploading here is so that you don't necessarily need an account to test out the application. Another **important note** is that since this application relies on both CCTV footage and user's location data and isn't officially deployed **yet**, there isn't much data to actually play with. However, we have footage uploaded that showcases how our app reads from CCTV footage and accurately counts the number of people in a location. We also have a way for you to try out this API.

If you have read those notes, then you are ready to get started on testing out Pandemap. There are two ways you can try this application:

1. Try the front end and see some of the interesting features (Note: since the application isn't deployed you may not see a lot of information)
2. Try entering an IP address of a CCTV stream and seeing how well our crowd counting API works. 

### Front End

We've made it extremeley simple for you to run the actual application without worrying about a lot of external dependencies! After you clone the repository, you want to begin a new terminal in that directory and run the following commands:

```bash
cd pandemapFrontend
npm install
react-native run-ios #for ios
react-native run-android #for android
```

### Test the Counting API

If you have a CCTV link, you can visit this link and enter it into the textbox and click the count button, the webpage should then tell you how many people there are at that instant on that CCTV footage.

Link: 

## Built Using

1. IBM Cloud
2. IBM Object Storage
3. IBM Watson
4. IBM Watson Studio
5. Keras
6. Django
7. Elephant SQL







