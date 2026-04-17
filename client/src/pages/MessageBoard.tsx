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
      fetchMessages(); // refresh list
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <section className="posts">
        <h2>All Posts</h2>

        {isLoggedIn && (
          <form onSubmit={handlePostMessage} className="mb-4">
            <input
              className="border p-2 rounded"
              type="text"
              placeholder="Write a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button type="submit" className="ml-2">
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