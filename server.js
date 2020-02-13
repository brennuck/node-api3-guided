const express = require('express'); // importing a CommonJS module
const morgan = require("morgan");
const helmet = require("helmet");

const hubsRouter = require('./hubs/hubs-router.js');

const server = express();

// middleware
server.use(express.json());
server.use(morgan("dev"))
server.use(helmet());
server.use(logger)

server.use('/api/hubs', gatekeeper, hubsRouter);

server.get('/', logger, greeter, (req, res) => {

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${req.cohort} to the Lambda Hubs API</p>
    `);
});

module.exports = server;

function greeter(req, res, next) {
  req.cohort = "WEB 26"
  next();
}

function logger(req, res, next) {
  console.log(`${req.method} Request to ${req.originalUrl}`)
  next();
}

function gatekeeper(req, res, next) {
  const password = req.headers.password;
  if (password && password.toLowerCase() === 'mellon') { // check if there is a password and then check its mellon
    next();
  } else {
    res.status(400).json({ you: "SHALL NOT PASS!!" })
  }
}

// function fetchHubs() {
//   const endpoint = 'https://yada/hubs';
//   const options = {
//     headers = {
//       password: 'mellon'
//     }
//   }
//   axios.get(endpoint, options).then().catch()
// }