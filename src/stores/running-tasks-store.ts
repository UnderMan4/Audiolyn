// import { create } from "zustand";

export namespace RunningTasksStore {
   export type Values = {
      tasks: Set<Task>;
   };
   export type Functions = {
      addTask: (task: Task) => void;
      removeTask: (taskId: string) => void;
      updateTaskProgress: (
         taskId: string,
         progress: number,
         maxProgress?: number
      ) => void;
      clearTasks: () => void;
   };
   export type Store = Values & Functions;

   export type Task = {
      id: string;
      name: string;
      isUndefined?: boolean;
      progress?: number;
      maxProgress?: number;
   };
}

// export const useRunningTasksStore = create<RunningTasksStore.Store>(
//    (set) => ({})
// );
