import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import AdminSidebar from "../../components/admin/sidebar/AdminSidebarItems";
import { CreateCourseForm } from "../../components/admin/course/createCourseForm";
import { getCourseList } from "../../api/admin/getCourseList";
import { toast } from "react-toastify";
import { CourseInterface } from "../../interfaces/CourseInterface";

const CourseList = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [courses, setCourses] = useState<CourseInterface[]>([])

  const fetchCourses = async () => {
    try {
      const response = await getCourseList()
      setCourses(response)
    } catch (error) {
      console.log(`Failed to fetch courses ${error}`);
      toast.error('Failed to fetch courses')
    }
  }

  useEffect(() => {
    fetchCourses()
  }, [])


  const handleCreateCourse = () => setShowCreateForm(true);
  const handleCloseForm = () => setShowCreateForm(false);

  return (
    <>
      <div className="flex h-screen bg-gray-100">
        <AdminSidebar />
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Course Listings</h2>
          <div className="flex justify-between mb-6">
            <div></div>
            <button
              onClick={handleCreateCourse}
              className="flex items-center px-4 py-2 bg-black text-white rounded-md hover:bg-gray-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              <FaPlus className="mr-2" />
              Create New Course
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div
                key={course._id}
                className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-lg"
              >
                <div className="bg-black h-2"></div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-black mb-2">
                    {course.course}
                  </h3>
                  <p className="text-gray-400 mb-4">
                    {course.description}
                  </p>
                  <div className="space-y-2">
                    {course.subjects.map((subject) => (
                      <span
                        key={subject}
                        className="inline-block bg-black text-white text-xs font-semibold px-2 py-1 rounded mr-1"
                      >
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showCreateForm && <CreateCourseForm onClose={handleCloseForm} fetchCourses={fetchCourses} />}
    </>
  );
};

export default CourseList;
