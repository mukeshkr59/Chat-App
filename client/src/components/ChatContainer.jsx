import React from "react";
import assets from "../assets/assets";
import { formatMessageTime } from "../lib/utils.js";
import { ChatContext } from "../../context/ChatContext.jsx";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import toast from "react-hot-toast";
// import { get } from "mongoose";

const ChatContainer = () => {
  const { messages, getMessages, setMessages, sendMessage, selectedUser, setSelectedUser } = useContext(ChatContext);
  const { authUser, onlineUsers } = useContext(AuthContext);

  const scrollEnd = React.useRef(null);

  const [input, setInput] = React.useState("");

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (input.trim() === "") return null;
    await sendMessage({ text: input.trim()});
    setInput("");
  };

  const handleSendImage = async (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith('image/')){
      toast.error("Please select a valid image file");
      return;
    }
    const reader = new  FileReader();
    reader.onloadend = async () => {
      await sendMessage({ image: reader.result });
      e.target.value = "";
    }
    reader.readAsDataURL(file);

    // const formData = new FormData();
    // formData.append("image", imageFile);
    // await sendMessages({ image: formData });
  };

  React.useEffect(() => {
    if(selectedUser){
      getMessages(selectedUser._id);
    }
  }, [selectedUser]);

  React.useEffect(() => {
    if(scrollEnd.current && messages){
      scrollEnd.current.scrollIntoView({ behavior: "smooth" });
    }    
  }, [messages]);

  return selectedUser ? (
    <div className="h-full overflow-scroll relative backdrop-blur-lg">
      {/* -------------Header---------------- */}
      <div className="flex items-center gap-3 py-3 mx-4 border-b border-stone-500">
        <img src={ selectedUser.profilePic || assets.avatar_icon} alt="" className="w-8 rounded-full" />
        <p className="flex-1 text-lg text-white flex items-center gap-2">
          {selectedUser.fullName}
          {onlineUsers.includes(selectedUser._id) && <span className="w-2 h-2 rounded-full bg-green-500"></span>}
        </p>
        <img
          onClick={() => setSelectedUser(null)}
          src={assets.arrow_icon}
          alt=""
          className="md:hidden max-w-7 cursor-pointer"
        />
        <img src={assets.help_icon} alt="" className="max-md:hidden max-w-5" />
      </div>
      {/*-------------- Chat Area --------------- */}
      <div className="flex flex-col h-[calc(100%-120px)] overflow-y-scroll p-4 pb-6 text-white">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex items-end gap-2 justify-end ${
              message.senderId !== authUser._id &&
              "flex-row-reverse"
            }`}>
            {message.image ? (
              <img
                src={message.image}
                alt=""
                className="max-w-[230px] border border-gray-700 rounded-lg overflow-hidden mb-8"
              />
            ) : (
              <p
                className={`p-2 max-w-[200px] md:text-sm font-light rounded-lg mb-8 break-all bg-violet-500/30 text-white
                     ${
                       message.senderId === authUser._id
                         ? "rounded-br-none"
                         : "rounded-bl-none"
                     }`}>
                {message.text}{" "}
              </p>
            )}
            <div className="text-center text-xs">
              <img
                src={
                  message.senderId === authUser._id
                    ? authUser.profilePic || assets.avatar_icon
                    : selectedUser?.profilePic || assets.avatar_icon
                }
                alt=""
                className="w-7 rounded-full"
              />
              <p className="text-gray-500">
                {formatMessageTime(message.createdAt)}
              </p>
            </div>
          </div>
        ))}
        <div ref={scrollEnd}></div>
      </div>

      <div className="absolute bottom-0 right-0 left-0 flex items-center p-3 gap-3">
        {/* ------------- Input Area ---------------- */}
        <input
          onChange={(e)=> setInput(e.target.value)}
          value={input}
          onKeyDown={(e)=> e.key === "Enter" ? handleSendMessage(e) : null}
          type="text"
          placeholder="Type a message..."
          className="flex-1 text-sm bg-[#8185B2]/10 border border-gray-600 rounded-full py-2 px-4 text-white outline-none placeholder:text-gray-400"
        />
        <input onChange={handleSendImage} type="file" id="image" accept="image/png, image/jpeg" hidden />
        <label htmlFor="image">
          <img
            src={assets.gallery_icon}
            alt="attach"
            className="w-5 mr-2 cursor-pointer"
          />
        </label>
        <img
          onClick={handleSendMessage}
          src={assets.send_button}
          alt="send"
          className="w-7 cursor-pointer"
        />
      </div>
    </div>
  ) : (
    <div className="h-full flex flex-col justify-center items-center gap-2 text-white px-4 text-center max-md:hidden">
      <img src={assets.logo_icon} alt="chat icon" className="max-w-16" />
      <h2 className="text-2xl font-semibold">Chat anytime, anywhere</h2>
      <p className="text-gray-400">
        {/* Choose a user from the left sidebar to view your conversation history
        and start a new chat. Connect and communicate with ease! */}
      </p>
    </div>
  );
};

export default ChatContainer;
