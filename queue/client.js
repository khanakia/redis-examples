const uuidv4 = require('uuid/v4');
var redis = require("redis");
var client = redis.createClient({
    db: 1
});

function sendMessage(listname) {
    const uid = uuidv4()

    const message = {
        method: 'redis.hello',
        params: {
            fullname: 'Lucian'
        },
        uid: uid
    }

    console.log(uid)

    client.lpush(listname, JSON.stringify(message))

    client.brpop(uid, 5, function (err, item) {
        console.log(err, item)
    })
}

let main = async () => { 
    sendMessage('demolist')
}

main()

client.quit()