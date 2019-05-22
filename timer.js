const { PerformanceObserver, performance } = require('perf_hooks');
const request = require("request"); 
const {promisify} = require("util");

let input = process.argv[2];
let promiseRequest = promisify(request)

const observer = new PerformanceObserver((items) => {
  console.log(items.getEntries()[0].duration);
  performance.clearMarks();
});
observer.observe({ entryTypes: ['measure'] });

performance.mark('start');

async function check() {
	let url = `http://localhost:1337/check?pin=${input}`;

	let response = await promiseRequest(url);

	console.log(response.body)

	performance.mark('end');
	performance.measure('start to end', 'start', 'end');
};

check();