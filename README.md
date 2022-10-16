# trackortreat
CalHacks 9.0 Project

An application that displays data about nearby houses that contain candy and a variety of path optimization and filtering tools to improve and streamline trick o' treating!

## Inspiration
Halloween’s right around the corner, and what’s the holiday without some fruitful trick o treating? Emphasis on the fruitful: no one likes ringing doorbell after doorbell, only to find houses of sleeping (and annoyed) families or stale Costco chocolates. And during the annual nighttime journey, we’d all like to optimize our paths—not the easiest task!
## What it does
That’s where Track o’ Treat comes in. Trick o treaters can enter data about houses they trick o treat at, indicating if houses have no candy, bowls of candy, GIANT candies, and what types of candies they carry. Then, after entering their own candy preferences, they can filter neighboring houses by candy type, as well as generate a path that hits all the best houses around town with the Generate Path function. Different candy-givers are indicated by different icons: lollipop for normal, a big candy for GIANT candies, and a crossed out candy for no candy :(
## How we built it
We used CockroachDB for the database, Typescript, Express/Node.js for the backend, and React Native for the front end. We used Google Maps API and Map View for the front end to view map data, and NativeBase as the CSS framework.
## Challenges we ran into
It was our first time trying to incorporate any map-related component in the front end, so there was a significant amount of time that went into debugging the libraries. It was also our first time using a React Native CSS framework, which made styling much easier—though we had to get familiar with it within 24 hours. We had some trouble generating the path-finding algorithm since we could not find any current algorithm that can find a path with the max value from a vertex to itself.  
## Accomplishments that we're proud of
We are proud of our path-finding algorithm and UI, which allows users to visualize the generated path and see what types of candies houses are putting out (eg. a big candy icon for houses giving out giant candy bars or a bowl of candy for houses giving out multiple candies). 
## What we learned
We learned how to use CockroachDB and got familiarized with the Google Maps API. We also learned some new path-solving algorithms which could be used for future projects. In regards to the backend, we learned that it is often better to start from mostly scratch than trying to adapt some prebuilt public repo would require us to understand tons of irrelevant boilerplate. For the frontend, we learned about Map View and how to utilize CSS frameworks to avoid the need to make a UI/UX from scratch.
## What's next for Track o' Treat
We plan on adding new features, such as options for more candies and a more optimized path-finding algorithm. We also would like to add user accounts and authentication. Finally, there are some edge cases that we need to account for in the backend and we need to revamp some UI things like candy selection in the front end.

