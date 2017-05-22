import { execFile } from 'child_process';
import test from 'ava';

test.cb('handleQuit basics', (t) => {
    const child = execFile('node', ['./fixture/graceful'], (error, stdout, stderr) => {
        t.is(error, null);
        t.is(stdout, '\nShutting down. Please wait or hit CTRL+C to force quit.\nQuit handled.\n');
        t.is(stderr, '');
        t.end();
    });
    setTimeout(() => {
        child.kill('SIGINT');
    }, 1000);
});

test.cb('hurries if second signal received', (t) => {
    const child = execFile('node', ['./fixture/hurried'], (error, stdout, stderr) => {
        t.is(error.code, 1);
        t.is(stdout, '\nShutting down. Please wait or hit CTRL+C to force quit.\nQuit handled.\n');
        t.is(stderr, '\nShutting down immediately. You monster!\n');
        t.end();
    });
    setTimeout(() => {
        child.kill('SIGINT');
        setTimeout(() => {
            child.kill('SIGINT');
        }, 100);
    }, 1000);
});
