  //Checks to see if the service worker API is available
  if ('serviceWorker' in navigator) {
    //The service worker at /sw.js is registered once the page is loaded.
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').then(registration => {
        //Registration was successful
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      }, err => {
        //Registration failed
        console.log('ServiceWorker registration failed: ', err);
      });
    });
  }

