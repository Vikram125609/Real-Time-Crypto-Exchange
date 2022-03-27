const mongoose = require('mongoose');
mongoose.connect(`mongodb://localhost:27017/Internship`,{useNewUrlParser: true,useUnifiedTopology: true})
.then(()=>{
    console.log(`Database connected successfully`);
})
.catch((error)=>{
    console.log(error);
});

module.exports = mongoose;


















 