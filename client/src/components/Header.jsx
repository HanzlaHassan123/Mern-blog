import { Button, Navbar, TextInput } from "flowbite-react";
import { Link,useLocation } from "react-router-dom";
import { AiOutlineSearch } from 'react-icons/ai'
import { FaMoon } from 'react-icons/fa'
import { NavbarCollapse } from "flowbite-react";
import { useSelector } from "react-redux";

export default function Header() {
    const path=useLocation().pathname
    const {currentUser}=useSelector(state=>state.user);
    console.log(currentUser)
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
                <Button className="w-12 h-10 hidden sm:inline" color="gray" pill>
                    <FaMoon />
                </Button>

                <Link to='Sign-in'  >
                    <Button outline gradientDuoTone='purpleToBlue' pill>
                        Sign In
                    </Button>
                </Link>

                <Navbar.Toggle />
            </div>
            <NavbarCollapse>
                <Navbar.Link  active={path==="/"} as={"div"}>
                    <Link to='/'>
                        Home
                    </Link>
                </Navbar.Link>
                <Navbar.Link active={path==="/about"} as={"div"}>
                    <Link to='/about'>
                        About
                    </Link>
                </Navbar.Link>
                <Navbar.Link active={path==="/projects"}as={"div"}>
                    <Link to='/projects'>
                        Projects
                    </Link>
                </Navbar.Link>
                
            </NavbarCollapse>
        </Navbar>
    )
}