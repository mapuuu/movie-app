import mongoose from 'mongoose';

export const connectDB = async () => {
  mongoose.set('strictQuery', false);
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex : true,
    });

    console.log('Connected to MongoDB successfully');
  } catch (error) {
    console.log(`Error connecting to Mongo DB : ${error.message}`);
    process.exit(1);
  }
};
// const connectDB = ()=>{
//     mongoose.connect(process.env.MONGO_URI,{useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex : true}).then ((data) =>{
//         console.log(`Mongodb connected to MongoDB successfully`);

//     }
//     ).catch((err)=>{
//         console.log(err);
//     })
// }

// export default connectDB();
