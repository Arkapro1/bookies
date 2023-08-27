'use client'
import Workspace from "../workSpaces/page";
import { useSession } from "next-auth/react";
import { useState } from "react";
const SubFolders = () => {
    const { data: session, status } = useSession();
    const [toggle, setToggle] = useState(false);
    if (status == "unauthenticated") {
        redirect('/');
    }

    return (
        <>
            {/* <!-- Main modal --> */}


            {toggle &&
                <div className=" fixed z-50 flex w-screen h-screen justify-center items-center bg-zinc-950/70 ">
                    <div id="authentication-modal" tabindex="-1" aria-hidden="true" class="w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                        <div class="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 mx-auto">
                            {/* <!-- Modal content --> */}
                            <div class=" relative bg-white rounded-lg shadow dark:bg-gray-700">
                                <button onClick={() => setToggle((prev) => !prev)} type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
                                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                    </svg>
                                    <span class="sr-only">Close modal</span>
                                </button>
                                <div class="px-3 py-10 lg:px-8">
                                    <h3 class="mb-7 text-xl font-medium text-gray-900 dark:text-white">Select and to your secound Brain 🧠Enhance </h3>
                                    <form class="ml-5" action="#">
                                        <div class="">
                                            <a href="#_" class="ml-10 mb-5  relative inline-flex items-center justify-center px-10 py-4 overflow-hidden font-mono font-medium tracking-tighter text-white bg-gray-800 rounded-lg group">
                                                <span class="absolute w-0 h-0 transition-all duration-500 ease-out bg-green-400 rounded-full group-hover:w-56 group-hover:h-56"></span>
                                                <span class="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
                                                <span class="relative">Upload files</span>
                                            </a>
                                            <a href="#_" class="ml-10 mb-5  relative inline-flex items-center justify-center px-10 py-4 overflow-hidden font-mono font-medium tracking-tighter text-white bg-gray-800 rounded-lg group">
                                                <span class="absolute w-0 h-0 transition-all duration-500 ease-out bg-blue-500 rounded-full group-hover:w-56 group-hover:h-56"></span>
                                                <span class="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
                                                <span class="relative">Quick notes</span>
                                            </a>
                                            <a href="#_" class="ml-10 mb-5 relative inline-flex items-center justify-center px-10 py-4 overflow-hidden font-mono font-medium tracking-tighter text-white bg-gray-800 rounded-lg group">
                                                <span class="absolute w-0 h-0 transition-all duration-500 ease-out bg-blue-500 rounded-full group-hover:w-56 group-hover:h-56"></span>
                                                <span class="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
                                                <span class="relative">Embed Links</span>
                                            </a>
                                            <a href="#_" class="ml-10 mb-5 relative inline-flex items-center justify-center px-10 py-4 overflow-hidden font-mono font-medium tracking-tighter text-white bg-gray-800 rounded-lg group">
                                                <span class="absolute w-0 h-0 transition-all duration-500 ease-out bg-green-400 rounded-full group-hover:w-56 group-hover:h-56"></span>
                                                <span class="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
                                                <span class="relative">Upload image</span>
                                            </a>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
            <section class="text-gray-600 body-font px-4">

                <div className="">
                    <div class="grid gap-auto  mb-10 pt-6 md:mb-16 lg:grid-cols-2 ">
                        <h2 class="mb-4 inline text-start font-serif text-3xl font-bold text-gray-200 md:mb-6 md:text-4xl">Welcome {session?.user.name}</h2>
                        <div className="columns-2 ">


                            <button onClick={() => setToggle((prev) => !prev)} data-modal-target="authentication-modal" data-modal-toggle="authentication-modal" class=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 lg:ml-16 xl:ml-40" type="button">
                                Add-on
                            </button>
                            {/* searchbox */}

                            <div class=" mb-4 flex flex-wrap">
                                <input
                                    type="search"
                                    class=" m-0 w-[1px] min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                                    placeholder="Search"
                                    aria-label="Search"
                                    aria-describedby="button-addon2" />
                                <span
                                    class="input-group-text flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-neutral-700 dark:text-neutral-200"
                                    id="basic-addon2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        class="h-5 w-5">
                                        <path
                                            fill-rule="evenodd"
                                            d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                                            clip-rule="evenodd" />
                                    </svg>
                                </span>
                            </div>

                        </div>
                    </div>
                    <div class="mx-5 grid gap-8 place-items-center sm:grid-cols-2 sm:gap-12 lg:grid-cols-4  xl:gap-16">

                        <Workspace />
                        <Workspace />
                        <br />


                    </div>
                </div>
            </section>

        </>
    )
}

export default SubFolders;
const createFolderModal = () => {
    return (<>

        {/* <!-- Modal toggle --> */}




    </>)
}