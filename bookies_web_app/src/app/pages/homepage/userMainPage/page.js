"use client";

import { getSession, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import './style.css';

import LoadingSkeleton from "@/components/loading/LoadingSkeleton";
import axios from 'axios';

const userMainPage=()=>{ 
    const {data:session,status}=useSession();
    
    const [toggle, setToggle] = useState(false);
    const [Jointoggle, setJoinToggle] = useState(false);
    const [notification, setnotification] = useState(false);
    const WorkspacesApi="/api/folders"

    const [searchOpen, setSearchOpen] = useState(false);
  
    const [workspaces,setWorkspaces]=useState([])
    const [constworkspaces,constsetWorkspaces]=useState([])
    const [newWorkspace,setNewWorkspace]=useState({gmail:"",name:"",description:"",isWorkSpace:true})
    const formselect=["CREATE","UPDATE"]
    const [formtype,setFormtype]=useState(formselect[0])
    let [foldereditApi,foldereditApiSet]=useState("");
    let [folderdeleteApi,folderdeleteApiSet]=useState("");
    const folderCodeInputRef = useRef(null);
    const [folderCode,setFolderCode]=useState("")
    const [collabCode,setCollabCode]=useState("")
    const [collabToggle,setCollabToggle]=useState(true)
    const requestCollabApi="/api/folderCollab/collabRequest"
    const acceptCollabApi="/api/folderCollab/acceptCollab"
    const CollabWorkspacesApi="/api/folderCollab/collabWorkspaces"
    //false array
    const [collabrequests,setCollabrequests]=useState([])
    // console.log(session?.user?.email);
    const getCollabRequests=async()=>{
     const sessionData=await getSession()
     console.log(sessionData?.user?.email);
     const requestData=  await axios.post(requestCollabApi,{email:sessionData?.user?.email});
      
     setCollabrequests(requestData.data)

    }
   const requestCollab=async()=>{
      const sessionData=await getSession()
      await axios.put(requestCollabApi,{workSpaceCode:collabCode,email:sessionData?.user?.email});
   }
   const acceptCollab=async(collaboratorId,workSpaceId)=>{
      await axios.post(acceptCollabApi,{collaboratorId:collaboratorId,workSpaceId:workSpaceId})
      await deleteCollabWorkSpaces(collaboratorId,workSpaceId)
   }
   const makeOffInput=()=>{
    folderCodeInputRef.current.blur();
   }
  const folderEdit=async()=>{
    console.log(foldereditApi)
   await axios.put(foldereditApi,newWorkspace);
   await getWorkspaces()
  }
  const folderdelete=async()=>{
    await axios.delete(folderdeleteApi);
    await getWorkspaces()
  }
    if(status=="unauthenticated"){
        redirect('/');
    }
    const updateFormFill=(name,description)=>{
      setNewWorkspace({...newWorkspace,name,description})
    }

    const searchResult=(e)=>{
     
      const filterdata=constworkspaces.filter((ele)=>{
       
        return  ele.name.toLowerCase().includes(e.target.value.toLowerCase() )
      })
      setWorkspaces(filterdata)
    }
    
    // const content=await axios.get(WorkspacesApi,{gmail:session?.user?.email})
    // setWorkspaces(content.data)
    // constsetWorkspaces(content.data)
    
    
    const getWorkspaces=async()=>{
      
     const sessionn=await getSession()
      const content=await axios.put(WorkspacesApi,{gmail:sessionn?.user?.email})
      setWorkspaces(content.data)
      constsetWorkspaces(content.data)
      
    }

    const getCollabWorkSpaces=async()=>{
      const sessionn=await getSession()
      const content=await axios.put(CollabWorkspacesApi,{gmail:sessionn?.user?.email})
      setWorkspaces(content.data)
      constsetWorkspaces(content.data)
    }
    const deleteCollabWorkSpaces=async(collaboratorId,workSpaceId)=>{
      const sessionn=await getSession()
      const content=await axios.post(CollabWorkspacesApi,{collaboratorId:collaboratorId,workSpaceId:workSpaceId,gmail:sessionn?.user?.email})
     
    }
    const createWorkspace=async()=>{
     await axios.post(WorkspacesApi,newWorkspace);
     await getWorkspaces() 
    }
    useEffect(() => {
      getWorkspaces();
      getCollabRequests();
    },[])
    if(status=="loading"){
      return <LoadingSkeleton/>
    }
    return(
        <>

        {/* <!-- Main modal --> */}
        
{toggle && 
<div className=" fixed z-50 flex w-screen h-screen justify-center items-center bg-zinc-950/70 ">
<div id="authentication-modal" tabindex="-1" aria-hidden="true" className="w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 mx-auto">
        {/* <!-- Modal content --> */}
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button onClick={ ()=> {setToggle((prev) => !prev);setNewWorkspace({...newWorkspace, name:"",description:"",isWorkSpace:true})}} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
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
                        <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Workspace Name" required value={newWorkspace.name} onChange={(e)=>setNewWorkspace({...newWorkspace,name:e.target.value,gmail:`${session?.user?.email}`})}/>
                    </div>
                 { formtype=="UPDATE"&&  <div>
                        <label for="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Workspace Code</label>
                        <input type="text" name="folderCode" id="folderCode" className="bg-gray-50 border border-gray-300  text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" ref={folderCodeInputRef} onClick={makeOffInput} required value={folderCode} />
                    </div>

                 }
                    <div>
                        <label for="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                        <textarea rows="5" type="text" name="description" id="description" placeholder="Description" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required value={newWorkspace.description} onChange={(e)=>setNewWorkspace({...newWorkspace,description:e.target.value})}/>
                    </div>
                  
                    <button type="button" onClick={()=>{formtype=="CREATE"?createWorkspace():folderEdit(); setToggle(false);setNewWorkspace({...newWorkspace, name:"",description:"",isWorkSpace:true})}} className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{formtype=="CREATE"?"Create":"Update"}</button>
                    
                    {formtype=="UPDATE" && <button type="button" onClick={()=>{folderdelete(folderdeleteApi); setToggle(false);setNewWorkspace({...newWorkspace,name:"",description:"",isWorkSpace:true})}} className=" bg-red-600 w-full text-white  hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center   dark:focus:ring-blue-800">{"Delete"}</button>}
                   
                </form>
            </div>
        </div>
    </div>
</div> 
</div>
}

{/* Join A Workspace modal */}
{Jointoggle && 
  <div className=" fixed z-50 flex w-screen h-screen justify-center items-center bg-zinc-950/70 ">
<div id="Join_A_Workspace_modal" tabindex="-1" aria-hidden="true"  className="w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div class="relative  w-72 max-w-sm max-h-full">
        {/* <!-- Modal content --> */}
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700 p-2">
            <button onClick={()=>setJoinToggle(false)} type="button" class="absolute top-5 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
                <svg class="text-red-400 w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
                <span class="sr-only">Close modal</span>
            </button>
                <h3 class="mb-4 text-lg  font-medium text-gray-900 dark:text-white absolute top-5 left-4 ml-2">Join a Workspace</h3>
            <div class="px-6 py-6 flex flex-col items-center ">
                  
                    <div class="mt-10 ">
                        <label for="password" class="block mb-4 text-sm font-medium text-gray-900 dark:text-white">WorkSpace Code</label>
                        <input type="password" value={collabCode} onChange={(e)=>setCollabCode(e.target.value)} name="password" id="password" placeholder="••••••••" class="text-center w-42 p-2 mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500    dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required/>
                    </div>
                    
                    <button type="text" onClick={()=>{requestCollab();setJoinToggle(false)}} class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Request a Collab</button>     
                
            </div>
        </div>
    </div>
</div> 
</div> 
 } 
{/* notification tg */}
{notification && 
  <div className=" fixed z-50 flex w-screen h-screen justify-center items-center bg-zinc-950/70 ">
<div id="notification_Tg" tabindex="-1" aria-hidden="true"  className="w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div class="relative w-full max-w-sm max-h-full">
        {/* <!-- Modal content --> */}
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button onClick={()=>setnotification(false)} type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
                <span class="sr-only">Close modal</span>
            </button>
            <div class="px-6 py-6 lg:px-8">
                <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">🔔 Knock! Knock! </h3>
                {/* <form class="space-y-6" action="#"> */}
                
                 { 
                  collabrequests.length==0?setnotification(false):
                  collabrequests.map((request)=>{
                    
                    return <>
                    <div class="max-w-md">
                    <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{request.collaboratorGmail} is requesting <br/>to Join --{request.workSpaceName}</label>
                </div>
                       <div class="colums-2">
                       <button type="text" class="my-3  w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={()=>{acceptCollab(request.collaboratorId,request.workSpaceId);setCollabrequests([...collabrequests].filter((e)=>e!=request))}}>Accept</button>
                         <button type="text" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={()=>{setCollabrequests([...collabrequests].filter((e)=>e!=request));deleteCollabWorkSpaces(request.collaboratorId,request.workSpaceId)}}>Reject</button>
                       </div></>
                  })
                    
                  }
           

                 
                {/* </form> */}
            </div>
        </div>
    </div>
</div> 
</div> 
}
      <section className="text-gray-600 body-font px-4 bg-dark">
     
    <div className="">

        <div className="grid gap-auto  mb-10 pt-6 md:mb-16 grid-cols-2 ">
        <div class="flex flex-col">
          <h2 className="mb-4 inline text-start font-serif text-md sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-200 md:mb-6">Welcome {session?.user.name}</h2>
          <div class="flex flex-col sm:flex-row">

          <button type="button" onClick={()=>{setJoinToggle((pev)=>!pev)}} data-modal-target="Join_A_Workspace_modal" data-modal-toggle="Join_A_Workspace_modal" 
          class="sm:w-40 md:w-48 mr-10 text-white  bg-blue-700 hover:bg-blue-800 focus:ring-3 focus:ring-blue-300  rounded-lg text-xs sm:text-sm px-1 md:px-2 lg:px-5 py-2 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            Join a Workspace 
            </button>
           
          {/* View Collabed Spaces */}
          <button onClick={()=>{setCollabToggle((pev)=>!pev);collabToggle?getCollabWorkSpaces():getWorkspaces();}} type="button" 
          class=" sm:w-40 md:w-48 text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-xs sm:text-sm px-1 md:px-2 lg:px-5 py-2 text-center 
           dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 mr-2 mb-2">
          {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 md:w-4 lg:w-6 mr-1">
            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM8.547 4.505a8.25 8.25 0 1011.672 8.214l-.46-.46a2.252 2.252 0 01-.422-.586l-1.08-2.16a.414.414 0 00-.663-.107.827.827 0 01-.812.21l-1.273-.363a.89.89 0 00-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.211.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 01-1.81 1.025 1.055 1.055 0 01-1.055-1.055v-1.172c0-.92-.56-1.747-1.414-2.089l-.654-.261a2.25 2.25 0 01-1.384-2.46l.007-.042a2.25 2.25 0 01.29-.787l.09-.15a2.25 2.25 0 012.37-1.048l1.178.236a1.125 1.125 0 001.302-.795l.208-.73a1.125 1.125 0 00-.578-1.315l-.665-.332-.091.091a2.25 2.25 0 01-1.591.659h-.18c-.249 0-.487.1-.662.274a.931.931 0 01-1.458-1.137l1.279-2.132z" clipRule="evenodd" />
          </svg> */}
          {collabToggle?"View Collabed Spaces":"View Own WorkSpaces"}
          
          </button>
          </div>
        </div>  
        
       

        <div className="pt-6 hidden sm:flex h-30  inline-flex justify-around">
        {/* Create Button */}
        <div className="flex items-center h-8 sm:h-10   ">
          <button onClick={() => {setToggle((prev) => !prev);setFormtype("CREATE")}}  
          className=" createbtn border border-gray-200 mx-2 lg:mx-4 rounded-3xl 
          px-1 sm:px-2 lg:px-4 text-center 
          py-1 sm:py-1 md:py-2 w-14 sm:w-16 lg:w-20 
          text-white  hover:bg-blue-800 focus:ring-4 focus:outline-none 
          focus:ring-blue-300 font-medium rounded-lg text-sm  text-center  dark:hover:bg-gray-900 
          dark:focus:ring-gray-800 lg:ml-16 xl:ml-40" type="button">
            Create
          </button>  
        {/* Notification Button */}
        <button onClick={()=>{setnotification(pev=>(!pev));}} className="h-10 mr-3">
          <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" fill="currentColor" class="w-6 lg:w-10 ">
            <path fill-rule="evenodd" d="M12 2.25A6.75 6.75 0 005.25 9v.75a8.217 8.217 0 01-2.119 5.52.75.75 0 00.298 1.206c1.54
            4.57 3.16.99 4.831 1.243a3.75 3.75 0 107.48 0 24.583 24.583 0 004.83-1.244.75.75 0 00.298-1.205 8.217 8.217 0 01-2.118-5.52V9A6.75 6.75 0 0012 2.25zM9.75 18c0-.034 0-.067.002-.1a25.05 25.05 0 004.496 0l.002.1a2.25 2.25 0 11-4.5 0zm.75-10.5a.75.75 0 000 1.5h1.599l-2.223 3.334A.75.75 0 0010.5 13.5h3a.75.75 0 000-1.5h-1.599l2.223-3.334A.75.75 0 0013.5 7.5h-3z" clip-rule="evenodd" />
          </svg> 
          </button>
          </div>
        {/* searchbox */}        
        <div className=" mb-4 flex flex-wrap h-10 ">
                <input
                    type="search"
                    className=" m-0 min-w-0 w-20 sm:w-24 md:w-32 lg:w-44  flex-auto rounded-md border border-solid border-neutral-300 bg-transparent bg-clip-padding 
                    px-2 mt-3 sm:mt-0 md:px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-white dark:placeholder:text-neutral-200 dark:focus:border-primary"
                    placeholder="Search"
                    aria-label="Search"
                    aria-describedby="button-addon2" onChange={(e)=>searchResult(e)} />
                  <button
                    className="input-group-text flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-neutral-700 dark:text-neutral-200 focus:text-white"
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
                  </button>
        </div>
        </div>


{/* right side in mobile */}
        <div className=" pt-6 flex sm:hidden h-30   justify-around">
        {/* Create Button */}
      <div className="flex items-center h-8 sm:h-10   ">
      {!searchOpen &&  
      <>
          <button onClick={() => {setToggle((prev) => !prev);setFormtype("CREATE")}}  
          className=" createbtn border border-gray-200 mx-2 lg:mx-4 rounded-3xl 
          px-1 sm:px-2 lg:px-4 text-center 
          py-1 sm:py-1 md:py-2 w-14 sm:w-16 lg:w-20 
          text-white  hover:bg-blue-800 focus:ring-4 focus:outline-none 
          focus:ring-blue-300 font-medium rounded-lg text-sm  text-center  dark:hover:bg-gray-900 
          dark:focus:ring-gray-800 lg:ml-16 xl:ml-40" type="button">
            Create
          </button>  
        {/* Notification Button */}
        <button onClick={()=>{setnotification(pev=>(!pev));}} className="h-10 mr-3">
          <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" fill="currentColor" class="w-6 lg:w-10 ">
            <path fill-rule="evenodd" d="M12 2.25A6.75 6.75 0 005.25 9v.75a8.217 8.217 0 01-2.119 5.52.75.75 0 00.298 1.206c1.54
            4.57 3.16.99 4.831 1.243a3.75 3.75 0 107.48 0 24.583 24.583 0 004.83-1.244.75.75 0 00.298-1.205 8.217 8.217 0 01-2.118-5.52V9A6.75 6.75 0 0012 2.25zM9.75 18c0-.034 0-.067.002-.1a25.05 25.05 0 004.496 0l.002.1a2.25 2.25 0 11-4.5 0zm.75-10.5a.75.75 0 000 1.5h1.599l-2.223 3.334A.75.75 0 0010.5 13.5h3a.75.75 0 000-1.5h-1.599l2.223-3.334A.75.75 0 0013.5 7.5h-3z" clip-rule="evenodd" />
          </svg> 
          </button>
          <button
                    onClick={() => setSearchOpen(true)}
                    className="input-group-text flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-neutral-700 dark:text-neutral-200 focus:text-white"
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
                  </button>
                  </>
      }
      {searchOpen &&
          <div className=" mb-4 flex flex-wrap h-10 ">
          <input
              type="search"
              className=" m-0 min-w-0 w-24 sm:w-24 md:w-32 lg:w-44  flex-auto rounded-md border border-solid border-neutral-300 bg-transparent bg-clip-padding 
              px-2 mt-3 sm:mt-0 md:px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-white dark:placeholder:text-neutral-200 dark:focus:border-primary"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="button-addon2" onChange={(e)=>searchResult(e)} />
            <button
            onClick={() => setSearchOpen(false)}
              className="mt-2  text-red-800 input-group-text flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-extrabold text-red-700 "
              id="basic-addon2">
              X
            </button>
  </div>
      }
          </div>

          
        {/* searchbox */}        
        <div className=" mb-4 flex flex-wrap h-10 hidden sm:block">
                <input
                    type="search"
                    className=" m-0 min-w-0 w-20 sm:w-24 md:w-32 lg:w-44  flex-auto rounded-md border border-solid border-neutral-300 bg-transparent bg-clip-padding 
                    px-2 mt-3 sm:mt-0 md:px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-white dark:placeholder:text-neutral-200 dark:focus:border-primary"
                    placeholder="Search"
                    aria-label="Search"
                    aria-describedby="button-addon2" onChange={(e)=>searchResult(e)} />
                  <button
                    className="input-group-text flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-neutral-700 dark:text-neutral-200 focus:text-white"
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
                  </button>
        </div>
        </div>




    
    </div>
            
        <div className="mx-5 grid gap-8 place-items-center sm:grid-cols-2 sm:gap-12 lg:grid-cols-4  xl:gap-16">

        {
         workspaces?.map((ele)=>{
            
            return <Article props={ele} setToggle={setToggle} setFormtype={setFormtype} updateFormFill={updateFormFill} foldereditApiSet={foldereditApiSet} folderdeleteApiSet={folderdeleteApiSet} setFolderCode={setFolderCode}/>
         })
         
         
        }
        </div>
    </div>
</section>

        </>
    )
}

export default userMainPage;





















const Article=({props,setToggle,setFormtype,updateFormFill,foldereditApiSet,folderdeleteApiSet,setFolderCode})=>{
  const {data:session ,status}=useSession();
  const foldereditApi=`/api/folderEdit/${props._id}`
  const folderdeleteApi=`/api/delete/folder/${props._id}`

 
    return(
        <>
        
           <div  className='break-inside relative overflow-hidden flex flex-col justify-between space-y-3 text-sm rounded-xl min-w-[16rem] max-w-[23rem] p-4 mb-4 bg-white text-black dark:bg-slate-800 dark:text-white'>
        <div className='flex items-center justify-between font-medium'>
            <span className='uppercase text-xs text-green-500'>edit collabs</span>
            <span className='text-xs text-slate-500'>#team</span>
        </div>
        <a href={"/pages/homepage/userMainPage/"+props._id}>
        <div className='flex flex-row items-center space-x-3'>
            <div className='flex flex-none items-center justify-center w-10 h-10 rounded-full bg-green-500 text-white'>
            <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'>
                <polygon points='14 2 18 6 7 17 3 17 3 13 14 2' />
                <line x1='3' y1='22' x2='21' y2='22' />
            </svg>
            </div>
            <span className='text-base font-medium'>{props.name}</span>
        </div>
        </a>
        <div>{props.description}</div>
        <div className='flex justify-between items-center'>
            <div>
            <dt className='sr-only'>Users</dt>
            <dd className='flex justify-start -space-x-1.5'>
            <a href='#' className='inline-block -m-1'>
                <img className='w-7 h-7 rounded-full ring-2 ring-white dark:ring-slate-800' src={session?.user.image} alt='avatar' />
                </a>
            {/* {props.collabUser.map(()=>{
              return<a href='#' className='inline-block -m-1'>
                <img className='w-7 h-7 rounded-full ring-2 ring-white dark:ring-slate-800' src={session?.user.image} alt='avatar' />
                </a>
            })
               
            } */}
                
                <span className='inline-block -m-1 rounded-full ring-2 ring-white dark:ring-slate-800'>
                <svg width='28' height='28' viewBox='0 0 31 31' fill='none' xmlns='http://www.w3.org/2000/svg' className='text-slate-200 dark:text-slate-600'>
                    <path d='M31 15.5C31 24.0604 24.0604 31 15.5 31C6.93959 31 0 24.0604 0 15.5C0 6.93959 6.93959 0 15.5 0C24.0604 rem0 31 6.93959 31 15.5ZM8.20879 15.5C8.20879 19.5268 11.4732 22.7912 15.5 22.7912C19.5268 22.7912 22.7912 19.5268 22.7912 15.5C22.7912 11.4732 19.5268 8.20879 15.5 8.20879C11.4732 8.20879 8.20879 11.4732 8.20879 15.5Z' fill='currentColor' />
                    <path d='M31 15.5C31 18.049 30.3714 20.5586 29.1698 22.8066C27.9682 25.0547 26.2307 26.9716 24.1113 28.3878C21.9919 29.8039 19.556 30.6755 17.0193 30.9254C14.4826 31.1752 11.9234 30.7956 9.56841 29.8201C7.21345 28.8447 5.1354 27.3035 3.51834 25.3331C1.90128 23.3627 0.795112 21.0239 0.297828 18.5239C-0.199455 16.0239 -0.0725081 13.4398 0.667425 11.0006C1.40736 8.56136 2.73744 6.34225 4.53984 4.53985L10.2876 10.2876C9.43046 11.1448 8.79791 12.2002 8.44602 13.3602C8.09413 14.5202 8.03376 15.7491 8.27025 16.9381C8.50675 18.127 9.03281 19.2393 9.80184 20.1764C10.5709 21.1134 11.5591 21.8464 12.6791 22.3103C13.799 22.7742 15.0161 22.9547 16.2225 22.8359C17.4289 22.7171 18.5874 22.3026 19.5953 21.6291C20.6033 20.9556 21.4295 20.0439 22.001 18.9748C22.5724 17.9058 22.8714 16.7122 22.8714 15.5H31Z' fill='#2BC86A' />
                </svg>
                </span>
            </dd>
            </div>
            <button onClick={()=>{setFolderCode(props.folderCode); folderdeleteApiSet(folderdeleteApi);foldereditApiSet(foldereditApi);setFormtype("UPDATE");setToggle(true);updateFormFill(props.name,props.description)}} className='flex items-center justify-center text-xs font-medium rounded-full px-4 py-1 space-x-1 border-2 border-black bg-white hover:bg-black hover:text-white text-black dark:bg-slate-800 dark:text-white dark:border-white dark:hover:bg-white dark:hover:text-black'>
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
