<h1>CSCC09 Project</h1>

**Title:** \
ProfCourseRater (PCRater)

**Members:** \
Mohammad Sajjad, Raz Ben Haim, Tirth Patel

**Description:** \
PCRater is a web application that provides a central platform for students to come and join forums for their courses. Users can join classes as students, TAs or even professors based on their assigned role in the class. As a result, the students will be able to figure out the answers to their questions and doubts, which will improve their success rate. Every course in every university will have its own specific forum where users can participate and interact with one another. The forum will also support an option for polls, notes, and public and private posts. In addition, users can have follow-up discussions on every post on the app. That way, they can clarify anything that makes them uncertain about a question or a response from a course's instructor.

Users must create an account to create post on a course's forum. They will need to enter the necessary details, including their name, school, email, etc. Users must sign up or sign in to interact with our web app. 

All users who have an account can create posts, leave comments, upvote other posts and commments. However, users can only delete their comments and posts and no one else's. Also, users are able to edit and modify their posts and comments. Users can specify certain tags (for example: final exam, midterm, hw1, hw2, logistics).

Professors will now be able to host virtual office hours and meetings with students by using the video call functinality of the class's forum.
The virtual room will support audio (including mute and unmute) and video communication between multiple participants, drawing board, and a chat as well. 

**Beta Key Features (due on March 20th):**
<ul>
 <li>Users can sign in and sign up to our app.</li>
 <li>Users can log out from our app</li>
 <li>Users can create new posts.</li>
 <li>Users can create polls</li>
 <li>Users create new classes</li>
 <li>Users can join new classes</li>
 <li>Search engine for universities and courses</li>
</ul>


**Final Key Features (due on April 3rd):**
<ul>
 <li>Users can browse posts and commments for each of their courses</li>
 <li>Users can post a follow-up comment or upvote every post and comment that is visible to them.</li>
 <li>Users can associate tags with their posts.</li>
 <li>Language Selection (English, French, Spanish, etc)</li> 
 <li>Using a Mailgun API, we will send users a "welcome email" when they sign up and support the "forgot password" option. Also, we will send users emails when another user has commented on their post.</li>
 <li>For each class's formum, there will be a virtual room where users can interact with one another via audio and video.</li>
 <li>Chat support for the virtual room.</li>
 <li>Drawing board support for the virtual room.</li>
</ul>



**Technology Stack:** \
Our main stack we will be using is the MERN stack (which stands for MongoDB, Express.js, React, Node.js) as well as GraphQL. 
For the frontend, we will be using React, which is a JavaScript library which is built on top of HTML, CSS and JavaScript. To improve the responsive design of our app, we will also use Bootstrap, which is an extensive and customizable library that will allow us to build better designs faster. It will also help us to adapt our design to mobile devices.

For the backend, we will be using Graphql, which is a framework that will help us to handle the routing, requests, cookies, sessions, security, etc. 
GraphQL will make the data query and manipulation easier for us. MongoDB is the NoSQL database our app will use to store data. 

Moreover, we will use the mailgun.js to send emails to users. To support the video communication, we will use Web RTC frameworks such as Peerjs, which will peer-to-peer connection API on the browser in real time. Also, we will use TogetherJS for collaboration on the drawing borad in the virtual rooms.


**Technical Challenges:**
<ul>
 <li>Allowing students to comment on the posts. Designing the discussion forum layout might be challenging for us as well as designing the database schema to support that.</li>
 <li>Learning and working with new programming languages, applications and frameworks such as REACT, GraphQL, MongoDB with no previous exposure.</li>
 <li>Obtaining large amounts of data about courses and professors for the various colleges and universities around Ontario.</li>
 <li>The Deployment process of the application on a VM.</li>
 <li>Establishing application security and implementing the authentication through school emails for the app.</li>
</ul>


**Appendix:**
<ul>
 <li>https://reactjs.org/</li>
 <li>https://getbootstrap.com/</li>
 <li>https://www.mongodb.com/</li>
 <li>https://github.com/googlemaps/google-maps-services-js</li>
 <li>https://graphql.org/</li>
 <li>https://www.passportjs.org/</li>
 <li>https://togetherjs.com/</li>
 <li>https://peerjs.com/</li>
</ul>


