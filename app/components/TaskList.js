import TaskItem from "./TaskItem";

export default function TaskList({ tasks, onDelete }) {
    return (
        <div>
            {tasks.map((task) => (
                <TaskItem key={task.id} task={task} onDelete={onDelete} />
            ))}
        </div>
    );
}