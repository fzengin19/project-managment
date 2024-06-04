export interface StatusClassMap {
  [key: string]: string;
}

export interface StatusTextMap {
  [key: string]: string;
}

export const PROJECT_STATUS_CLASS_MAP: StatusClassMap = {
  pending: "bg-amber-500",
  in_progress: "bg-blue-500",
  completed: "bg-green-500",
};

export const PROJECT_STATUS_TEXT_MAP: StatusTextMap = {
  pending: "Pending",
  in_progress: "In Progress",
  completed: "Completed",
};

export const TASK_STATUS_CLASS_MAP: StatusClassMap = {
  pending: "bg-amber-500",
  in_progress: "bg-blue-500",
  completed: "bg-green-500",
};

export const TASK_STATUS_TEXT_MAP: StatusTextMap = {
  pending: "Pending",
  in_progress: "In Progress",
  completed: "Completed",
};

export const TASK_PRIORITY_CLASS_MAP: StatusClassMap = {
  low: "bg-gray-600",
  medium: "bg-amber-600",
  high: "bg-red-600",
};

export const TASK_PRIORITY_TEXT_MAP: StatusTextMap = {
  low: "Low",
  medium: "Medium",
  high: "High",
};




export const USER_STATUS_CLASS_MAP: StatusClassMap = {
  pending: "bg-amber-500",
  in_progress: "bg-blue-500",
  completed: "bg-green-500",
};

export const USER_STATUS_TEXT_MAP: StatusTextMap = {
  pending: "Pending",
  in_progress: "In Progress",
  completed: "Completed",
};
