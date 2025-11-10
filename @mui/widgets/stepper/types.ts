import React from "react";

export interface StepperProps {
  icons?: Array<React.ReactNode>
}

export type IconType = {
  [index: string | number]: React.ReactElement<unknown>
}