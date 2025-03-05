const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const moviesModel = require("./database/movies");

const url = "mongodb+srv://tharun_chaparala:WpLYO2nMmKSROOlg@cluster0.fn1ju6t.mongodb.net/book-my-show?retryWrites=true&w=majority";
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>console.log("connection established"));


app.get("/", (req,res)=>{
    res.json({"welcome": `to my backend software of movies`})
})

app.get("/movies", async (req,res)=>{
    const getMovies = await moviesModel.find();
    res.send(getMovies);
});

app.get("/movies/:id", async (req,res)=>{
    console.log(req.params);
    const {id} = req.params;
    const getMovies = await moviesModel.findOne({_id: id});
    if(getMovies===null){
        return res.json({"error": `no book found for the ISBN of ${id}`});
    };
    res.send(getMovies);
})

app.post("/movies", async(req,res)=>{
    console.log(req.body);
    const newMovie = await moviesModel.create(req.body);
    return res.json({"new movie": newMovie.title, "message":"new movie was added"});
})




app.listen(process.env.PORT || 8000,()=>{
    console.log(`app is running at port 8000`)
})