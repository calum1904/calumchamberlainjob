const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Jobs Schema and Model

const JobsSchema = new Schema({
	title:{
		type: String,
		required: [true, 'The title is required']
	},
	category:{
		type: String,
		required: [true, 'The category is required']
	},
	location:{
		type: String,
		required: [true, 'Please enter the closest location']
	},
	description:{
		type: String,
		required: [true, 'Please add some information about the job']
	},
	apply:{
		type: String,
		required: [true, 'How to apply is required']
	},
	company:{
		type: String,
		required: [true, 'Please enter your company name']
	},
	website:{
		type: String,
		required: [false]
	},
    userid:{
        type:String,
        required: [true]
    },
    createdOn:{
        type:String,
        required: [true]
    }

});

const Job = mongoose.model('job', JobsSchema);

module.exports = Job;