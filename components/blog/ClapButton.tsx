"use client";

import { useState, useEffect } from "react";

interface ClapButtonProps {
  slug: string;
}

export default function ClapButton({ slug }: ClapButtonProps) {
  const [claps, setClaps] = useState(0);
  const [userClaps, setUserClaps] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Load claps from localStorage
  useEffect(() => {
    const storedClaps = localStorage.getItem(`claps-${slug}`);
    const storedUserClaps = localStorage.getItem(`user-claps-${slug}`);
    if (storedClaps) setClaps(parseInt(storedClaps));
    if (storedUserClaps) setUserClaps(parseInt(storedUserClaps));
  }, [slug]);

  const handleClap = () => {
    if (userClaps >= 50) return; // Max 50 claps per user

    const newClaps = claps + 1;
    const newUserClaps = userClaps + 1;

    setClaps(newClaps);
    setUserClaps(newUserClaps);
    setIsAnimating(true);

    localStorage.setItem(`claps-${slug}`, newClaps.toString());
    localStorage.setItem(`user-claps-${slug}`, newUserClaps.toString());

    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <button
      onClick={handleClap}
      className={`group flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-200 ${
        userClaps > 0
          ? "border-primary bg-primary/10 text-primary"
          : "border-border hover:border-primary hover:bg-primary/5 text-muted-foreground hover:text-primary"
      } ${isAnimating ? "scale-110" : "scale-100"}`}
      aria-label={`Clap for this article (${claps} claps)`}
    >
      <svg
        className={`w-5 h-5 transition-transform ${isAnimating ? "scale-125" : ""}`}
        viewBox="0 0 24 24"
        fill={userClaps > 0 ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
        />
      </svg>
      <span className="text-sm font-medium">
        {claps > 0 ? claps.toLocaleString() : "Clap"}
      </span>
      {userClaps > 0 && userClaps < 50 && (
        <span className="text-xs opacity-60">+{userClaps}</span>
      )}
    </button>
  );
}
