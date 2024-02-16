import mongoose from "mongoose"

const connectToDatabase = async() => {
    try {
        const connection = await mongoose.connect('mongodb+srv://RemindMongodb:9rOU7P6nxBdrD6bD@remindme.1jvytd6.mongodb.net/')
        if(connection){
            console.log('Connection established')
        }
    } catch (error) {
        console.log(" fail to connect with error -> ", error)
        throw error;
    }
}

export default connectToDatabase;