const amqp = require("amqplib").connect('amqp://localhost')


async function MQ()
{
    let connection = await amqp
    let channel = await connection.createChannel()

    await channel.assertExchange("topic_logs4", "topic")

    const {queue} = await channel.assertQueue("")
    await channel.bindQueue(queue, "topic_logs4", "agente.1")

    setInterval(() => {
        channel.publish("topic_logs4", "agente.2", Buffer.from("Hola Agente"))
    }, 1000)

    await channel.consume(queue, (msg) => {
        console.log(msg.content.toString())
    })
}

MQ()
.then((value)=> console.log)
.catch((err)=> console.log)