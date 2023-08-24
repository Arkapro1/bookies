import mongoose from "mongoose";

const connect=async()=>{
    try { 
        await mongoose.connect(process.env.MONGO,{  
            useNewUrlParser:true,
            useUnifiedTopology:true
        });
        console.log("connected to db");
    } catch (error) {
        console.log(error);
        throw new Error("connection failed");
    }
};

export default connect;