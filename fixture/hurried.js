const handleQuit = require('..');

// Keep the process open for a while to give the tests a chance to kill the process
// when and how they want to.
setTimeout(() => {
    throw new Error('Timeout: The kill signal was not handled properly or was not received.');
}, 3000);

handleQuit(() => {
    console.log('Quit handled.');
});
