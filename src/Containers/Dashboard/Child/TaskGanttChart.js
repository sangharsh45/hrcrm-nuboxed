import React from 'react';
import { Gantt } from 'gantt-task-react';
import "gantt-task-react/dist/index.css";

const TaskGanttChart = () => {
  const data = [
    {
      taskId: "TIF86786106513252023",
      taskType: "Whatsapp",
      taskName: "whats",
      startDate: "2023-09-26T20:00:00Z",
      endDate: "2023-09-26T20:00:00Z",
    },
    
  ];

  
  const tasks = data.map(item => ({
    id: item.taskId,
    name: item.taskName,
    start: new Date(item.startDate),
    end: new Date(item.endDate),
  }));

  return (
    <div>
      <h2>Gantt Chart</h2>
      <Gantt tasks={tasks} />
    </div>
  );
};

export default TaskGanttChart;