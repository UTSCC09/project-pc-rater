<h1>CSCC09 Project</h1>

**Title:** \
ProfCourseRater (PCRater)

**Members:** \
Mohammad Sajjad, Raz Ben Haim, Tirth Patel

**Description:** \
PCRater is a web application that provides a central platform for students to come and check reviews of courses and professors from various Universities and Colleges around Ontario. As a result, the students will plan out their timetables, experience, and future success much better. This app allows students to post reviews on their professors and courses at their respective educational institutions. Every professor and course will have an overall rating score out of 5 made by the students. Then, there will also be a list of written reviews for each professor and course specifying more detailed information with additional features. Users can have follow-up discussions on every review on the app. That way, they can clarify anything that makes them uncertain about the review for the course or professor.

Users must create an account to create reviews on a course or professor. They will need to enter the necessary details, including their name, school, email, etc. Users also must use their school emails to verify that they are associated with a trustworthy educational institute. We want our web application to rely on relevant data from students who attend the appropriate schools. Users that are only using the application to view the reviews are not required to make an account and have only viewer access. 

All users who have an account can create reviews, leave comments, like, or dislike other reviews. However, users can only delete their reviews and no one else's. Users can specify certain tags and give individual scores on specific topics associated with the course or professor, such as:

<ul>
 <li>Difficulty</li>
 <li>Workload</li>
 <li>Course average grade</li>
 <li>Content</li>
 <li>Engagement</li>
 <li>Professor qualities (fun, caring, great communication, helpful, etc)</li>
 <li>Average time spent weekly on course</li>
</ul>


Users can add a rating from 1 (lowest) - 5 (highest) on the individual topics mentioned above, for example, Difficulty is 3, Workload is 5, Engagement is 1, etc. Users can also add various tags to each review to better educate other students regarding the course or the professor. For example, users can add the tags “Kind”, “Helpful” for the professors in their reviews. They can also add the tags “Hard”, “Heavy Workload”, “Time-consuming” for their course reviews. 


**Beta Key Features (due on March 20th):**
<ul>
 <li>Mandatory pages such as About, Contact Us, Home, etc</li>
 <li>List of courses and professors in various post-secondary schools in Ontario</li>
 <li>Search engine for courses and professors</li>
 <li>List of reviews for each course and professor</li>
 <li>Overall rating system for the course / professor</li>
 <li>Users can sign up / sign in and post on professor’s / courses pages</li>
 <li>Users that are logged out or do not have an account can only view, but not post / edit comments or rate</li>
 <li>Authentication of school emails and login process</li>
</ul>


**Final Key Features (due on April 3rd):**
<ul>
 <li>Users can associate Tags with the course or professor in their review</li>
 <li>Users can give individual scores for certain topics in their reviews</li>
 <li>Users can comment on other reviews</li>
 <li>Integration with location (Google maps API)</li>
 <li>Layout Color (dark, light)</li>
 <li>Language Selection (English, French, Spanish, etc)</li>
 <li>Recommendations-based system for potential courses where the web app recommends new search results for courses to students based on the ones they previously searched. It   will use collaborative filtering algorithms to generate recommendations for users based on users who searched similar courses.</li>
</ul>








**Technology Stack:** \
Our main stack we will be using is the MERN stack (which stands for MongoDB, Express.js, React, Node.js) as well as GraphQL. 
For the frontend, we will be using React, which is a JavaScript library which is built on top of HTML, CSS and JavaScript. To improve the responsive design of our app, we will also use Bootstrap, which is an extensive and customizable library that will allow us to build better designs faster. It will also help us to adapt our design to mobile devices.

For the backend, we will be using Express.js, which is a framework of Node.js that will help us to handle the routing, requests, cookies, sessions, security, etc. 
MongoDB is the NoSQL database our app will use to store data. It is flexible, easy to scale, and relatively fast. Finally, GraphQL will make the data query and manipulation easier for us. 
 
Moreover, we will use the Google Maps API to integrate location support for the professor’s building location, PassportJS middleware for OAuth integration, and the swot-node npm package to verify whether an email address belongs to an academic institution. To support the “Recommendations-based system for potential courses”, we can use the collaborative-filter npm package.


**Technical Challenges:**
<ul>
 <li>Allowing students to comment on posted reviews. Designing the discussion forum layout might be challenging for us as well as designing the database schema to support that.</li>
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
 <li>https://www.npmjs.com/package/swot-node</li>
 <li>https://www.npmjs.com/package/collaborative-filter</li>
</ul>


