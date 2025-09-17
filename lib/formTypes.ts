import { Instructor } from "./actions/instructor/create-course/findInstructors";

export type ActionData = {
  message: string;
  messageDetail?: string;
  errors: string[];
  data?: Instructor[] | Instructor;
};
