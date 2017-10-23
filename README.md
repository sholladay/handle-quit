# handle-quit [![Build status for Handle Quit](https://img.shields.io/circleci/project/sholladay/handle-quit/master.svg "Build Status")](https://circleci.com/gh/sholladay/handle-quit "Builds")

> Support [graceful stop](http://pm2.keymetrics.io/docs/usage/signals-clean-restart/#graceful-stop) in your app

Respond to shutdown signals, so a process manager can reload your app without dropping any connections.

## Why?

 - Friendly to your users.
 - Easy to use and reason about.
 - Helps you do easy [zero downtime](https://futurestud.io/tutorials/pm2-cluster-mode-and-zero-downtime-restarts#zerodowntimedeployments) deployments.

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

Note that calling [`process.exit()`](https://nodejs.org/api/process.html#process_process_exit_code) is discouraged. Instead, you should close any server and database connections and let Node exit on its own, which it does automatically when it has no more work left to do.

If you are worried about the process hanging and never cleanly exiting, you are encouraged to use your framework's [stop timeout](https://hapijs.com/api#serverstopoptions-callback).

## Use with PM2

To achieve zero downtime deployments, [PM2](https://github.com/Unitech/pm2) needs to shutdown your app without dropping any connections. It sends a [`SIGINT` signal](https://nodejs.org/api/process.html#process_signal_events) to trigger the shutdown process. However, by default, Node reacts to this by exiting immediately, and thus in-progress connections may be dropped.

These problems can be fixed by using `handleQuit()` in the main entry of your CLI or server, as shown above, to override the default `SIGINT` behavior and deny _new_ connections on the first `SIGINT`, while allowing any in-progress connections to finish. This is known as [graceful stop](http://pm2.keymetrics.io/docs/usage/signals-clean-restart/#graceful-stop).

PM2 waits for apps that gracefully stop to quit before replacing them with a new deployment when using `pm2 reload`.

```console
$ pm2 start app.js --kill-timeout 6000
```

Just in case something goes wrong, `--kill-timeout` tells PM2 how long it should wait for the process to exit before considering the process hung / frozen, in which case it will force kill the process. You should ensure that `--kill-timeout` is greater than or equal to any stop timeouts used in your app.

To support graceful _start_, see [app-ready](https://github.com/sholladay/app-ready).

## API

### handleQuit(listener)

Listens for [SIGINT](https://en.wikipedia.org/wiki/Unix_signal#POSIX_signals) and runs a graceful shutdown on the first signal. Calls `process.exit(1)` upon any future SIGINT signals. Relevant shutdown messages are also printed to the console.

#### listener

Type: `function`

A function that will gracefully shutdown your program. A common example is [Server#close()](https://nodejs.org/api/http.html#http_server_close_callback).

## Related

 - [app-ready](https://github.com/sholladay/app-ready) - Support [graceful start](http://pm2.keymetrics.io/docs/usage/signals-clean-restart/#graceful-start) in your app

## Contributing

See our [contributing guidelines](https://github.com/sholladay/handle-quit/blob/master/CONTRIBUTING.md "Guidelines for participating in this project") for more details.

1. [Fork it](https://github.com/sholladay/handle-quit/fork).
2. Make a feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. [Submit a pull request](https://github.com/sholladay/handle-quit/compare "Submit code to this project for review").

## License

[MPL-2.0](https://github.com/sholladay/handle-quit/blob/master/LICENSE "License for handle-quit") © [Seth Holladay](https://seth-holladay.com "Author of handle-quit")

Go make something, dang it.
