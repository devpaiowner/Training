import mongoose,{  Document } from 'mongoose';



interface IUser extends Document {

    email: string;
    password: string;
    phone_number: string;
    name: string;
    dob: Date; // Ensure dob is of type Date
    confirm_password: string;
}


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true

    },
    phone_number: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true

    },
    dob: {
        type: Date,
        required: true
    },
    confirm_password: {
        type: String,
        required: true

    },
    profile_image: {
        type: String,
        required: false

    },
}, { timestamps: true });

const UserModel = mongoose.model("User", UserSchema);
export default UserModel;
