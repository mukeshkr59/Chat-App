import React from "react";
import assets, { messagesDummyData } from "../assets/assets";
import {formatMessageTime} from "../lib/utils.js";

const ChatContainer = ({ selectedUser, setSelectedUser }) => {
  const scrollEnd = React.useRef(null);

  React.useEffect(() => {
    scrollEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedUser]);
  return selectedUser ? (
    <div className="h-full overflow-scroll relative backdrop-blur-lg">
      {/* -------------Header---------------- */}
      <div className="flex items-center gap-3 py-3 mx-4 border-b border-stone-500">
        <img src={assets.profile_martin} alt="" className="w-8 rounded-full" />
        <p className="flex-1 text-lg text-white flex items-center gap-2">
          Martin Johnson
          <span className="w-2 h-2 rounded-full bg-green-500"></span>
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
        {messagesDummyData.map((message, index) => (
          <div
            key={index}
            className={`flex items-end gap-2 justify-end ${
              message.senderId !== "680f50e4f10f3cd28382ecf9" &&
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
                       message.senderId === "680f50e4f10f3cd28382ecf9"
                         ? "rounded-br-none"
                         : "rounded-bl-none"
                     }`}>
                {message.text}{" "}
              </p>
            )}
            <div className="text-center text-xs">
              <img
                src={
                  message.senderId === "680f50e4f10f3cd28382ecf9"
                    ? assets.avatar_icon
                    : assets.profile_martin
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
    </div>
  ) : (
    <div className="h-full flex flex-col justify-center items-center gap-2 text-white px-4 text-center max-md:hidden">
      <img src={assets.logo_icon} alt="chat icon" className="max-w-16" />
      <h2 className="text-2xl font-semibold">Chat anytime, anywhere</h2>
      <p className="text-gray-400">
        Choose a user from the left sidebar to view your conversation history
        and start a new chat. Connect and communicate with ease!
      </p>
    </div>
  );
};

export default ChatContainer;
