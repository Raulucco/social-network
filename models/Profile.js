const schema = require('mongoose').Schema;
const ProfileSchema = new Schema({
    user: {
        type: Schema.type.ObjectId,
        ref: 'users'
    },
    handle: {
        type: String,
        required: true,
        max: 400
    },
    company: {
        type: String
    },
    website: {
        type: String
    },
    location: {
        type: String
    },
    status: {
        type: String,
        required: true
    },
    skills: {
        type: [String],
        required: true
    },
    bio: {
        type: String
    },
    githubname: {
        type: String
    },
    experience: [{
            title: {
                type: String,
                required: true
            }
        },
        {
            company: {
                type: String,
                required: true
            }
        },
        {
            location: {
                type: String,
                required: true
            }
        },
        {
            fromDate: {
                type: Date,
                required: true
            }
        },
        {
            toDate: {
                type: Date
            }
        },
        {
            isCurrent: {
                type: Boolean,
                default: false
            }
        },
        {
            description: {
                type: String
            }
        }
    ],
    education: [{
            degree: {
                type: String,
                required: true
            }
        },
        {
            school: {
                type: String,
                required: true
            }
        },
        {
            location: {
                type: String,
                required: true
            }
        },
        {
            fromDate: {
                type: Date,
                required: true
            }
        },
        {
            toDate: {
                type: Date
            }
        },
        {
            isCurrent: {
                type: Boolean,
                default: false
            }
        },
        {
            description: {
                type: String
            }
        }
    ],
    social: {
        youtube: {
            type: String
        },
        linkedin: {
            type: String
        },
        twitter: {
            type: String
        },
        facebook: {
            type: String
        }
    },
    likes: [{
        post: {
            type: Schema.Types.ObjectId,
            ref: "posts"
        },
        date: {
            type: Date,
            require: true,
            default: Date.now
        }
    }],
    date: {
        type: Date,
        require: true,
        default: Date.now
    }
});

module.exports = mongoose.model('Profile', ProfileSchema);