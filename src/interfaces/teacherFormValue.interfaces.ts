export interface TeacherFormValues {
    firstName: string;
    lastName:string
    address: string;
    email: string;
    subject: string;
    yearsOfExperience: string|number;
    image: File | null;
  }