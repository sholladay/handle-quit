'use strict';

let installed = false;
module.exports = (shutdown) => {
    if (installed) {
        throw new Error('Multiple uses of handle-quit are not allowed.');
    }

    installed = true;

    let cancelled = false;
    process.on('SIGINT', () => {
        if (cancelled) {
            console.warn('\nShutting down immediately. You monster!');
            // Quit and tell the shell something went wrong.
            // eslint-disable-next-line xo/no-process-exit
            process.exit(1);
        }

        cancelled = true;

        console.warn('\nShutting down. Please wait or hit CTRL+C to force quit.');

        shutdown();
    });
};
