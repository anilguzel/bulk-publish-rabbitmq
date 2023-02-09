async function publishMessages(data) {
    let failList = [];
    await asyncForEach(data, async (item) => {
        document.getElementsByName("payload")[0].value = typeof item === "string" ? item : JSON.stringify(item);
        document.querySelector('input[type="submit"][value="Publish message"]').click();
​
        try {
            await waitForInfo();
        } catch (error) {
            failList.push(item);
        }
    });
​
    if (failList.length > 0) {
        console.log("Messages particially published successfully");
        console.log("Failed messages", failList);
    }
    else {
        console.log("All messages published successfully");
    }
​
    async function waitForInfo() {
        let interval = null;
        let timeout = null;
        await new Promise((resolve, reject) => {
            interval = window.setInterval(() => {
                if (document.querySelector('.form-popup-info span')?.innerHTML === "Close") {
                    window.clearInterval(interval);
                    window.clearTimeout(timeout);
                    document.querySelector('.form-popup-info span').click();
                    resolve();
                }
            }, 10);
​
            timeout = window.setTimeout(() => {
                window.clearInterval(interval);
                window.clearTimeout(timeout);
                reject("timeout");
            }, 3000);
        });
        await wait(100);
    }
​
    async function wait(timeout) {
        return new Promise((resolve) => {
            window.setTimeout(() => resolve(), timeout);
        })
    }
​
    async function asyncForEach(array, callback) {
        for (let index = 0; index < array.length; index++) {
            await callback(array[index], index);
        }
    }
}
