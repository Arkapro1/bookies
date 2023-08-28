"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useState,useEffect } from "react";


const userMainPage=()=>{
 
    const {data:session ,status}=useSession();
    const [toggle, setToggle] = useState(false);
    const WorkspacesApi="/api/folders"
    const [workspaces,setWorkspaces]=useState([])
    const [constworkspaces,constsetWorkspaces]=useState([]);
    let pass= `${session?.user?.email.toString()}`;
    // console.log(pass); 
    const[aa,aaa]=useState(session?.user?.email)
    // const [pass,setPass]=useState("");
    const [newWorkspace,setNewWorkspace]=useState({gmail: pass || "",name:"",description:"",isWorkSpace:true})
    const formselect=["CREATE","UPDATE"]
    const [formtype,setFormtype]=useState(formselect[0])
    let [foldereditApi,foldereditApiSet]=useState("");
    // const foldereditApiSet=(api)=>{
    //   foldereditApi=api;
    // }
    
  const folderEdit=async()=>{
    console.log(foldereditApi)
   await axios.put(foldereditApi,newWorkspace);
   await getWorkspaces()
  }
    if(status=="unauthenticated"){
        redirect('/');
    }
    const updateFormFill=(name,description)=>{
      setNewWorkspace({...newWorkspace,name,description})
    }
    const updateWorkspace=()=>{

    }
    const searchResult=(e)=>{
     
      const filterdata=constworkspaces.filter((ele)=>{
       
        return  ele.name.includes(e.target.value)
      })
      setWorkspaces(filterdata)
    }
    let content=""
    const getWorkspaces=async()=>{
      console.log(aa);
      const content=await axios.get(WorkspacesApi,{gmail:pass})
      setWorkspaces(content.data)
      constsetWorkspaces(content.data)
      console.log(newWorkspace);
     
      
    }
    const createWorkspace=async()=>{

     await axios.post(WorkspacesApi,newWorkspace);
     await getWorkspaces()
    }
    useEffect(() => {
     
      getWorkspaces();
      
    },[])

    return(
        <>
        {/* <!-- Main modal --> */}
        
    

{toggle && 
<div className=" fixed z-50 flex w-screen h-screen justify-center items-center bg-zinc-950/70 ">
<div id="authentication-modal" tabindex="-1" aria-hidden="true" className="w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 mx-auto">
        {/* <!-- Modal content --> */}
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button onClick={ ()=> {setToggle((prev) => !prev);setNewWorkspace({...newWorkspace,name:"",description:"",})}} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
                <span className="sr-only">Create Workspace</span>
            </button>
            <div className="px-6 py-6 lg:px-8">
                <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">{formtype=="CREATE"?"Create":"Update"} New Workspace</h3>
                <form className="space-y-6" action="#">
                    <div>
                        <label for="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Workspace Name</label>
                        <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Workspace Name" required value={newWorkspace.name} onChange={(e)=>setNewWorkspace({...newWorkspace,name:e.target.value,gmail:session?.user?.email})}/>
                    </div>
                    <div>
                        <label for="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                        <textarea rows="5" type="text" name="description" id="description" placeholder="Description" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required value={newWorkspace.description} onChange={(e)=>setNewWorkspace({...newWorkspace,description:e.target.value})}/>
                    </div>
                  
                    <button type="button" onClick={()=>{formtype=="CREATE"?createWorkspace():folderEdit(); axios.get(WorkspacesApi,{gmail:session?.user?.email});
                    setWorkspaces(content.data)
      constsetWorkspaces(content.data);setToggle(false);setNewWorkspace({...newWorkspace,name:"",description:"",})}} className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" >{formtype=="CREATE"?"Create":"Update"}</button>
                   
                </form>
            </div>
        </div>
    </div>
</div> 
</div>
}
      <section className="text-gray-600 body-font px-4">
      
    <div className="">

        <div className="grid gap-auto  mb-10 pt-6 md:mb-16 lg:grid-cols-2 ">
        <h2 className="mb-4 inline text-start font-serif text-3xl font-bold text-gray-200 md:mb-6 md:text-4xl">Welcome {session?.user.name}</h2>

<div className="columns-2 ">


<button onClick={() => {setToggle((prev) => !prev);setFormtype("CREATE")}} data-modal-target="authentication-modal" data-modal-toggle="authentication-modal" className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 lg:ml-16 xl:ml-40" type="button">
  Create
</button> 
        {/* searchbox */}
        
       <div className=" mb-4 flex flex-wrap">
         <input
            type="search"
            className=" m-0 w-[1px] min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
            placeholder="Search"
            aria-label="Search"
            aria-describedby="button-addon2" onChange={(e)=>searchResult(e)} />
          <span
            className="input-group-text flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-neutral-700 dark:text-neutral-200"
            id="basic-addon2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5">
              <path
                fill-rule="evenodd"
                d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                clip-rule="evenodd" />
            </svg>
          </span>
 </div>

        </div>
        </div>
        <div className="mx-5 grid gap-8 place-items-center sm:grid-cols-2 sm:gap-12 lg:grid-cols-4  xl:gap-16">

        {
         workspaces?.map((ele)=>{
            
            return <Article props={ele} setToggle={setToggle} setFormtype={setFormtype} updateFormFill={updateFormFill} foldereditApiSet={foldereditApiSet}/>
         })
         
         
        }
        </div>
    </div>
</section>

        </>
    )
}

export default userMainPage;

























const Article=({props,setToggle,setFormtype,updateFormFill,foldereditApiSet})=>{
  const {data:session ,status}=useSession();
  const foldereditApi=`/api/folderEdit/${props._id}`
 
    return(
        <>
           <div onClick={()=>{}} className='break-inside relative overflow-hidden flex flex-col justify-between space-y-3 text-sm rounded-xl min-w-[16rem] max-w-[23rem] p-4 mb-4 bg-white text-black dark:bg-slate-800 dark:text-white'>
        <div className='flex items-center justify-between font-medium'>
            <span className='uppercase text-xs text-green-500'>edit collabs</span>
            <span className='text-xs text-slate-500'>#team</span>
        </div>
        <div className='flex flex-row items-center space-x-3'>
            <div className='flex flex-none items-center justify-center w-10 h-10 rounded-full bg-green-500 text-white'>
            <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'>
                <polygon points='14 2 18 6 7 17 3 17 3 13 14 2' />
                <line x1='3' y1='22' x2='21' y2='22' />
            </svg>
            </div>
            <span className='text-base font-medium'>{props.name}</span>
        </div>
        <div>{props.description}</div>
        <div className='flex justify-between items-center'>
            <div>
            <dt className='sr-only'>Users</dt>
            <dd className='flex justify-start -space-x-1.5'>
                <a href='#' className='inline-block -m-1'>
                <img className='w-7 h-7 rounded-full ring-2 ring-white dark:ring-slate-800' src={session?.user.image} alt='avatar' />
                </a>
                
                <span className='inline-block -m-1 rounded-full ring-2 ring-white dark:ring-slate-800'>
                <svg width='28' height='28' viewBox='0 0 31 31' fill='none' xmlns='http://www.w3.org/2000/svg' className='text-slate-200 dark:text-slate-600'>
                    <path d='M31 15.5C31 24.0604 24.0604 31 15.5 31C6.93959 31 0 24.0604 0 15.5C0 6.93959 6.93959 0 15.5 0C24.0604 rem0 31 6.93959 31 15.5ZM8.20879 15.5C8.20879 19.5268 11.4732 22.7912 15.5 22.7912C19.5268 22.7912 22.7912 19.5268 22.7912 15.5C22.7912 11.4732 19.5268 8.20879 15.5 8.20879C11.4732 8.20879 8.20879 11.4732 8.20879 15.5Z' fill='currentColor' />
                    <path d='M31 15.5C31 18.049 30.3714 20.5586 29.1698 22.8066C27.9682 25.0547 26.2307 26.9716 24.1113 28.3878C21.9919 29.8039 19.556 30.6755 17.0193 30.9254C14.4826 31.1752 11.9234 30.7956 9.56841 29.8201C7.21345 28.8447 5.1354 27.3035 3.51834 25.3331C1.90128 23.3627 0.795112 21.0239 0.297828 18.5239C-0.199455 16.0239 -0.0725081 13.4398 0.667425 11.0006C1.40736 8.56136 2.73744 6.34225 4.53984 4.53985L10.2876 10.2876C9.43046 11.1448 8.79791 12.2002 8.44602 13.3602C8.09413 14.5202 8.03376 15.7491 8.27025 16.9381C8.50675 18.127 9.03281 19.2393 9.80184 20.1764C10.5709 21.1134 11.5591 21.8464 12.6791 22.3103C13.799 22.7742 15.0161 22.9547 16.2225 22.8359C17.4289 22.7171 18.5874 22.3026 19.5953 21.6291C20.6033 20.9556 21.4295 20.0439 22.001 18.9748C22.5724 17.9058 22.8714 16.7122 22.8714 15.5H31Z' fill='#2BC86A' />
                </svg>
                </span>
            </dd>
            </div>
            <button onClick={()=>{foldereditApiSet(foldereditApi);setFormtype("UPDATE");setToggle(true);updateFormFill(props.name,props.description)}} className='flex items-center justify-center text-xs font-medium rounded-full px-4 py-1 space-x-1 border-2 border-black bg-white hover:bg-black hover:text-white text-black dark:bg-slate-800 dark:text-white dark:border-white dark:hover:bg-white dark:hover:text-black'>
            <span>Edit</span>
            <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'>
                <path d='M5 12h13M12 5l7 7-7 7' />
            </svg>
            </button>
        </div>
        </div>

        </>
    )
}


