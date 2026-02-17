"use client";

import { useState, useEffect } from "react";

interface Comment {
  id: string;
  name: string;
  content: string;
  timestamp: number;
}

interface CommentSectionProps {
  slug: string;
}

export default function CommentSection({ slug }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  // Load comments from localStorage with validation
  useEffect(() => {
    try {
      const storedComments = localStorage.getItem(`comments-${slug}`);
      if (storedComments) {
        const parsed = JSON.parse(storedComments);
        if (Array.isArray(parsed)) {
          const valid = parsed.filter(
            (c: unknown): c is Comment =>
              typeof c === "object" && c !== null &&
              typeof (c as Comment).id === "string" &&
              typeof (c as Comment).name === "string" &&
              typeof (c as Comment).content === "string" &&
              typeof (c as Comment).timestamp === "number"
          );
          setComments(valid);
        }
      }
    } catch {
      localStorage.removeItem(`comments-${slug}`);
    }
  }, [slug]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !content.trim()) return;

    const newComment: Comment = {
      id: Date.now().toString(),
      name: name.trim(),
      content: content.trim(),
      timestamp: Date.now(),
    };

    const updatedComments = [newComment, ...comments];
    setComments(updatedComments);
    localStorage.setItem(`comments-${slug}`, JSON.stringify(updatedComments));

    // Reset form
    setContent("");
    setIsExpanded(true);
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff / (1000 * 60));

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <div className="mt-16 pt-8 border-t border-border">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
          <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          Responses
          {comments.length > 0 && (
            <span className="ml-2 px-2 py-0.5 text-sm bg-primary/10 text-primary rounded-full">
              {comments.length}
            </span>
          )}
        </h3>
        {comments.length > 0 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            {isExpanded ? "Collapse" : "Expand"}
          </button>
        )}
      </div>

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="bg-muted/50 rounded-xl p-4 border border-border">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={100}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
              required
            />
          </div>
          <div className="mb-4">
            <textarea
              placeholder="Share your thoughts..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              maxLength={2000}
              rows={3}
              className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={!name.trim() || !content.trim()}
              className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Respond
            </button>
          </div>
        </div>
      </form>

      {/* Comments List */}
      {comments.length > 0 && isExpanded && (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="bg-card rounded-xl p-4 border border-border"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-semibold">
                  {comment.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-medium text-foreground">{comment.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatDate(comment.timestamp)}
                  </p>
                </div>
              </div>
              <p className="text-foreground/90 leading-relaxed pl-13">
                {comment.content}
              </p>
            </div>
          ))}
        </div>
      )}

      {comments.length === 0 && (
        <div className="text-center py-8">
          <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-muted flex items-center justify-center">
            <svg className="w-6 h-6 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <p className="text-muted-foreground text-sm">
            Be the first to share your thoughts!
          </p>
        </div>
      )}
    </div>
  );
}
