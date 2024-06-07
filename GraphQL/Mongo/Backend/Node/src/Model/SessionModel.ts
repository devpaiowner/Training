import mongoose,{  Schema } from 'mongoose';

const UserSchema = new mongoose.Schema({
    Userid: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true

    }
}, { timestamps: true });

const SessionModel = mongoose.model("Session", UserSchema);
export default SessionModel;
