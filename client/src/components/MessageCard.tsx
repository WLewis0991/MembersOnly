import type { Message } from "../types/types";

type Props = Message & {
  isLoggedIn: boolean;
};

function MessageCard({ username, created_at, message,  isLoggedIn }: Props) {
  return (
    <div className="w-full max-w-2xl border border-gray-200 m-2.5 p-4 rounded-2xl shadow-lg hover:scale-105 transition-all">
    <div className="post-meta flex justify-between items-center">
        {isLoggedIn && (
        <span className="author">👤{username} </span>
        )}

        <span className="date text-sm text-gray-500">
        {new Date(created_at).toLocaleDateString()}
        </span>
    </div>

    <div className="mt-3">
        <h3 className="text-base wrap-break-words">{message}</h3>
    </div>
    </div>
  );
}

export default MessageCard;