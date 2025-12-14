import Message from "../models/message.js";
import User from '../models/User.js';
import cloudinary from "../lib/cloudinary.js";
import { io, userSocketMap } from "../server.js";



// get all user except logged in user
export const getUsersForSidebar = async (req, res) => {
    try {
        const users = await User.find({ _id: { $ne: req.user._id } }).select('-password');

        // count number of messages not seen from each user
        const unseenMessages = {};
        const promises = users.map(async (user) => {
            const message = await Message.find({ senderId: user._id, receiverId: req.user._id, seen: false });

            if(message.length > 0) {
                unseenMessages[user._id] = message.length;
            }
        });

        await Promise.all(promises);



        return res.status(200).json({ success:true, message: 'Users fetched successfully', data: users });
    } catch (err) {
        console.error('Error fetching users for sidebar:', err.message);
        return res.status(500).json({ success:false, message: 'Server error fetching users' });
    }
};

// get all messages for selected user

export const getMessages = async (req, res) => {
    try {
        const { id:selectedUserId } = req.params;
        const myId = req.user._id;

        const messages = await Message.find({
            $or: [
                { senderId: myId, receiverId: selectedUserId },
                { senderId: selectedUserId, receiverId: myId }
            ]
        }).sort({ createdAt: 1 });
        await Message.updateMany(
            { senderId: selectedUserId, receiverId: myId, seen: false },
            { $set: { seen: true } }
        );
        return res.status(200).json({ success:true, message: 'Messages fetched successfully', data: messages });
    } catch (error) {
        
        console.error('Error fetching messages:', err.message);
        return res.status(500).json({ success:false, message: 'Server error fetching messages' });
    }
};

// api to mark messages as seen using message ids
export const markMessagesAsSeen = async (req, res) => {
    try {
        const { id } = req.params;
        await Message.findByIdAndUpdate(id, { seen: true });
        return res.status(200).json({ success:true, message: 'Messages marked as seen' });
    }
    catch (error) {
        console.error('Error marking messages as seen:', err.message);
        return res.status(500).json({ success:false, message: 'Server error marking messages as seen' });
    }
};

// send message to a selected user
export const sendMessage = async (req, res) => {
     try {
    const { text, image } = req.body;
    const receiverId = req.params.id;
    const senderId = req.user._id;

    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = await Message.create({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    // Emit the new message to the receiver's socket
    const receiverSocketId = userSocketMap[receiverId];

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.json({ success: true, newMessage });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  } 
};