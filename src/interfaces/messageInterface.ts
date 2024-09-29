interface SenderInfo {
  _id: string;
  firstName: string;
  lastName: string;
  imageUrl: string;
}

export interface MessageInterface {
  fileUrls: any;
  _id: string;
  text: string;
  batchId: string;
  createdAt: string;
  studentId?: SenderInfo;
  teacherId?: SenderInfo;
}