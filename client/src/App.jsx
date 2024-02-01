import { BrowserRouter,Routes,Route} from "react-router-dom"
import Home from "./pages/Home"
import { About } from "./pages/About"
import {SignIn} from "./pages/SignIn"
import { SignUp } from "./pages/SignUp"
import { DashBoard } from "./pages/DashBoard"
import { Projects } from "./pages/Projects"
import Header from "./components/Header"
import FooterComp from "./components/FooterComp"
import PrivateRoutes from "./components/PrivateRoutes"
import OnlyAdminPrivateRoutes from "./components/OnlyAdminPrivateRoutes"
import CreatePost from "./pages/CreatePost"

export default function App () {
  return (
    <BrowserRouter>
     <Header/>
     <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/Sign-in" element={<SignIn/>}/>
      <Route path="/Sign-up" element={<SignUp/>}/>
      <Route element={<PrivateRoutes/>}>    
      <Route path="/dashboard" element={<DashBoard/>}/>
        </Route>
       <Route element={<OnlyAdminPrivateRoutes/>} >
        <Route path="/create-post" element={<CreatePost/>} >

        </Route>
        </Route> 
      <Route path="/projects" element={<Projects/>}/>
     </Routes>
     <FooterComp/>
    </BrowserRouter>
  )
}
