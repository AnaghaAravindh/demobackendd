const express = require("express");
const cors = require("cors")

const multer = require('multer')
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const plantmodel= require("./model/planttype");


const app = new express();

app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(cors());



app.get('/', (request, response) => {
    response.send("hi database")
})

app.post('/pnew', (request, response) => {
    new plantmodel(request.body).save()
    response.send("sucess")
})


app.get('/pview', async (request, response) => {
    var data = await plantmodel.find();
    response.send(data)
})

app.put('/updatestatus/:id', async (request, response) => {
    let id = request.params.id
    await plantmodel.findByIdAndUpdate(id, { $set: { Status: "INACTIVE" } })
    response.send("record deleted")
})


app.put('/pedit/:id', async (request, response) => {
    let id = request.params.id
    await plantmodel.findByIdAndUpdate(id, request.body)
    response.send("record updated")

})



app.listen(4005, (request, response) => {
    console.log("port is running in 4005")
})
