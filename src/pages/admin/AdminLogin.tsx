import { useEffect, useState } from 'react'
import { adminLogin } from '../../api/admin';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAdminInfo } from '../../redux/slices/adminSlices/adminSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store';



const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const adminInfo = useSelector((state: RootState) => state.adminInfo.adminInfo);
  console.log('sss',adminInfo);
  useEffect(() => {
    if (adminInfo) {
      navigate('/admin/adminhome');
    }
  }, [adminInfo, navigate]);
  
  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const response = await adminLogin({ email, password })
      console.log('successs',response);
      

      if (response?.status == 201) {  
        toast.success('login success');
        dispatch(setAdminInfo(response.data))
        navigate('/admin/adminhome');
      }else{
        toast.error('invalid credintial')
      }

    } catch (error) {
      toast.error('An unexpected error occurred.');
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <button className="w-full py-2 inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
              Login
            </button>


          </form>

        </div>
      </div>
    </>
  )
}

export default AdminLogin
