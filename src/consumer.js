const amqp = require("amqplib").connect('amqp://localhost')

async function MQ()
{
    let connection = await amqp
    let channel = await connection.createChannel()


    await channel.assertExchange("topic_logs4", "topic")

    const {queue} = await channel.assertQueue("cola1")
    await channel.bindQueue(queue, "topic_logs4", "agente.2")

    await channel.consume(queue, (msg) => {
      console.log(msg.content.toString())
      channel.publish("topic_logs4", "agente.1", Buffer.from("¿Como va todo?"))
    })
    
}

MQ()
.then((value)=> console.log)
.catch((err)=> console.log)