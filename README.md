# Restaurant Review Site
By Jeremy Levett

## About
Transformed a static webpage into a mobile-ready offline web application.
The code was updated to resolve these issues and add extra features while still maintaining the included functionality.
Features included:
* The ability to filter restaurants by neighborhood and cuisine type was added.
* Responsive design on different sized displays
* A Google Map with animated Google Map Markers retrieved asynchronously from the Google Maps API.
* Best practices of A11Y, implementing ARIA and semantic HTML for screen reader use.
* A simple offline-first caching strategy using a service worker was added to create a seamless offline experience

[APP HOSTED HERE. CLICK TO TRY IT OUT!](https://jlevett.github.io/Restaurant-Review-Site/ "Live App Hosted Here")

### Responsive in desktop mode

![Gif](https://github.com/Jlevett/Restaurant-Review-Site/blob/master/restaurant%20desktop.gif)

### Responsive in mobile mode

![Gif](https://github.com/Jlevett/Restaurant-Review-Site/blob/master/restaurant%20mobile.gif)

Udacity Project Reviewer comment:
_"Congratulations, your submission looks awesome! You fixed all the bugs. 
This is great!, I enjoyed reviewing this."_

## Local Installation 
1. Download the zip file.
2. Extract it into a folder
3. Run 'python -m http.server 8000' in bash.
4. Open up http://localhost:8000 in chrome.

Note: In Dev Tools, disconnect the internet or set the throttling to a low Internet speed to check out the offline experience of the app!

## Technology
* PWA - serviceWorker (offline first)
* HTML
* CSS
* Google Maps API
* ay11 (accessibility)
* Responsive design using CSS Flexbox (desktop to mobile)

## Desktop Screenshot
![Image of App Desktop](https://github.com/Jlevett/Restaurant-Review-Site/blob/master/restaurant%20home.png)

![Image of App Desktop](https://github.com/Jlevett/Restaurant-Review-Site/blob/master/restaurant%20details.png)

## License
This project is licensed under the MIT License - see the [LICENSE](https://github.com/Jlevett/Restaurant-Review-Site/blob/master/LICENSE) file for details.
