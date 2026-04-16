import type { Message } from "../types/types"

function MessageCard({ username, created_at, message,likes }: Message){
    return (
        <div className="w-2xl bg-gray-50 m-2.5 p-2 rounded-2xl shadow-xl hover:scale-105 transition-all">
            <div className="post-meta">
                <span className="author">👤{username} </span>
                <span className="date">{new Date(created_at).toLocaleDateString()}</span>
            </div>
            <h3>{message}</h3>
            <h3>{likes}</h3>
        </div>
    )
}

export default MessageCard