
import { Link, useNavigate } from 'react-router-dom'
import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import { useState } from 'react'
import axios from 'axios'
import {useDispatch,useSelector} from 'react-redux'
import { signInStart,signInFailure,signInSuccess } from '../redux/user/userSlice'

export const SignIn = () => {
  const [formData, setFormData] = useState({});
  // const [errorMessage, setErroMessage] = useState(null)
  // const [loading, setLoading] = useState(false);
  const {loading,error:errorMessage}=useSelector(state=>state.user)
  const dispatch=useDispatch()
  const navigate = useNavigate()
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value.trim()
    })
  }
  console.log(formData);
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.email || !formData.password) {
      // return setErroMessage('Please fill out all Fields');
        return dispatch(signInFailure("All Fields are required"))
    }
    try {
      // setLoading(true)
      // setErroMessage(null)
        dispatch(signInStart());
        const res = await axios.post('/api/auth/signin', formData, {
        headers: { 'Content-Type': 'application/json' }
      });

      if (res.status === 200) {
        dispatch(signInSuccess(res))
        // Assuming HTTP status 200 indicates success
        navigate('/');
      }
      // setLoading(false)
      // Handle the response data as needed
    } catch (error) {
      // setErroMessage(error.message)
      // setLoading(false)
      dispatch(signInFailure(error.response.data.message));
    }
  }
  return (
    <div className='min-h-screen mt-20'>
      <div className=" flex p-3 max-w-3xl  mx-auto
             flex-col md:flex-row md:items-center 
             gap-5
        ">
        {/* left side  */}
        <div className="flex-1">
          <Link to='/' className=" font-bold  text-4xl ">
            <span className=" px-2 -1 py-1 bg-gradient-to-r
             from-indigo-500
          via-purple-500 to-pink-500
            rounded text-white">
              Hanzla's
            </span>
            Blog
          </Link >
          <p className=' text-sm mt-5  '>Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Aliquam alias ipsam soluta eos perferendis nam
            voluptatibus assumenda velit cum quaerat.
          </p>
        </div>
        {/* right side  */}
        <div className="flex-1">
          <form className='flex flex-col gap-2' onSubmit={handleSubmit}>

            <div className="">
              <Label value='Your email' />
              <TextInput type='email' placeholder='name@company.com' id='email' onChange={handleChange} />
            </div>
            <div className="">
              <Label value='Your Password' />
              <TextInput type='password' placeholder='*********' id='password' onChange={handleChange} />
            </div>

            <Button gradientDuoTone='purpleToPink' type='submit' disabled={loading} >
              {
                loading ?
                  (
                    <>
                      <Spinner size='sm'>
                        <span className=' pl-3'>Loading...</span>
                      </Spinner>

                    </>

                  ) : 'Sign In'
              }
            </Button>

          </form>
          <div className=" flex gap-2 text-sm mt-5">
            <span> Dont Have an Account ? </span>
            <Link to='/sign-up' className=' text-blue-500'>
              Sign Up
            </Link>
          </div>
          {
            errorMessage && (
              <Alert className='mt-5' color='failure'>
                {errorMessage}
              </Alert>
            )
          }
        </div>

      </div>
    </div>
  )
}
