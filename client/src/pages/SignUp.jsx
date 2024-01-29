import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Label, TextInput } from 'flowbite-react'
export const SignUp = () => {
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
          <form className='flex flex-col gap-2'>
            <div className="">
              <Label value='Your Username' />
              <TextInput type='text' placeholder='Username' id='username' />
            </div>
            <div className="">
              <Label value='Your email' />
              <TextInput type='text' placeholder='name@company.com' id='email' />
            </div>
            <div className="">
              <Label value='Your Password' />
              <TextInput type='text' placeholder='Password' id='password' />
            </div>

            <Button gradientDuoTone='purpleToPink' type='submit' >
              Sign Up
            </Button>

          </form>
          <div className=" flex gap-2 text-sm mt-5">
            <span> Have an Account ? </span>
            <Link to='/sign-in' className=' text-blue-500'>
              Sign In
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}
