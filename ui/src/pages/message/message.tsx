import { useEffect, useRef, useState } from "react";
import { useMessageStore } from "../../store/message/use-message-store";

const Message = () => {
  const [newMessage, setNewMessage] = useState("");
  const [selectedUserId, setSelectedUserId] = useState(null);
  const {
    contacts,
    messages,
    getContacts,
    getMessagesByUserId,
    sendMessage,
    clearMessages,
    subscribeToMessages,
    unsubscribeFromMessages,
    loading,
    error,
  } = useMessageStore();
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    getContacts();
  }, []);

  useEffect(() => {
    if (!selectedUserId) {
      return;
    }

    let cancelled = false;
    const initMessages = async () => {
      clearMessages();
      await getMessagesByUserId(selectedUserId);

      if (!cancelled) {
        subscribeToMessages();
      }
    };

    initMessages();

    return () => {
      cancelled = true;
      unsubscribeFromMessages();
    };
  }, [
    selectedUserId,
    getMessagesByUserId,
    subscribeToMessages,
    clearMessages,
    unsubscribeFromMessages,
  ]);

  const handleSelectContact = async (userId: string) => {
    setSelectedUserId(userId);
    clearMessages();
    await getMessagesByUserId(userId);
  };

  const handleSend = async () => {
    if (!newMessage.trim()) return;
    await sendMessage(selectedUserId, { content: newMessage });
    setNewMessage("");
  };

  useEffect(() => {
    if (messages.length && messagesContainerRef.current) {
      const el = messagesContainerRef.current;
      el.scrollTop = el.scrollHeight;
    }
  }, [messages]);

  return (
    <>
      <div className="flex flex-col w-full bg-white">
        <h1 className="text-3xl font-bold mb-3">Messages</h1>
        <div className="flex items-center justify-center w-full h-[600px] border rounded">
          <div className="w-96 h-full border-r scrollbar-hidden overflow-y-auto rounded">
            <h2 className="text-2xl text-center font-bold mb-3 py-3 top-0 sticky bg-white">
              Contacts
            </h2>
            <ul className="flex flex-col gap-2">
              {contacts.map((contact) => (
                <li
                  key={contact.id}
                  onClick={() => handleSelectContact(contact.id)}
                  className={`flex items-center gap-2 px-5 py-2 cursor-pointer hover:bg-gray-200 ${
                    selectedUserId === contact.id ? "bg-gray-100" : ""
                  }`}
                >
                  <div className="w-10 h-10 rounded-full bg-indigo-500"></div>
                  <span className="text-sm">{contact.name}</span>
                  <span className="text-xs text-gray-500">
                    {contact.username}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col w-full h-full">
            <div
              ref={messagesContainerRef}
              className="flex flex-col flex-1 scrollbar-hidden overflow-y-auto p-4"
            >
              {loading && <p className="text-gray-500">Loading...</p>}
              {error && <p className="text-red-500">{error}</p>}
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`mb-2 flex ${
                    msg.senderId === selectedUserId
                      ? "justify-start"
                      : "justify-end"
                  }`}
                >
                  <div
                    className={`px-3 py-2 rounded-lg max-w-xs ${
                      msg.senderId === selectedUserId
                        ? "bg-gray-200"
                        : "bg-indigo-500 text-white"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 p-3 border-t">
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 border px-3 py-2 rounded focus:outline-none focus:border-indigo-500"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
              <button
                onClick={handleSend}
                className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 cursor-pointer"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Message;
