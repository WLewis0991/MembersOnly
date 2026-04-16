 import type { Message } from "../types/types"
 import MessageCard from "../components/MessageCard"
 import { useState,useEffect } from "react"
 
 export default function MessageBoard(){

    const [messages, setMessages] = useState<Message[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const API_URL = import.meta.env.VITE_API_URL

      const fetchMessages = async (): Promise<void> => {
    try {
      const res = await fetch(`${API_URL}/api/messages`)
      console.log("RAW RESPONSE:", res)
      if (!res.ok) throw new Error('Failed to fetch messages')
      const data: Message[] = await res.json()
      setMessages(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

    useEffect(() => {
        console.log("Fetching messages...")
    fetchMessages()
  }, [])

  


    return(<>
        <div className="flex flex-col items-center justify-center ">
            <h1> Members Only 🔐</h1>
                  <section className="posts">
                    <h2>All Posts</h2>
                    {loading && <p className="status">Loading posts...</p>}
                    {error && <p className="status error">Error: {error}</p>}
                    {!loading && messages.length === 0 && (
                    <p className="status">No messages yet. Be the first!</p>
                    )}
                    {messages.map((message: Message) => (
                    <MessageCard key={message.id} {...message} />
                    ))}
                </section>
            
        </div>
    </>)
 }