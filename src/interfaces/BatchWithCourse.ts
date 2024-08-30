export interface BatchWithCourseInterface {
    _id: string;
    batch: string;
    division: string;
    course: {
        _id: string;
        course: string;
    };
}
