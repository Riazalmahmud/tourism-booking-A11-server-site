

const express = require('express')
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
require('dotenv').config();

const app = express()
const cors = require('cors');
const port = process.env.PORT || 5000;


// MiddleWare 
app.use(cors());
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fq8sq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        const database = client.db("booking");
        const booking = database.collection("booking");

        // post api 
        app.post('/booking', async (req, res) => {
            const service = req.body;

            const result = await booking.insertOne(service);
            console.log(result)
            res.json(result)
        })

        // get api post 
        app.get('/booking', async (req, res) => {
            const cursor = booking.find({});
            const tourService = await cursor.toArray();
            res.send(tourService)

        })

        // single post api 

        app.get('booking/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const tourService = await booking.findOne(query)
            res.json(tourService)
        })


    } finally {
        //   await client.close();
    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('Hello i am ready')
})

app.listen(port, () => {
    console.log('hello booking website ? ')
})



