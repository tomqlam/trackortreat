# trackortreat
CalHacks 9.0 Project

## Inspiration
As children, we realized we were wasting time walking to houses with no candy or candy we didn't want. We then wanted to create an app that could skip the waiting and allow us to see which houses had the candy we wanted.
## What it does
The mobile app, called Track o' Treat, allows homes to enter the types of candy they will be giving out and how they are giving it out (at the door or in a bucket in front of the door). The user enters which candies they want, and the app shows which houses have said candy and which don't. In addition, the user can see a potential path to houses with the candy they want.
## How we built it
We used CockroachDB for database, Typescript, Express/Node.js for the backend, and React Native for the front end. We used Google Maps API and Map View for the front end to view map data.
## Challenges we ran into
We had some trouble generating the path-finding algorithm since we could not find any current algorithm that can find a path with the max value from a vertex to itself.  
## Accomplishments that we're proud of
We are proud of our path-finding algorithm and UI, which allows users to visualize the generated path and see what types of candies houses are putting out (eg. a big candy icon for houses giving out giant candy bars or a bowl of candy for houses giving out multiple candies).
## What we learned
We learned how to use CockroachDB and got familiarized with the Google Maps API. We also learned some new path-solving algorithms which could be used for future projects. In regards to the backend, we learned that it is often better to start from mostly scratch than trying to adapt some prebuilt public repo would require us to understand tons of irrelevant boilerplate. For the frontend, we learned about Map View and how to better utilize CSS frameworks.
## What's next for Track o' Treat
We plan on adding new features, such as options for more candies and a more optimized path-finding algorithm. We also would like to add user accounts and authentication. Finally, there are some edge cases that we need to account for in the backend and we need to revamp some UI things like candy selection in the front end.
