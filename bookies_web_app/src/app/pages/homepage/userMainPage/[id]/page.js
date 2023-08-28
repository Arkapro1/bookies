"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useState } from "react";
// import Workspace from "@/components/workSpaces/page";
import SubFolders from "@/components/DocsUnderWorkSpace/page";
import LinksInFolder from "@/components/LoggedIn/LinksInFolder/page";
import TextInFolder from "@/components/LoggedIn/TextInFolder/page";
import ImgInFolder from "@/components/LoggedIn/ImgInFolder/page";
import DocsInFolder from "@/components/DocsInFolder/page";
import Filter from "@/components/Filter/page";
const WorkspaceOpenView = () => {
    return (
        <>

            <Filter/>
            <SubFolders />
            <LinksInFolder />
            <TextInFolder />
            <ImgInFolder />
            <DocsInFolder />
        </>)
}
export default WorkspaceOpenView;