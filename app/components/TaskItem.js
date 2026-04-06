export default function TaskItem({ task, onDelete }) {
    return (
        <div className="flex justify-between bg-white p-3 rounded-xl shadow mb-2">
            <span>{task.title}</span>
            <button
                onClick={() => onDelete(task.id)}
                className="text-red-500"
            >
                Delete
            </button>
        </div>
    );
}