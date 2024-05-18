import Chats from "@/components/ChatComp/Chats";
import Users from "@/components/ChatComp/Users";

const ChatHome = () => {
  return (
    <div className="main-container">
      <div className="w-1/3 max-lg:w-1/2 max-md:w-full">
        <Chats />
      </div>
      <div className="w-2/3 max-lg:w-1/2 max-md:hidden">
        <Users />
      </div>
    </div>
  );
};

export default ChatHome;
