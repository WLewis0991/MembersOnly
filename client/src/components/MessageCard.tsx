import type { Message } from "../types/types";

type Props = Message & {
  isLoggedIn: boolean;
};

function MessageCard({ username, created_at, message, likes, isLoggedIn }: Props) {
  return (
    <div className="w-2xl border border-gray-200 m-2.5 p-2 rounded-2xl shadow-xl hover:scale-105 transition-all">
      <div className="post-meta">
        {isLoggedIn && (
          <span className="author">👤{username} </span>
        )}
        <span className="date">
          {new Date(created_at).toLocaleDateString()}
        </span>
      </div>

      <h3>{message}</h3>
      <h3>{likes}</h3>
    </div>
  );
}

export default MessageCard;