import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const PageSchema = new Schema({
    pageName:{
        type: String,
        unique:true,
        required: true
    },
    access:{
        type: String,
        required: true
    },
    pageSlug:{
        type: String,
        required: true
    },
    pageTitle:{
        type: String,
        required: true
    },
    pageContent:{
        type: String,
        required: true
    },
    created:{
        type: Date,
        default: Date.now
    }
});

const Page = mongoose.model('Page', PageSchema)

