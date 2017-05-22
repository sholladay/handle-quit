'use strict';

const { bold } = require('chalk');

let installed = false;
module.exports = (shutdown) => {
    if (installed) {
        throw new Error('Multiple uses of handle-quit are not allowed.');
    }

    installed = true;

    let hurry = false;
    process.on('SIGINT', () => {
        if (hurry) {
            console.error(bold.red('\nShutting down immediately. You monster!'));
            // Quit and tell the shell something went wrong.
            // eslint-disable-next-line xo/no-process-exit
            process.exit(1);
        }

        hurry = true;

        console.log('\nShutting down. Please wait or hit CTRL+C to force quit.');

        shutdown();
    });
};
