import { execFile } from 'child_process';
import test from 'ava';

test.cb('graceful SIGINT', (t) => {
    t.plan(3);
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

test.cb('graceful SIGTERM', (t) => {
    t.plan(3);
    const child = execFile('node', ['./fixture/graceful'], (error, stdout, stderr) => {
        t.is(error, null);
        t.is(stdout, '\nShutting down. Please wait or hit CTRL+C to force quit.\nQuit handled.\n');
        t.is(stderr, '');
        t.end();
    });
    setTimeout(() => {
        child.kill('SIGTERM');
    }, 1000);
});

test.cb('hurried SIGINT', (t) => {
    t.plan(3);
    const child = execFile('node', ['./fixture/hurried'], (error, stdout, stderr) => {
        t.is(error.code, 130);
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

test.cb('hurried SIGTERM', (t) => {
    t.plan(3);
    const child = execFile('node', ['./fixture/hurried'], (error, stdout, stderr) => {
        t.is(error.code, 143);
        t.is(stdout, '\nShutting down. Please wait or hit CTRL+C to force quit.\nQuit handled.\n');
        t.is(stderr, '\nShutting down immediately. You monster!\n');
        t.end();
    });
    setTimeout(() => {
        child.kill('SIGTERM');
        setTimeout(() => {
            child.kill('SIGTERM');
        }, 100);
    }, 1000);
});

test.cb('SIGINT followed by SIGTERM', (t) => {
    t.plan(3);
    const child = execFile('node', ['./fixture/hurried'], (error, stdout, stderr) => {
        t.is(error.code, 143);
        t.is(stdout, '\nShutting down. Please wait or hit CTRL+C to force quit.\nQuit handled.\n');
        t.is(stderr, '\nShutting down immediately. You monster!\n');
        t.end();
    });
    setTimeout(() => {
        child.kill('SIGINT');
        setTimeout(() => {
            child.kill('SIGTERM');
        }, 100);
    }, 1000);
});

test.cb('SIGTERM followed by SIGINT', (t) => {
    t.plan(3);
    const child = execFile('node', ['./fixture/hurried'], (error, stdout, stderr) => {
        t.is(error.code, 130);
        t.is(stdout, '\nShutting down. Please wait or hit CTRL+C to force quit.\nQuit handled.\n');
        t.is(stderr, '\nShutting down immediately. You monster!\n');
        t.end();
    });
    setTimeout(() => {
        child.kill('SIGTERM');
        setTimeout(() => {
            child.kill('SIGINT');
        }, 100);
    }, 1000);
});
