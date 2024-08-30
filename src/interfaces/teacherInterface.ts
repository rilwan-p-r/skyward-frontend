export interface TeacherInterface {
    _id:string
    firstName: string;
    lastName: string;
    address: string;
    email: string;
    subject: string;
    yearsOfExperience: number|string;
    imageUrl: string;
    verified: boolean;
    password: string;
  }