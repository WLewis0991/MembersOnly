import type { Message } from "../types/types";
import MessageCard from "../components/MessageCard";
import { useState, useEffect } from "react";


export default function MessageBoard() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [newMessage, setNewMessage] = useState("");

  const API_URL = import.meta.env.VITE_API_URL;

  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  const fetchMessages = async (): Promise<void> => {
    try {
      const res = await fetch(`${API_URL}/api/messages`);
      if (!res.ok) throw new Error("Failed to fetch messages");

      const data: Message[] = await res.json();
      setMessages(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  async function handlePostMessage(e: React.FormEvent) {
    e.preventDefault();

    if (!newMessage.trim()) return;

    try {
      const res = await fetch(`${API_URL}/api/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message: newMessage }),
      });

      if (!res.ok) throw new Error("Failed to post message");

      setNewMessage("");
      fetchMessages();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center px-4 w-full">
      <section className="w-full max-w-3xl">

        {isLoggedIn && (
          <form
            onSubmit={handlePostMessage}
            className="mb-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2 p-5 w-full"
          >
            <input
              className="border border-gray-300 p-2 rounded w-full"
              type="text"
              placeholder="Write a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />

            <button
              type="submit"
              className="bg-blue-500 text-white rounded p-2 hover:bg-gray-700 disabled:opacity-50 transition-colors w-full sm:w-auto"
            >
              Post
            </button>
          </form>
        )}

        {loading && <p className="status">Loading posts...</p>}
        {error && <p className="status error">Error: {error}</p>}

        {!loading && messages.length === 0 && (
          <p className="status">No messages yet. Be the first!</p>
        )}

        {messages.map((message: Message) => (
          <MessageCard key={message.id} {...message} isLoggedIn={isLoggedIn} />
        ))}
      </section>
    </div>
  );
}