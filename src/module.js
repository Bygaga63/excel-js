console.log('bar');

async function start() {
    await Promise.resolve()
}

start().then(() => console.log('done'))