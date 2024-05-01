const mongoose = require("mongoose")

const connectDatabase = () => {
    console.log("Wait connecting to the database")

    mongoose.connect('mongodb+srv://beehive:beehive@cluster0.npdu8oq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', 
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Atlas Connected'))
    .catch((error) => console.log(error))
}

module.exports = connectDatabase;