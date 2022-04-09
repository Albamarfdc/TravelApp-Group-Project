import { React,useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import loginImg from '../assets/login.jpeg'
import {  useHistory } from 'react-router-dom'
import { signup } from '../actions'
import { useDispatch,} from 'react-redux';


const Register = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
      dispatch(signup(data),
        history.push("/userPanel"));
        console.log("andre",data) 
    }


    const handleChange = (e) => {
      const { name, value } = e.target;
      setData({ ...data, [name]: value });
      console.log("changeRegister",e.target.value)
     
  }
  

return (
  <div className='relative w-full h-screen bg-zinc-900/90'>
    <img className='absolute w-full h-full object-cover mix-blend-overlay' src={loginImg} alt="/" />
    <div className='flex justify-center items-center h-full'>
    
      <form className='max-w-[400px] w-full mx-auto bg-white p-8'>
        <h2 className='text-4xl font-bold text-center py-4'>TRAVEL APP.</h2>
        
        <div className='flex justify-between py-8'>
        <p className='border shadow-lg hover:shadow-xl px-6 py-2 relative flex items-center'><FcGoogle className='mr-2' /> Google</p>
        </div>
        <div className='flex flex-col mb-4'>
            <label>Usuario</label>
            <input onChange={handleChange} className='border relative bg-gray-100 p-2' name='username' type="text" />
            </div>

        <div className='flex flex-col mb-4'>
            <label>Correo</label>
            <input onChange={handleChange} className='border relative bg-gray-100 p-2' name='email' type="text" />
            </div>
        
        <div className='flex flex-col '>
            <label>Contraseña</label>
            <input onChange={handleChange} className='border relative bg-gray-100 p-2' name='password'  type="password" />
            </div>
        <div onClick={handleSubmit} >
        <button className='w-full py-3 mt-8 bg-teal-400 hover:bg-indigo-500 relative text-white'>Registrate</button>
          
            </div>
           
            
            </form>
        </div>
    </div>
  );
};


export default Register;