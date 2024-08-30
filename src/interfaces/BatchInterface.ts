import { StudentInterface } from "./studentInterface";
import { CourseInterface } from "./CourseInterface";
import { TeacherInterface } from "./teacherInterface";

export interface BatchInterface {
    students: StudentInterface[];
    _id: string;
    courseId:CourseInterface;
    batch: string;
    division: string;
    teacherId: TeacherInterface;
    noOfStudentsCapacity: number;
  }
  