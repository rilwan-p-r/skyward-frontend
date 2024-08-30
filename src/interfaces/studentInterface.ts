import { BatchInterface } from "./BatchInterface";

export interface StudentInterface {
  _id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  gender: string;
  address: string;
  email: string;
  phoneNumber: string;
  emergencyContact: string;
  bloodGroup?: string;
  admissionDate: Date;
  imageUrl: string;
  verified: boolean;
  password: string;
  batchId:BatchInterface;
}