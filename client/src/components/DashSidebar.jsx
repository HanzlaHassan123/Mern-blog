import React from 'react';
import { Sidebar } from 'flowbite-react';
import { HiArrowSmRight, HiUser } from 'react-icons/hi';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { signOutSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import axios from 'axios';
export default function DashSidebar() {
    const dispatch=useDispatch()
    const location = useLocation();
    const [tab, setTab] = useState('')
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search)
        console.log(urlParams)
        const tabFromUrl = urlParams.get('tab')
        console.log(tabFromUrl);
        if (tabFromUrl) {
            setTab(tabFromUrl)
        }
    }, [location.search])

    
  const handleSignout=async()=>{
    try {
     const res= await axios.post('/api/user/signout')
     console.log(res);
     if(res.status===200){

       dispatch(signOutSuccess())
     }else{
      
     }
    } catch (error) {
     console.log(error);
     
    }
 }
    return (
        <Sidebar className='w-full md:w-56'>
            <Sidebar.Items>
                <Sidebar.ItemGroup>
                    <Link to='/dashboard?tab=profile'>
                        <Sidebar.Item
                            active={tab === 'profile'}
                            icon={HiUser}
                            label="user"
                            as='div'
                            labelColor='dark'>
                            Profile
                        </Sidebar.Item>
                    </Link>
                    <Sidebar.Item  icon={HiArrowSmRight}
                        className='cursor-pointer' 
                        onClick={handleSignout}
                        >
                        Sign out
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    );
}