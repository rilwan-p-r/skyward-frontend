import { Outlet } from "react-router-dom"
import TeacherNavbar from "../TeacherNavbar/TeacherNavbar"

const TeacherLayout = () => {
  return (
    <>
      <TeacherNavbar/>
      <main>
        <Outlet/>
      </main>
    </>
  )
}

export default TeacherLayout
