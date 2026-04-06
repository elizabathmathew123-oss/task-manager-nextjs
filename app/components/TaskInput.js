"use client";
import { useState } from "react";

export default function TaskInput({ onAdd }) {
    const [title, setTitle] = useState("");

    return (
        <div className="flex gap-2 mb-4">
            <input
                className="flex-1 border px-4 py-2 rounded-xl"
                placeholder="Add task..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <button
                onClick={() => {
                    if (!title) return;
                    onAdd(title);
                    setTitle("");
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded-xl"
            >
                Add
            </button>
        </div>
    );
}