import { Avatar, Button, Dropdown, DropdownDivider, Navbar, TextInput } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch } from 'react-icons/ai'
import { FaMoon,FaSun } from 'react-icons/fa'
import { NavbarCollapse } from "flowbite-react";
import { useSelector,useDispatch } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";
import { signOutSuccess } from "../redux/user/userSlice";
import axios from "axios";

export default function Header() {
  const path = useLocation().pathname
  const dispatch=useDispatch()
  const { currentUser } = useSelector(state => state.user);
  const {theme}=useSelector(state=>state.theme)

  
  const handleSignout=async()=>{
    try {
     const res= await axios.post('/api/user/signout')
     const data=res.data;
     if(res.status===200){
       console.log(data);
       dispatch(signOutSuccess())
     }else{
      
     }
    } catch (error) {
     const responseData = error.response.data;
     const errorMessage = responseData.message
     console.log(errorMessage);
     
    }
 }
  return (
    <Navbar className=" border-b-2">
      <Link to='/' className=" self-center whitespace-nowrap
      text-sm sm:text-lg font-semibold ">
        <span className=" px-2 mr-1 py-1 bg-gradient-to-r from-indigo-500
         via-purple-500 to-pink-500
          rounded text-white
         ">Hanzla's</span>
        Blog
      </Link>
      <form >
        <TextInput
          type="text"
          placeholder="Search..."
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline "
        />
      </form>
      <Button className="w-12 h-10 lg:hidden" color="gray" pill>
        <AiOutlineSearch />
      </Button>
      <div className="flex  gap-2  md:order-2 "  >
        <Button className="w-12 h-10 hidden sm:inline" color="gray" pill
         onClick={()=>dispatch(toggleTheme())}
         >
         {  theme=='light' ?<FaMoon /> :  <FaSun/>}
        </Button>
        {
          currentUser ? (

            <Dropdown
             arrowIcon={false}
             inline
             label={
              <Avatar
                alt="user"
                img={currentUser.profilePicture}
                rounded
              />
             }

            >
               <Dropdown.Header>
                <span className="block text-sm ">{currentUser.username}</span>
                <span className="block text-sm font-medium truncate">{currentUser.email}</span>
               </Dropdown.Header>
               <Link to='/dashboard?tab=profile'>
                 <Dropdown.Item>Profile</Dropdown.Item> 
               </Link>
               <Dropdown.Divider/>
               <Dropdown.Item onClick={handleSignout}>Sign Out</Dropdown.Item> 

            </Dropdown>

          ) : (


            <Link to='Sign-in'  >
              <Button outline gradientDuoTone='purpleToBlue' pill>
                Sign In
              </Button>


            </Link>



          )
        }

        <Navbar.Toggle />
      </div>
      <NavbarCollapse>
        <Navbar.Link active={path === "/"} as={"div"}>
          <Link to='/'>
            Home
          </Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/about"} as={"div"}>
          <Link to='/about'>
            About
          </Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/projects"} as={"div"}>
          <Link to='/projects'>
            Projects
          </Link>
        </Navbar.Link>

      </NavbarCollapse>
    </Navbar>
  )
}