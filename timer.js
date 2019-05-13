const { PerformanceObserver, performance } = require('perf_hooks');
const request = require("request"); 
const {promisify} = require("util");

let promiseRequest = promisify(request)

const observer = new PerformanceObserver((items) => {
  console.log(items.getEntries()[0].duration);
  performance.clearMarks();
});
observer.observe({ entryTypes: ['measure'] });

performance.mark('start');

let input = process.argv;

async function check() {
	let url = "http://127.0.0.1:1337/check?";

	//build url using the given input
	for(let i = 2; i < input.length; i++) {
		url += `in${i-1}=${input[i]}&`;
	}

	//remove the final '&' at the end of the url
	url = url.substring(0, url.length-1);

	let response = await promiseRequest(url);

	console.log(response.body)

	performance.mark('end');
	performance.measure('start to end', 'start', 'end');
};

check();