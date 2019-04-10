# StormEvents

## The Data

We used [the NOAA Storm Events](https://www.ncdc.noaa.gov/stormevents/) database that records storm events that provides us with descriptions, the type of storm, and the area that the storm occured. Some of the types of storms that this data records are tornados, heavy winds and snow, thunderstorms, tsunamis, and thunder storms. With this information and the county codes related to the storm event, we created a normalized heat map of the occurences over all counties in the United States. The next diagram we created was a word cloud using the description of the storm. The word cloud depicts the most popular used words in the descriptions of the storm and their relation with eachother.

## Libraries

The libraries used on this project consist of JQuery, Turf, Bootstrap, and D3. The links can be found here:

[https://jquery.com/download/](https://jquery.com/download/).

[https://github.com/Turfjs/turf](https://github.com/Turfjs/turf).

[https://getbootstrap.com/docs/4.0/getting-started/download/](https://getbootstrap.com/docs/4.0/getting-started/download/).

[https://d3js.org/](https://d3js.org/).

## US Map of Storm Events

This US map is split up by county and displays a normalized version of the data set given to use by the NOAA storm events database. We did calculations on the occurences to account for some counties being larger sized than others. With this in mind, it allowed us to get a more accurate view on which counties had a higher number of occurences per area. There are a few ways to modify that data in our application. We have a category list which is populated by the type of events in the database. By selecting one or multiple, you can see the counties with the highest occurence of that event type per area. When no category is selected, by default, it shows the counties with the highest overall event occurence. There is also the map control section which allows the user to normalize the data. However, if the user wants to see the raw data, without normalization, they can select raw and the heat map will display as such.
