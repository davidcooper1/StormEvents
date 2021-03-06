# StormEvents
[![ScreenShot](https://github.com/davidcooper1/StormEvents/blob/master/ReportScreenshot.PNG)](https://youtu.be/sJwbzOmhm0k)
Click on the above screenshot to be redirected to the video, or if you are unable, click [here](https://youtu.be/sJwbzOmhm0k).

[--------------------------------------------------CLICK HERE FOR PROJECT-----------------------------------------------------------](https://davidcooper1.github.io/StormEvents/)

## The Data

We used [the NOAA Storm Events](https://www.ncdc.noaa.gov/stormevents/) database that records storm events that provides us with descriptions, the type of storm, and the area that the storm occured. Some of the types of storms that this data records are tornados, heavy winds and snow, thunderstorms, tsunamis, and thunder storms. With this information and the county codes related to the storm event, we created a normalized heat map of the occurences over all counties in the United States. The next diagram we created was a word cloud using the description of the storm. The word cloud depicts the most popular used words in the descriptions of the storm and their relation with eachother.

## Libraries

The libraries used on this project consist of JQuery, Turf, Bootstrap, and D3. We used JQuery for smooth DOM manipulation, Turf allows us to draw the paths for each county, Bootstrap for readable UI elements, and D3 for constructing the visualizations.
The links for each can be found here:

[https://jquery.com/download/](https://jquery.com/download/).

[https://github.com/Turfjs/turf](https://github.com/Turfjs/turf).

[https://getbootstrap.com/docs/4.0/getting-started/download/](https://getbootstrap.com/docs/4.0/getting-started/download/).

[https://d3js.org/](https://d3js.org/).

## US Map of Storm Events

This US map is split up by county and displays a normalized version of the data set given to use by the NOAA storm events database. We did calculations on the occurences to account for some counties being larger sized than others. With this in mind, it allowed us to get a more accurate view on which counties had a higher number of occurences per area. There are a few ways to modify that data in our application. We have a category list which is populated by the type of events in the database. By selecting one or multiple, you can see the counties with the highest occurence of that event type per area. When no category is selected, by default, it shows the counties with the highest overall event occurence. There is also the map control section which allows the user to normalize the data. However, if the user wants to see the raw data, without normalization, they can select raw and the heat map will display as such.

## Word Cloud

The Word Cloud displays the top 50 terms that occur the most in the descriptions of events. When selecting an event type in the category selector, it filters to get the top 50 terms of the description only of the event type selected. The size of the font of each word is based on the number of time that word occurs in the given descriptions. The words themselves are clickable and when clicked on add the clicked word to the Words Used tab. These words now filter the descriptions for the top 50 related words to the event selected and the words selected.
