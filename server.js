const express = require("express");
const app = express();

app.use(express.static(__dirname + '/public'));

//correct pin
const correct = ["pin goes here"];

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

	input = input.pin.split('');

	//parse the input as an integer
	input = Object.keys(input).map((num) => {
		return parseInt(input[num], 10);
	});

	//check each number in the input against the correct pin
	// and increment the time variable 
	for (let i = 0; i < input.length; i++) {
		if (input[i] == correct[i]) {
			time += 0.35;
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

app.get('/', (req, res, next) => {
	res.render('index');
})

app.get("/check", async (req, res) => {
	console.log(req.query)
	let result = await checkPassword(req.query);

	if (result) {
		res.send("Egg and bacon\nEgg, sausage and bacon\nEgg and Spam\nEgg, bacon and Spam\nEgg, bacon, sausage and Spam\nSpam, bacon, sausage and Spam\nSpam, egg, Spam, Spam, bacon and Spam\nSpam, Spam, Spam, egg and Spam\nSpam, Sausage, Spam, Spam, Spam, Bacon, Spam, Tomato and Spam\nSpam, Spam, Spam, Spam, Spam, Spam, baked beans, Spam, Spam, Spam and Spam")
	} else {
		res.send("incorrect pin");
	}
});

let port = process.env.PORT || 1337;

app.listen(port);