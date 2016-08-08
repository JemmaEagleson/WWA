/*

Wee Weather Map App

We're going to use OpenWeatherMap's API to build a simple little weather app. The app we're building is checking in to OpenWeatherMap and returning some JSON (JavaScript Object Notation), which we then use to make it work.

*/


/* The getLocation function gets the location from the text box and makes sure it isn't empty. (If it's empty, we'll display the red border, using the .error class in our CSS.) */

function getLocation(){
	
	var location = document.getElementById("location").value;

/* The following line ensures that cities like 'New York' that have a space in their name have the space replaced with '%20' so that they return a URL without a space. */
	
	location = location.replace(" ", "%20");
	
/* Check the location isn't blank. */
	
	if (location == ""){
		
/* If the location is blank set a red border on the input using our CSS .error class. */

		document.getElementById("location").classList.add("error");
		
	}
	else {
		
/* If the location isn't blank, remove the .error class and call the getWeather function, passing it the location variable. */
		
		document.getElementById("location").classList.remove("error");
		getWeather(location);
		
	}
}

/* The getWeather function calls the OpenWeatherMap API and returns the current weather for the specified location. */

function getWeather(location){
	
/* First we want to call the OpenWeatherMap API and get the data using AJAX (Asynchronous JavaScript and XML). AJAX is used to update parts of the page, without reloading the entire page.

In this example, we need to use AJAX to get the JSON (JavaScript Object Notation) object from an external URL, then we'll swap our location input form for the weather results. */
	

/* Create a new AJAX object. */

	var ajax = new XMLHttpRequest();
	
/* Create a new empty variable to store our JSON object in, when it's returned from the API. */

	var json; 
	
/*

Create a new variable to store our apiKEY. (The one that we received when we signed up at OpenWeatherMap.)

Note: This is my apiKEY (Chris's, not Kyle's.) Don't use this one, sign up for one of your own. It's free and you can get your key here:

http://home.openweathermap.org/users/sign_up

*/

	var apiKEY = "bbbc2c66cb6a5b2666c21ed58bba5542";
	
/* Construct the API URL using the location and our API key. */
	
	var url = "http://api.openweathermap.org/data/2.5/weather?q=" + location + " ,uk&appid=" + apiKEY;

/* Open the AJAX connection using a GET request, pass in the URL of the weathermap API stored in the url variable, set async to true (in other words, don't wait for the JSON object to be returned from the API before loading the rest of the page and running any additional Javascript). */

	ajax.open("GET", url, true);

/* Now the connection is open, send the request to the server. */
	
	ajax.send();
	
/* Because we set async to true, we need to listen for a response from the server.	onreadystatechange is an event of the AJAX object that updates when a change in our request is triggered by the server. */
	
	ajax.onreadystatechange = function(){

/*

We can use an if statement to check that the request to the OpenWeatherMap server has completed. If the readyState of our AJAX object is 4, the request is complete. We can then test that server response in the same if statement to check that the server returned something, and not a 404 status.

200: OK
404: Not Found

There is more on HTTP response codes here:

https://developer.mozilla.org/en-US/docs/Web/HTTP/Response_codes

*/

		if (ajax.readyState == 4 && ajax.status == 200){
			 
/* If the request worked, put the JSON that was returned from the server into our variable. The responseText property of our AJAX object will contain the data returned from the server. */

			json = JSON.parse(ajax.responseText);
			
/* If everything worked, hide the location form in our HTML and show our weather section with the icon and the description. */

			document.getElementById("locationForm").style.display = "none";
			document.getElementById("weather").style.display = "block";
			
/* Check the result wasn't empty. */

			if (json != undefined){
				
/* Get the weather from the json object, main property. */

				var weather = json.weather[0].main
				setIconAndDescription(weather, location)
				
			}	
			else {
				
/* Set a default message in case of non-response from the API. In this case we'll say: "Oops, I couldn't find the weather in " plus our `location` variable. */

				description = "Oops, I couldn't find the weather in " + location;
				document.getElementById("description").innerHTML = description;
		
			}
		}
	}
}

function setIconAndDescription(weather, location){

	var icon;
	var description;
	
/* Convert the weather description to lowercase - using the toLowerCase() function. This will make it easier to search and ensures it fits into our description. */

	weather = weather.toLowerCase();
		
/* Use an if statement to check the weather in the weather variable and set the correct icon and description. This looks complicated, but is just a conditional statement running through a series of options. */

	if (weather == "clear sky"
		|| weather == "clear"){
		
		icon = "clear.svg";
		description = "It's going to be sunny today, YAY!";
		
	}
	else if (weather == "few clouds"){
		
		icon = "few-clouds.svg";
		description = "Looks a wee bit cloudy.";
		
	}
	else if (weather == "scattered clouds" 
		|| weather == "broken clouds" 
		|| weather == "clouds"){
		
		icon = "clouds.svg";
		description = "Looks like it's partly cloudy today.";
		
	}
	else if (weather == "rain"
	|| weather == "light rain"
	|| weather == "shower rain"){
		
		icon = "rain.svg";
		description = "Grab an umbrella. It's raining."
		
	}
	else if(weather == "thunderstorm"){
		
		icon = "thunder.svg";
		description = "AH! It's thundery out there"
		
	}
	else if (weather == "snow"){
		
		icon = "snow.svg";
		description = "It's snowing! Ya wouldn't be long getting frostbit"
		
	}
	else if (weather == "mist"){
		
		icon = "mist.svg";
		description = "Seems misty today";
		
	}
	else {
		
		icon = "default.svg";
		description = "Uh-oh, we couldnt find the weather in " + location;
		
	}

/* Now inject the image and description onto the page. */

	document.getElementById("weatherIcon").src = "images/" + icon;
	document.getElementById("description").innerHTML = description;
	
}


/* Attach the getWeather function to the 'Go' button when the page loads. */

(function() {

/* Add onclick event. */

	document.getElementById("btnGo").onclick = getLocation;
	
/*

Also factor in if the user presses the 'enter' key. There's more on keyCodes here, courtesy of Chris Coyier:

https://css-tricks.com/snippets/javascript/javascript-keycodes/

*/

	document.getElementById("location").onkeypress = function(key){
		
		if (key.keyCode == "13"){
			
			getLocation();
			
		}
	}

})();


/* That's it. If you attended the session with Kyle Gawley in Week 11, when he ran through all of this with you, the above should be understandable. If anything isn't understandable, use the notes and Google to unravel everything. Good luck. */