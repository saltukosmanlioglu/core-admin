import React from "react";

export interface StepperProps {
  icons?: Array<React.ReactNode>
}

export type IconType = {
  [index: string | number]: React.ReactElement<unknown>
}

export type SubTask = {
  title: string;
  description?: string;
  tags?: string[];
};

export type Item = {
  title: string;
  description?: string;
  tags?: string[];
  subtasks?: SubTask[];
};