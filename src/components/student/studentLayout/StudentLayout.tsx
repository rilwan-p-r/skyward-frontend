import { Outlet } from 'react-router-dom'
import StudentNavbar from '../studentNavbar/StudentNavbar'

const StudentLayout = () => {
  return (
    <>
      <StudentNavbar/>
      <main>
      <Outlet/>
      </main>
    </>
  )
}

export default StudentLayout
