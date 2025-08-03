import mongoose from 'mongoose';


const connectDB = async () => {
  try {
    mongoose.connection.on('connected', () => {
      console.log(' Database connected');
    });

    await mongoose.connect(`${process.env.MONGODB_URL}mydoctor`);


  } catch (error) {
    console.error(' Database connection failed:', error.message);
    process.exit(1); // exit the process on failure
  }
};

export default connectDB;
