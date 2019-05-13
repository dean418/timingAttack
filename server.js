const express = require("express");
const app = express();

//correct pin
const correct = [16, 7, 42, 9, 2];


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
		try {
			return parseInt(input[num]);
		} catch(e) {
			result = false;
		}
	});

	//check each number in the input against the correct pin
	// and increment the time variable 
	for(let i = 0; i < input.length; i++) {
		if(input[i] === correct[i]) {
			time += 0.45;
		} else {
			result = false;
		}
	}

	// prevent revealing the length of the pin
	if(input.length !== correct.length) {
		result = false;
	}

	await sleep(time * 500);
	return result;
}

app.get("/check", async(req, res) => {
	let result = await checkPassword(req.query);

	if(result) {
		res.send("you are the true 1337 h4x0r");
	} else {
		res.send("incorrect pin");
	}
});

app.listen(1337);