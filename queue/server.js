const uuidv4 = require('uuid/v4');
var redis = require("redis");
var client = redis.createClient({
    db: 1
});

function waitForData () {
    client.brpop('demolist', 0, function (listName, item) {

        //## RECEIVE MESSAGE
        const message = JSON.parse(item[1])
        console.log(message)

        //## SEND REPLY
        const reply = {
            statusCode: 200,
            uid: message.requestID
        }

        client.rpush(message.requestID, JSON.stringify(reply))

        //## WAIT FOR NEXT DATA
        process.nextTick(waitForData);

        // setTimeout(() => {
            
        //     client.expire(message.requestID, 20)
        //     console.log('Reply Sent')
            
        // }, 10000)

    });
}

waitForData()