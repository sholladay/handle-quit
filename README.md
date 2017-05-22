# handle-quit [![Build status for handle-quit on Circle CI.](https://img.shields.io/circleci/project/sholladay/handle-quit/master.svg "Circle Build Status")](https://circleci.com/gh/sholladay/handle-quit "Handle Quit Builds")

> Teach your process to shutdown gracefully.

## Why?

 - Friendly to your users.
 - Easy to use and reason about.
 - Enables [zero-downtime](https://github.com/Unitech/pm2/blob/ea406684a7ca29cc8a9214c7c6df938d5d6fab75/README.md#load-balancing--zero-second-downtime-reload) deployments.

## Install

```sh
npm install handle-quit --save
```

## Usage

Get it into your program.

```js
const handleQuit = require('handle-quit');
```

Make sure your program shuts down gracefully or quickly, as necessary.

```js
handleQuit(() => {
    server.close();
});
```

## API

### handleQuit(listener)

Listens for [SIGINT](https://en.wikipedia.org/wiki/Unix_signal#POSIX_signals) and runs a graceful shutdown on the first signal. Calls `process.exit()` upon any future SIGINT signals. Relevant shutdown messages are also printed to the console.

#### listener

Type: `function`

A function that will gracefully shutdown your program. A common example is [Server#close()](https://nodejs.org/api/http.html#http_server_close_callback).

## Contributing

See our [contributing guidelines](https://github.com/sholladay/handle-quit/blob/master/CONTRIBUTING.md "The guidelines for participating in this project.") for more details.

1. [Fork it](https://github.com/sholladay/handle-quit/fork).
2. Make a feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. [Submit a pull request](https://github.com/sholladay/handle-quit/compare "Submit code to this project for review.").

## License

[MPL-2.0](https://github.com/sholladay/handle-quit/blob/master/LICENSE "The license for handle-quit.") © [Seth Holladay](http://seth-holladay.com "Author of handle-quit.")

Go make something, dang it.
