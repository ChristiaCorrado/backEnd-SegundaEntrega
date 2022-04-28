const mongoose = require('mongoose')


const CRUDmongoose = () =>{
    try{
        const URL = 'mongodb+srv://admin:1234@cluster0.d5rwo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
        let rta =  mongoose.connect(URL,{
            useNewUrlParser: true,
            useUnifiedTopology:true
        })
        console.log( `base mongo conectada`);
    }catch { err =>{
        console.log(err.message);
    }
        
    }
}

module.exports =  CRUDmongoose


