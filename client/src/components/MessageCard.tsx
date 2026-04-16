import type { Message } from "../types/types"

function MessageCard({ user_id, created_at, message }: Message){
    return (
        <div className="post-card">
            <div className="post-meta">
                <span className="author">👤 {user_id}</span>
                <span className="date">{new Date(created_at).toLocaleDateString()}</span>
            </div>
            <h3>{message}</h3>
        </div>
    )
}

export default MessageCard