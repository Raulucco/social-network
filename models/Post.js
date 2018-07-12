const Schema = require("mongoose").Schema;

const PostSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    text: {
        type: String,
        required: true
    },
    name: {
        type: String
    },
    avatar: {
        type: String
    },
    likes: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: "users"
        },
        date: {
            type: Date,
            require: true,
            default: Date.now
        }
    }],
    comments: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: "users"
        },
        text: {
            type: String,
            required: true
        },
        name: {
            type: String
        },
        avatar: {
            type: String
        },
        date: {
            type: Date,
            required: true,
            default: Date.now
        }
    }],
    date: {
        type: Date,
        required: true,
        default: Date.now
    }
});

module.exports = PostSchema;