const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username : {type : String, required : true, unique : true}, // ask during registration
    password : {type : String, required : true}, // ask during registration
    email : {type : String, required : true, unique : true}, // ask during registration
    name : {type : String, required : true}, // ask during registration
    vfcode : {type : String, default : '0'},
    phone : {type : String, default : ''},
    address : {type : String, default : ''},
    zipCode : {type : String, default : ''},
    dateOfBirth : {type : String, default : ''},
    gender : {type : String, default : ''},
    linkedInURL : {type : String, default : ''},
    githubURL : {type : String, default : ''},
    profilePhotoURL : {type : String, default : ''},
    tagLine : {type : String, default : ''},
    description : {type : String, default : ''},
    resumeURL : {type : String, default : ''},
    skills : {type : Array, default : []},
    education : {type : Array, default : []},
    experience : {type : Array, default : []},
    projects : {type : Array, default : []},
    blogs : {type : Array, default : []},
    myPreferences : {type : Array, default : []}
});

const User = mongoose.model('users', userSchema, 'users');

module.exports = {User};

/* 

Object definition for skills
{
    skillName,
    skillLevel
}

Object definition for education
{
    course,
    institution,
    passingYear,
    score
}

Object definition for experience
{
    post,
    organization,
    yearJoined
}

Object definition for projects
{
    projectTitle,
    description,
    imageURL,
    projectLink
}

Object definition for blogs
{
    title,
    description,
    imageURL
}

Object definition for preferences
{
    
}

*/
