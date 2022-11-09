const express = require('express');
const cors = require('cors');
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');

const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// user: weedingPhotographer
// password: VKy64kfvxwR7zbF9


const uri = "mongodb+srv://weedingPhotographer:VKy64kfvxwR7zbF9@cluster0.mfyq6m8.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const serviceCollection = client.db('weedingPhotographer').collection('services');
        app.post('/services', async (req, res) => {
            const services = req.body;
            const result = await serviceCollection.insertOne(services);
            res.send(result);
        });

        app.get('/services', async (req, res) => {
            const query = {};
            const cursor = serviceCollection.find(query);
            const services = await cursor.toArray();
            res.send(services);
        });

        app.get('/home/services', async (req, res) => {
            const query = {};
            const cursor = serviceCollection.find(query).limit(3);
            const services = await cursor.toArray();
            res.send(services);
        });


    }
    finally { }
}
run().catch(err => console.err(err));


app.get('/', (req, res) => {
    res.send('weeding photographer server running');
});

app.listen(port, () => {
    console.log(`weeding photographer server running on port ${port}`);
});