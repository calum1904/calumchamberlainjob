const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bcrypt = require('bcrypt-nodejs')

//Create Jobs Schema and Model

const UserSchema = mongoose.Schema({
	firstName:{
		type: String,
	},
	lastName:{
		type: String,
	},
	email:{
		type: String,
		required: [true, 'Please provide your email']
	},
	password:{
		type: String,
		required: [true, 'Please insert a Password']
	}

});

UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

/*UserSchema.methods.validPassword = function(password) {
	if(password == this.password)
    	return true;
    return false;
};*/

const User = mongoose.model('user', UserSchema);



module.exports = User;