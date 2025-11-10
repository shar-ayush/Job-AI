import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        minLength: 6
    },
    profileImage:{
        type: String,
        default: ""
    }
},{ timestamps: true });
// hashing password before saving can be added here as a pre-save hook using bcrypt before saving to db
// 123456 => wehfbehbfw229u
userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();

    const salt = await bcrypt.genSalt(10);
    this.password =  await bcrypt.hash(this.password, salt);

    next();
})

// Compare password method
userSchema.methods.comparePassword = async function(userPassword){
    return await bcrypt.compare(userPassword, this.password);
}


const User = mongoose.model("User", userSchema);

export default User;
