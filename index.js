const express = require('express');
const cors = require('cors');
// const jwt = require('jsonwebtoken')
const { MongoClient, ServerApiVersion } = require('mongodb');
const { default: axios } = require('axios');

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
       const orderCollection = client.db('geniusCar').collection('order');

      //  const ACCESS_TOKEN_SECRET = 'd81a294df8cbb4c5eac8c2517060c6066bc173163ec0d09963718fd178e5d4f38f7fcbf4cac79b0c6ee83d30ab79146c5c651abf59f3ff0be90634b4310a61ad' 


      //  // AUTH 
      //  app.get('/login',async (req,res) =>{
      //   const user = req.body;
      //   const accessToken = jwt.sign(user.process.env.ACCESS_TOKEN_SECRET,{
      //     expiresIn: "id"
      //   })
      //   res.send(accessToken)
      //  })
       app.get('/service', async (req,res)=>{
        const query = {};
        const cursor = serviceCollection.find(query);
        const services = await cursor.toArray();
        res.send(services);
        // console.log(services)
     });

     app.get('/service/:id' , async (req,res)=>{
         const id =req.params.id;
         console.log(id)
         const query = {_id: ObjectId(id)};
         const service = await serviceCollection.findOne(query);
         res.send(service);
     })

     // post data

     app.post('/service' , async (req,res) =>{
    
        const newService = req.body;
        const result= await serviceCollection.insertOne(newService);
 
        res.send(result);

     });

    //  // delete 
     app.delete('/service/:id',async (req,res)=>{
       const id = req.params.id;
       const query = {_id: ObjectId(id)};
       const result = await serviceCollection.deleteOne(query);
       res.send(result);

     })

     // order collection apin 

     app.get('/order', async(req , res)=>{
       const email = req.query.email;
       
       const query={email: email};
       const cursor = orderCollection.find(query);
       const orders = await cursor. toArray();
       res.send(orders)
       console.log
     })

     // order collection api 
     app.post('/order', async(req,res) =>{
       const  order = req.body;
       
       const result = await orderCollection.insertOn(order);
       res.send(result);
       console.log(result)
       
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