import { Schema, model } from "mongoose"

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: [true, "First name is required"]
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: [true, "email already exist"]
    },
    password: {
        type: String,
        require: [true, "Password is required"]
    },
    profileImageUrl: {
        type: String
    },
    role: {
        type: String,
        enum: ["AUTHOR", "USERS", "ADMIN"],
        required: [true, "{Value} is an invalid rout"]
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
    strict: 'throw',
    versionKey: false
})

// create model
export const UserTypeModel = model("user", UserSchema)