# __PCRater__


## Project URL

**Task:** Provide the link to your deployed application. Please make sure the link works. 

https://pcrater.me/ 

## Project Video URL 

**Task:** Provide the link to your youtube video. Please make sure the link works. 

https://www.youtube.com/watch?v=LBmZgJET6dw

## Project Description

**Task:** Provide a detailed description of your app

PCRater is a web application that provides a central platform for students to come and join forums for their courses. 
Users can join classes as students, TAs or even professors based on their assigned role in the class. 
As a result, the students will be able to figure out the answers to their questions and doubts, 
which will improve their success rate. Every course in every university will have its own specific forum where 
users can participate and interact with one another. The forum will also support an option for questions and polls. 
In addition, users can have follow-up discussions (comments) on every post on the app. That way, they can clarify anything 
that makes them uncertain about a question or a response from a course's instructor or any of their classmates.

Users must create an account to create a post on a course's forum. 
They will need to enter the necessary details, including their name, school, email, etc. 
Users must sign up or sign in to interact with our web app.

All users who have an account can create posts, leave comments, upvote other posts and commments. 
Also, users are able to edit and modify their posts. Professors will now be able to host virtual office hours and 
meetings with students by using the video call functinality of the class's forum. The virtual room will support 
audio (including mute and unmute), video communication between multiple participants, screen sharing, drawing 
board, and a chat as well.

Beta Key Features:

Users can sign in and sign up to our app.
Users can log out from our app
Users can create new posts.
Users can create polls
Users create new classes
Users can join new classes
Search engine for universities and courses
Users can see the list of all posts

Final Key Features:

Users can browse posts and commments for each of their courses
Users can post a follow-up comment or upvote every post and comment that is visible to them.
Posting a poll.
Voting on an existing poll.
For each class's formum, there will be a virtual room where users can interact with one another via audio and video.
Screen sharing support for the virtual room.
Chat support for the virtual room.
Drawing board support for the virtual room.

## Development

**Task:** Leaving deployment aside, explain how the app is built. Please describe the overall code design and be specific about the programming languages, framework, libraries and third-party api that you have used. 

Our code is split into two main folders: pcrater-frontend and server.
The pcrater-frontend folder contains the frontend logic of our app, which includes the React framework, styling with CSS, and Bootstrap. Our frontend logic also incorporates the Apollo Client library that is connected to the Apolloserver for running GraphQL queries. For the WebRTC, we used the socket.io-client and simple-peer libraries to connect to the HTTP server and implement the peer-to-peer communication logic on web sockets.

Our server folder contains the main server file, app.js, which initiates the ApolloServer, the HTTP server for sockets, and uses mongoose to connect our Apollo Server to our MongoDB database. Also, in app.js we handle all the incoming socket.io requests and send back new requests to the corresponding connected peers.

The models folder is used to define the schemas of our models for mongoose.
The resolvers folder contains the typedefs for the GraphQL data types, queries, and mutations, as well as the resolvers that define the asynchronous functions. 
We also have a util folder for data validation, which is being called inside the various resolvers. 




## Deployment

**Task:** Explain how you have deployed your application.

We dockerized our frontend and backend into two separate docker containers. 
Then, we spun them up on our Digital Ocean droplet. 
We used Ngnix Reverse Proxy to handle all our traffic.

P.S. We used NameCheap to get our domain name: pcrater.me, and then set the records in Digital Ocean.

## Maintenance

**Task:** Explain how you monitor your deployed app to make sure that everything is working as expected.

We monitor our application from time to time by testing the features and confirming that they work.
We use the command htop to monitor the physical deployment server's health (i.e. CPU usage, memory) when the server is getting too slow. Also, we are using Sentry to monitor real-time crashes and fixes.


## Challenges

**Task:** What is the top 3 most challenging things that you have learned/developed for you app? Please restrict your answer to only three items. 


1. Learning and working with new programming languages, applications and frameworks such as REACT, GraphQL, 
MongoDB with no previous exposure.
2. The Deployment process of the application on a VM through Digital Ocean utilizing Docker containers and Nginx.
3. Learning and implementing WebRTC technology, such as collaborative Video Call and Drawing Board, using simple-peer and socket.io. In addition, deploying the WebRTC portion onto our server and setting up the corresponding configuration was challenging as well. 

## Contributions

**Task:** Describe the contribution of each team member to the project. Please provide the full name of each team member (but no student number). 

Raz Ben Haim:
 - WebRTC video calls, chat, drawing board 
 - The page for creating and joining classes

Tirth Patel 
- Login/Signup 
- Deployment 
- Basic architecture of GraphQL backend

Mohammad Sajjad

- Creating, showing and editing Posts (Backend and Frontend)
- Comments (Backend and Frontend)
- Polls (Backend and Frontend)
- Aiding with Video Call (Backend and Frontend)
- Multiple bug fixes and refactorization in various components

# One more thing? 

**Task:** Any additional comment you want to share with the course staff? 

Thank you for everything.
