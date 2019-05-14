const express = require("express");
const app = express();



//correct pin
const correct = [pin goes here];


//stop the event loop for a given amount of time
function sleep(time) {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve();
		}, time)
	});
}

async function checkPassword(input) {
	let time = 0;
	result = true;

	//convert input to integers
	input = Object.keys(input).map((num) => {
		return parseInt(input[num], 10);
	});

	//check each number in the input against the correct pin
	// and increment the time variable 
	for (let i = 0; i < input.length; i++) {
		if (input[i] === correct[i]) {
			time += 0.45;
		} else {
			result = false;
		}
	}

	// prevent revealing the length of the pin
	if (input.length !== correct.length) {
		result = false;
	}

	await sleep(time * 500);
	return result;
}

app.get("/check", async (req, res) => {
	let result = await checkPassword(req.query);

	if (result) {
		res.send("██████  ██  ██  ▄▄▄       ███▄ ▄███  █████\n██       ██  ██  ████▄     ██ ▀█▀ ██  █   ▀\n  ██▄    ██▀▀██  ██  ▀█▄   ██     ██  ███\n     ██  ██  ██  ██▄▄▄▄██  ██     ██  ██  ▄\n██████   ██  ██  ██    ██  ██     ██   ████");
	} else {
		res.send("incorrect pin");
	}
});

let port = process.env.PORT || 1337;

app.listen(port);

                                             