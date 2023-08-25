// import Login from "@/components/login/page";

// const signIn=()=>{
//     return(
//         <>
//             {/* <Login/> */}
            
//         </>
//     )
// }

// export default Login;

"use client";

import Login from "@/components/login/page";
import { signIn } from "next-auth/react";

const LoginUser = () => {
  return (
    <div>
      <Login/>
      <button onClick={() => signIn("google")}>Log In with Google</button>
			 {/* customize the button */}
    </div>
  );
};

export default LoginUser;