"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
// import Workspace from "@/components/workSpaces/page";
import DocsInFolder from "@/components/DocsInFolder/page";
import SubFolders from "@/components/DocsUnderWorkSpace/page";
import ImgInFolder from "@/components/LoggedIn/ImgInFolder/page";
import LinksInFolder from "@/components/LoggedIn/LinksInFolder/page";
import TextInFolder from "@/components/LoggedIn/TextInFolder/page";
import axios from "axios";
const WorkspaceOpenView = () => {
    const {id}=useParams()
    const addLinkApi=`/api/documents/link/${id}`
    const addTextApi=`/api/documents/text/${id}`
    const addImgApi=`/api/documents/img/${id}`
    console.log(addLinkApi);
    const [links,setLinks]=useState([4,4,4,4,4,4,4,4])
    const [texts,setTexts]=useState([3,3,3,3,3]);
    const [imgs,setImgs]=useState([3,3,3,3,3]);
    const [docs,setDocs]=useState([3,3,3,3,3]);
    
    const getAllLinks=async()=>{
       const apiData=await axios.get(addLinkApi)
         setLinks(apiData.data)
    }
    const getAllTexts=async()=>{
        const apiData=await axios.get(addTextApi)
          setTexts(apiData.data)
     }
     const getAllImgs=async()=>{
        const apiData=await axios.get(addImgApi)
          setImgs(apiData.data)
     }
     const getAllDocs=async()=>{
        const apiData=await axios.get(addDocApi)
          setDocs(apiData.data)
     }

    const putLink=async(link)=>{
      //  await axios.post(addLinkApi,{contentLink:link||"kjgajk",contentType:"link"})
    }
    useEffect(()=>{
        // getAllLinks()
        //getAllTexts()
        //getAllImgs()
        //getAllDocs()
    },[])
    

    return (
        <>
    
            {/* <Filter/> */}
            <SubFolders putLink={putLink} />
            <LinksInFolder links={links} />
            <TextInFolder texts={texts}/>
            
            <ImgInFolder imgs={imgs}/>
            <DocsInFolder docs={docs}/>
        </>
        )
}
export default WorkspaceOpenView;