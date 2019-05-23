const {PerformanceObserver, performance} = require('perf_hooks');
const request = require("request");
const {promisify} = require("util");

let promiseRequest = promisify(request)

//set up the observer
const observer = new PerformanceObserver(() => {
	performance.clearMarks();
});
observer.observe({entryTypes: ['measure']});

async function check(input) {
	//start the timer
	performance.mark('start');
	
	//get the time when the function runs
	let start = performance.now();

	//send a request to to the server with the user input
	let url = `https://timing-attack.herokuapp.com/check?pin=${input}`;
	let response = await promiseRequest(url);
	response = response.body;

	//get the time when the functin ends
	let end = performance.now();

	//get the time between the start and end
	let finish = end - start;

	//end the timer
	performance.mark('end');
	performance.measure('start to end', 'start', 'end');

	return {
		response,
		finish
	}
};

module.exports = check;