const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');

// require('dotenv').config();
const port = process.env.PORT || 5000;
const app = express();
const ObjectId = require('mongodb').ObjectId;

// middleware 
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://geniusUser1:MgjiijYfiu8j9nQ2@cluster0.lywig.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run(){
  try{
    await client.connect();
       const serviceCollection = client.db('geniusCar').collection('service');
console.log('User completley ok')

       app.get('/service', async (req,res)=>{
        const query = {};

        const cursor = serviceCollection.find(query);
        const services = await cursor.toArray();
        res.send(services);
     });

     app.get('/service/:id' , async (req,res)=>{
         const id =req.params.id;
         const query = {_id: ObjectId(id)};
         const service = await serviceCollection.findOne(query);
         res.send(service);
     })

     // post data

     app.post('/service' , async (req,res) =>{
      const query = {};
        const newService = req.body;
        const result= await serviceCollection.insertOne(newService);

        res.send(result);

     });

     // delete 
     app.delete('/service/:id',async (req,res)=>{
       const id = req.params.id;
       const query = { _id: ObjectId(id)};
       const result = await serviceCollection.deleteOne(query);
       res.send(result);

     })

  }
  finally{
     
  }
}
run().catch(console.dir);



app.get('/',(req,res)=>{
    res.send('Running Genius car Service')
});
app.listen(port,()=>{
    console.log('Listening to Port',port)
});