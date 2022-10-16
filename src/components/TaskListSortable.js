import React from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";

export function TaskListSortable({
  itemCSS,
  deleteTask,
  completeTask,
  tasks,
  sensors,
  handleDragCancel,
  handleDragEnd,
  handleDragStart,
  listStyle,
}) {
  function generateView(listStyle) {
    if (listStyle === "completed") {
      return (
        <SortableContext
          strategy={verticalListSortingStrategy}
          items={tasks.map((t) => t.id)}
          className="divide-y-2 divide-gray-100 max-w-xl bg-slate-600"
        >
          {tasks
            .filter((t) => t.status === "completed")
            .map((t, i) => (
              <SortableItem
                key={t.id}
                task={t}
                itemCSS={itemCSS}
                deleteTask={deleteTask}
                completeTask={completeTask}
              />
            ))}
        </SortableContext>
      );
    } else if (listStyle === "pending") {
      return (
        <SortableContext
          strategy={verticalListSortingStrategy}
          items={tasks.map((t) => t.id)}
          className="divide-y-2 divide-gray-100 max-w-xl bg-slate-600"
        >
          {tasks
            .filter((t) => t.status === "pending")
            .map((t, i) => (
              <SortableItem
                key={t.id}
                task={t}
                itemCSS={itemCSS}
                deleteTask={deleteTask}
                completeTask={completeTask}
              />
            ))}
        </SortableContext>
      );
    } else {
      return (
        <SortableContext
          strategy={verticalListSortingStrategy}
          items={tasks.map((t) => t.id)}
          className="divide-y-2 divide-gray-100 max-w-xl bg-slate-600"
        >
          {tasks.map((t, i) => (
            <SortableItem
              key={t.uuid}
              task={t}
              itemCSS={itemCSS}
              deleteTask={deleteTask}
              completeTask={completeTask}
            />
          ))}
        </SortableContext>
      );
    }
  }
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      {generateView(listStyle)}
    </DndContext>
  );
}
