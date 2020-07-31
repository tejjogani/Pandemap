# Long Description - Pandemap

Due to the ongoing pandemic, every aspect of life has been severely impacted - there’s an immediate need for innovative solutions to help the community adjust to the situation. . Current solutions such as masks and social distancing cannot be actively monitored, especially in large, crowded areas such as universities. As 5 international students from the University of California, Berkeley, we believe that there is no existing solution which will help us stay safe in college as we resume living on campus. This compelled us to build PandeMap. .PandeMap is a location recommendation application built for college students and administrations. 

PandeMapsuggests destinations based on social distancing and crowd data in order to limit the number of people in a certain vicinity. For example, if a student wants to visit *library A*, they can simply search for it on our application. Our server will then process this search result, obtain crowd information, and based on how crowded or empty the library is, suggest the user an appropriate location to go to. I.e. if *library A* is crowded, the user will be suggested to go to another library, however, if l*ibrary A* is empty, the user will be suggested to go to *library A.*

The intelligent technology backing this system can be broken down into three main aspects: a **robust machine learning framework** built using custom models and IBM Watson, **a scalable backend architecture** made using Django, powered by an SQL database deployed on IBM Cloud, and finally a dynamic, intuitive and **user-friendly front-end user interface** made using React Native.

## Machine Learning

We use a custom convolutional neural network  developed in Keras and deployed using IBM Watson Studio. The model parses an image and counts the number of people in the image. The model is trained to analyse CCTV footage from various angles and give an accurate count of the number of people in that image while considering crowding with respect to spatial density. Based on our testing, we have achieved an accuracy of about 97.31%.

## Backend

We used Django as our backend because of its reliability and scalability. Using its features, we were able to design REST APIs and even a full fledged admin panel which could be useful in the future. We hosted this whole solution on IBM Cloud and had our Django Web App connect to Elephant SQL (A 3rd party SQL Database on IBM’s system) due to the minimum requirements we had.

## Frontend

We designed a great User experience and interface using React-Native, the best solution to make cross platform mobile applications for users. React Native has many components which allow us to develop quick and useful solutions for our customers.

## How does this work together?

When a user searches for a location, our server obtains crowd information for that destination through our machine learning model if it has a CCTV streaming reference IP.  Otherwise, the server will use location data from users to generate a percentage describing how full that place is (to maintain privacy, we never provide actual counts or user data, just a percentage). Next, our application will look through less crowded, similar locations to suggest to the user in order to maintain social distancing norms using our recommendation algorithm tailored to this purpose. The code would showcase this best.

**We truly believe that with a large user base, we could help millions of students, faculty and staff safely make the most out of college with this ongoing pandemic.**