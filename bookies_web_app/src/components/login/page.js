"use client";

import axios from "axios";
import { getSession, signIn, useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import './style.css';
import './style1.css';
function Login() {
    let {status} = useSession();
    const router = useRouter();
    // session = session.data;
    const [sidebar, setsidebar] = useState();
    const setUserAndLoadPage=async()=>{
        const sessionData=await getSession()
        if(sessionData){
            axios.post("/api/user/create",{name:sessionData?.user?.name,gmail:sessionData?.user?.email})
        }
        
    }
    useEffect(()=>{
        setUserAndLoadPage();
    },[])
    
    if(status=="authenticated"){
        redirect("/pages/homepage/userMainPage");
    }
      
    return (
        <div className=" w-full py-16 px-4 ">
            <div className="flex flex-col items-center justify-center ">
            
            
            <div className="bg-gray-900 shadow rounded-xl gradient-border lg:w-1/3  md:w-1/2 w-full p-10 my-16  ">
            <img src="login.svg" alt="logo" width={250} className="mx-auto mb-5"/>
                <p tabIndex={0} role="heading" aria-label="Login to your account" className="text-white my-8 text-center text-2xl font-extrabold leading-6 text-gray-800">
                    Login to Your Account
                </p> 
                <button onClick={() => signIn("google")} aria-label="Continue with google" role="button" className="focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 py-3.5 px-4 border rounded-lg border-gray-700 flex items-center w-full mt-10"
                >
                    <svg width={40} height={30} viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18.9892 10.1871C18.9892 9.36767 18.9246 8.76973 18.7847 8.14966H9.68848V11.848H15.0277C14.9201 12.767 14.3388 14.1512 13.047 15.0812L13.0289 15.205L15.905 17.4969L16.1042 17.5173C17.9342 15.7789 18.9892 13.221 18.9892 10.1871Z" fill="#4285F4" />
                        <path d="M9.68813 19.9314C12.3039 19.9314 14.4999 19.0455 16.1039 17.5174L13.0467 15.0813C12.2286 15.6682 11.1306 16.0779 9.68813 16.0779C7.12612 16.0779 4.95165 14.3395 4.17651 11.9366L4.06289 11.9465L1.07231 14.3273L1.0332 14.4391C2.62638 17.6946 5.89889 19.9314 9.68813 19.9314Z" fill="#34A853" />
                        <path d="M4.17667 11.9366C3.97215 11.3165 3.85378 10.6521 3.85378 9.96562C3.85378 9.27905 3.97215 8.6147 4.16591 7.99463L4.1605 7.86257L1.13246 5.44363L1.03339 5.49211C0.37677 6.84302 0 8.36005 0 9.96562C0 11.5712 0.37677 13.0881 1.03339 14.4391L4.17667 11.9366Z" fill="#FBBC05" />
                        <path d="M9.68807 3.85336C11.5073 3.85336 12.7344 4.66168 13.4342 5.33718L16.1684 2.59107C14.4892 0.985496 12.3039 0 9.68807 0C5.89885 0 2.62637 2.23672 1.0332 5.49214L4.16573 7.99466C4.95162 5.59183 7.12608 3.85336 9.68807 3.85336Z" fill="#EB4335" />
                    </svg>
                    <p className="text-base font-medium ml-4 text-white">Continue with Google</p>
                </button> 
                {/* <button onClick={() => signIn("github")} aria-label="Continue with github" role="button" className="focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 py-3.5 px-4 border rounded-lg border-gray-700 flex items-center w-full mt-10"
                >
                    <img src="github.svg" width={55} height={10}></img>
                    <p className="text-base font-medium ml-4 text-white">Continue with Github</p>
                </button>   */}
            </div>
        </div>
        </div>

        
    );
}

export default Login;


