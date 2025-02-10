const {User} = require('../models/user');
const {sendMessageMail} = require('../utils/helperFunctions');

const getProfileData = async (req, res)=> {
    try{
        const id = req.id;
        const data = await User.findById({_id : id});
        res.status(200).json(data);
    }
    catch(error){
        res.status(500).json({ message : "Internal Server Error" });
    }
}

const getPortfolio = async (req, res)=> {
    try{
        const username = req.params.username;
        const data = await User.findOne({username});
        res.status(200).json(data);
    }
    catch(error){
        res.status(500).json({ message : "Internal Server Error" });
    }
}

const updateProfile = async (req, res)=> {
    try{
        const data = req.body;
        const id = data._id;
        await User.findByIdAndUpdate(id, data, {new : true});
        res.status(200).json({ message : "Portfolio updated successfully" });
    }
    catch(error){
        res.status(500).json({ message : "Internal Server Error" });
    }
}

const sendMessage = async (req, res)=> {
    try{
        const {name, email, messageText, receiver} = req.body;
        const user = await User.findOne({username : receiver});
        sendMessageMail(name, email, messageText, user.email);
        res.status(200).json({ message : 'Message Sent' });
    }
    catch(error){
        res.status(500).json({ message : "Internal Server Error" });
    }
}

module.exports = {getProfileData, updateProfile, getPortfolio, sendMessage};