"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

// import Workspace from "@/components/workSpaces/page";
import DocsInFolder from "@/components/DocsInFolder/page";
import SubFolders from "@/components/DocsUnderWorkSpace/page";
import ImgInFolder from "@/components/LoggedIn/ImgInFolder/page";
import LinksInFolder from "@/components/LoggedIn/LinksInFolder/page";
import TextInFolder from "@/components/LoggedIn/TextInFolder/page";
import axios from 'axios';

const WorkspaceOpenView = () => {
    const {id}=useParams()
    const addLinkApi=`/api/uploadfile/link/${id}`
    const addTextApi=`/api/uploadfile/note/${id}`
    const getImgApi=`/api/uploadfile/getImgs/${id}`
    const getDocApi=`/api/uploadfile/getfiles/${id}`
    console.log(addLinkApi);
    const [links,setLinks]=useState([4,4,444])
    const [texts,setTexts]=useState([3,3,3,3,3]);
    const [imgs,setImgs]=useState([3,3,3,3,3]);
    const [docs,setDocs]=useState([3,3,3,3,3]);
      
    const getAllLinks=async()=>{
       const apiData=await axios.get(addLinkApi)
      //  console.log("all links",apiData?.data)
         setLinks(apiData.data)
         console.log(id);
        // const apid=[1,2];
        // setLinks(apid);
    }
    const getAllTexts=async()=>{
        const apiData=await axios.get(addTextApi)
        // console.log(apiData.data);
          setTexts(apiData.data)
          // setTexts([1,2]);
     }
     const getAllImgs=async()=>{
        const apiData=await axios.get(getImgApi)
          setImgs(apiData.data)
     }
     const getAllDocs=async()=>{
        const apiData=await axios.get(getDocApi)
        // console.log(apiData);
          setDocs(apiData.data)
     }

    const putLink=async(link)=>{
      //  await axios.post(addLinkApi,{contentLink:link||"kjgajk",contentType:"link"})
    }
    useEffect(()=>{
        getAllLinks()
        getAllTexts()
        getAllImgs()
        getAllDocs()
    },[])
    

    return (
        <>
    
            {/* <Filter/> */}
            <SubFolders putLink={putLink} />
            <LinksInFolder links={links} id={id}/>
            <TextInFolder texts={texts}/>
            <ImgInFolder imgs={imgs}/>
            <DocsInFolder docs={docs}/>
        </>
        )
}
export default WorkspaceOpenView;