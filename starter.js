const check = require('./timer');

// get the users input (node starter.js 123)
// input = 123
let input = process.argv[2];

async function request() {
    let response = await check(input);

    let time = response.finish
    let result = response.response
    
    console.log(time)
    console.log(result)
}

request();