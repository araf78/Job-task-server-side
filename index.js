const express = require('express');
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port  = process.env.PORT || 5000;

const cors = require('cors');
require('dotenv').config();

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ix9li.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        await client.connect();
        console.log('db connected');

        const taskCollection = client.db('StoreTekh').collection('tasks');
        // post task 
        app.post('/addtodo', async (req, res) =>{
            const tasks = req.body;
            const result = await taskCollection.insertOne(tasks);
            res.send(result);
        });
        // get task 
        app.get('/addtodo', async (req, res)=>{
            const query = {};
            const cursor = taskCollection.find(query);
            const tasks = await cursor.toArray();
            res.send(tasks)
        });

        app.get('/completedtodos', async (req, res) =>{
            const query = {isCompleted : true};
            const cursor = await taskCollection.find(query).toArray();
            res.send(cursor);
        });
        

        app.put('/addtodo/:id', async (req, res) => {
            const id = req.params.id;
            const task = req.body;
            const filter = { _id: ObjectId(id) };
            console.log(filter, task)
            const options = {};
            const updateDoc = {
              $set: {isCompleted : task.isCompleted},
            };
            const result = await taskCollection.updateOne( filter, updateDoc, options);
           
            res.send(result );
          });

          app.put('/edit/:id', async(req, res)=>{
            const id = req.params.id;
            const editTask = req.body;
            const filter = { _id : ObjectId(id)};
            const options = {};
            const updateDoc = {
                $set : {text : editTask.text},
            };
            const result = await taskCollection.updateOne(filter, updateDoc, options);
            res.send(result)
          })
        app.delete('/addtodo/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) };
            
            const result = await taskCollection.deleteOne( filter);
           
            res.send(result );
          });
    }
    finally{

    }
}
run().catch(console.dir);






app.get("/", (req, res) => {
    res.send("Job-Task project is Running")
})

app.listen(port, ()=>{
    console.log('Job-Task project is Listening')
})