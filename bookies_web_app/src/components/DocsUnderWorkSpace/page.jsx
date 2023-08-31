"use client";
import axios from "axios";
import { getSession, useSession } from "next-auth/react";
import { redirect, useParams } from "next/navigation";
import { useEffect, useState } from "react";
// import Workspace from "../Folder/page";

const SubFolders = () => {
  const handleLink = (e) => {
    e.preventDefault();
    // alert(12);
    const val = setVal(prompt("Enter a link"));
  };

  const handleNote = (e) => {
    e.preventDefault();
    setToggle((prev) => !prev);
    // alert(21);
    setNoteToggle((prev) => !prev);
  };
  const [val, setVal] = useState("def");

  console.log(val);
  const { data: session, status } = useSession();

  const [toggle, setToggle] = useState(false);
  const [toggle1, setToggle1] = useState(false);
  const [noteToggle, setNoteToggle] = useState(false);

  if (status == "unauthenticated") {
    redirect("/");
  }
  const { id } = useParams();
  //   const handleFile = (e) => {
  //     e.preventDefault();
  //     redirect("/pages/upload");
  //   };

  const FolderApi = `/api/subfolders/${id}`;
  const postNoteApi=`/api/uploadfile/note/${id}`
  const postLinkApi=`/api/uploadfile/link/${id}`

  const [Folder, setFolder] = useState([]);
  const [newFolder, setnewFolder] = useState({
    gmail: "",
    name: "",
    description: "",
    isWorkSpace: false,
  });
  const formselect = ["CREATE", "UPDATE"];
  const [formtype, setFormtype] = useState(formselect[0]);
  let [foldereditApi, foldereditApiSet] = useState("");
  let [folderdeleteApi, folderdeleteApiSet] = useState("");

  const folderEdit = async () => {
    console.log(foldereditApi);
    await axios.put(foldereditApi, newFolder);
    await getFolder();
  };
  if (status == "unauthenticated") {
    redirect("/");
  }
  const updateFormFill = (name, description) => {
    setnewFolder({ ...newFolder, name, description });
  };
  const folderdelete = async () => {
    await axios.delete(folderdeleteApi);
    await getFolder();
  };
  const postLinks=async()=>{
    await axios.post(postLinkApi,{})
  }
  const postNote=async()=>{

  }
  // const updateWorkspace = () => {};
  // const searchResult = (e) => {
  //   const filterdata = constFolder.filter((ele) => {
  //     return ele.name.includes(e.target.value);
  //   });
  //   setFolder(filterdata);
  // };
  const getFolder = async () => {
    const content = await axios.get(FolderApi);
    setFolder(content.data);
    // constsetFolder(content.data);
  };
  const createFolder = async () => {
    const sessionData = await getSession();
    await axios.post(FolderApi, {
      ...newFolder,
      gmail: sessionData?.user?.email,
    });
    await getFolder();
  };
  useEffect(() => {
    getFolder();
  }, []);

  const [noteTitle, setNoteTitle] = useState("");
  const [noteDesc, setNoteDesc] = useState("");

  const handleNoteSubmit = () => {
    // e.preventDefault();
    console.log(noteTitle);
  };

  return (
    <>
      {/* Folder Modal */}
      {toggle1 && (
        <div className=" fixed z-50 flex w-screen h-screen justify-center items-center bg-zinc-950/70 ">
          <div
            id="authentication-modal"
            tabindex="-1"
            aria-hidden="true"
            className="w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
          >
            <div className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 mx-auto">
              {/* <!-- Modal content --> */}
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <button
                  onClick={() => {
                    setToggle1((prev) => !prev);
                    setnewFolder({
                      ...newFolder,
                      name: "",
                      description: "",
                      isWorkSpace: true,
                    });
                  }}
                  type="button"
                  className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="authentication-modal"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Create Folder</span>
                </button>
                <div className="px-6 py-6 lg:px-8">
                  <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                    {formtype == "CREATE" ? "Create" : "Update"} New Folder
                  </h3>
                  <form className="space-y-6" action="#">
                    <div>
                      <label
                        for="name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Folder Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="Folder Name"
                        required
                        value={newFolder.name}
                        onChange={(e) =>
                          setnewFolder({
                            ...newFolder,
                            name: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <label
                        for="description"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Description
                      </label>
                      <textarea
                        rows="5"
                        type="text"
                        name="description"
                        id="description"
                        placeholder="Description"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        required
                        value={newFolder.description}
                        onChange={(e) =>
                          setnewFolder({
                            ...newFolder,
                            description: e.target.value,
                          })
                        }
                      />
                    </div>

                    {formtype == "CREATE" && (
                      <button
                        type="button"
                        onClick={() => {
                          createFolder();
                          setToggle1(false);
                          setnewFolder({
                            ...newFolder,
                            name: "",
                            description: "",
                            isWorkSpace: false,
                          });
                        }}
                        className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Create
                      </button>
                    )}
                    {formtype == "UPDATE" && (
                      <button
                        onClick={() => {
                          folderEdit();
                          setToggle1(false);
                          setnewFolder({
                            ...newFolder,
                            name: "",
                            description: "",
                            isWorkSpace: false,
                          });
                        }}
                        className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Update
                      </button>
                    )}
                    {formtype == "UPDATE" && (
                      <button
                        onClick={() => {
                          folderdelete();
                          setToggle1(false);
                          setnewFolder({
                            ...newFolder,
                            name: "",
                            description: "",
                            isWorkSpace: false,
                          });
                        }}
                        className="w-full text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                      >
                        Delete
                      </button>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* <!-- Main modal --> */}

      {toggle && (
        <div className=" fixed z-50 flex w-screen h-screen justify-center items-center bg-zinc-950/70 ">
          <div
            id="authentication-modal"
            tabindex="-1"
            aria-hidden="true"
            class=" w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
          >
            <div class="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 mx-auto">
              {/* <!-- Modal content --> */}
              <div class=" relative bg-white rounded-lg shadow dark:bg-gray-700">
                <button
                  onClick={() => setToggle((prev) => !prev)}
                  type="button"
                  class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="authentication-modal"
                >
                  <svg
                    class="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span class="sr-only">Close modal</span>
                </button>
                <div class="px-3 py-10 lg:px-8">
                  <h3 class="mb-7 text-xl font-medium text-gray-900 dark:text-white">
                    Select and to your secound Brain 🧠Enhance{" "}
                  </h3>
                  <form class="ml-5" action="#">
                    <div class="">
                      {/* <button onClick={(e) => handleFile}> */}
                      <a
                        href="/pages/upload"
                        class="ml-10 mb-5  relative inline-flex items-center justify-center px-10 py-4 overflow-hidden font-mono font-medium tracking-tighter text-white bg-gray-800 rounded-lg group"
                      >
                        <span class="absolute w-0 h-0 transition-all duration-500 ease-out bg-green-400 rounded-full group-hover:w-56 group-hover:h-56"></span>
                        <span class="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
                        <span class="relative">Upload files</span>
                      </a>
                      {/* </button> */}
                      <button onClick={handleNote}>
                        <a class="ml-10 mb-5  relative inline-flex items-center justify-center px-10 py-4 overflow-hidden font-mono font-medium tracking-tighter text-white bg-gray-800 rounded-lg group">
                          <span class="absolute w-0 h-0 transition-all duration-500 ease-out bg-blue-500 rounded-full group-hover:w-56 group-hover:h-56"></span>
                          <span class="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
                          <span class="relative">Quick notes</span>
                        </a>
                      </button>
                      <button onClick={handleLink}>
                        <a class="ml-10 mb-5 relative inline-flex items-center justify-center px-10 py-4 overflow-hidden font-mono font-medium tracking-tighter text-white bg-gray-800 rounded-lg group">
                          <span class="absolute w-0 h-0 transition-all duration-500 ease-out bg-blue-500 rounded-full group-hover:w-56 group-hover:h-56"></span>
                          <span class="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
                          <span class="relative">Embed Links</span>
                        </a>
                      </button>
                      <a
                        href="/pages/upload"
                        class="ml-10 mb-5 relative inline-flex items-center justify-center px-10 py-4 overflow-hidden font-mono font-medium tracking-tighter text-white bg-gray-800 rounded-lg group"
                      >
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
      )}
      {/* Text Toggle */}
      {noteToggle && (
        <div className=" fixed z-50 flex w-screen h-screen justify-center items-center bg-zinc-950/70 ">
          <div
            id="authentication-modal"
            tabindex="-1"
            aria-hidden="true"
            className="w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
          >
            <div className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 mx-auto">
              {/* <!-- Modal content --> */}
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <button
                  onClick={() => {
                    setNoteToggle((prev) => !prev);
                  }}
                  type="button"
                  className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="authentication-modal"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                </button>
                <div className="px-6 py-6 lg:px-8">
                  <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                    Add Note
                  </h3>
                  <form className="space-y-6" action="#">
                    <div>
                      <label
                        for="title"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Note Title
                      </label>
                      <input
                        type="text"
                        name="title"
                        id="title"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="Note Title"
                        required
                        onChange={(e) => setNoteTitle(e.target.value)}
                      />
                    </div>
                    <div>
                      <label
                        for="description"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Note Description
                      </label>
                      <textarea
                        rows="5"
                        type="text"
                        name="description"
                        id="description"
                        placeholder="Note Description"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        required
                        onChange={(e) => setNoteDesc(e.target.value)}
                      />
                    </div>

                    {
                      <button
                        type="button"
                        onClick={() => {
                          handleNoteSubmit();
                          setNoteToggle(false);
                        }}
                        className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Add Note
                      </button>
                    }
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <section class="text-gray-600 body-font px-4">
        <div className="">
          <div class="grid gap-auto  mb-10 pt-6 md:mb-16 lg:grid-cols-2 ">
            <h2 class="mb-4 inline text-start font-serif text-3xl font-bold text-gray-200 md:mb-6 md:text-4xl">
              Welcome {session?.user.name}
            </h2>

            <div className="columns-2  ">
              <button
                onClick={() => {
                  setToggle1((prev) => !prev);
                  setFormtype("CREATE");
                }}
                data-modal-toggle="authentication-modal"
                class="sm:ml-10 mr-3 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-blue-800 "
                type="button"
              >
                Create
              </button>
              <button
                onClick={() => setToggle((prev) => !prev)}
                data-modal-target="authentication-modal"
                data-modal-toggle="authentication-modal"
                class=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 "
                type="button"
              >
                Add-on
              </button>
              {/* searchbox */}

              <div class=" mb-4 flex flex-wrap">
                <input
                  type="search"
                  class=" m-0 w-[1px] min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                  placeholder="Search"
                  aria-label="Search"
                  aria-describedby="button-addon2"
                />
                <span
                  class="input-group-text flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-neutral-700 dark:text-neutral-200"
                  id="basic-addon2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    class="h-5 w-5"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </div>
          <div class="mx-5 grid gap-8 place-items-center sm:grid-cols-2 sm:gap-12 lg:grid-cols-4  xl:gap-16">
            {Folder.map((ele) => {
              return (
                <>
                  <FolderCard
                    props={ele}
                    setFormtype={setFormtype}
                    setToggle1={setToggle1}
                    updateFormFill={updateFormFill}
                    foldereditApiSet={foldereditApiSet}
                    folderdeleteApiSet={folderdeleteApiSet}
                  />
                </>
              );
            })}

            <br />
          </div>
        </div>
      </section>
    </>
  );
};

export default SubFolders;

const FolderCard = ({
  props,
  setToggle1,
  setFormtype,
  updateFormFill,
  foldereditApiSet,
  folderdeleteApiSet,
}) => {
  const { data: session, status } = useSession();
  const foldereditApi = `/api/folderEdit/${props._id}`;
  const folderdeleteApi = `/api/delete/folder/${props._id}`;

  return (
    <>
      <div className="break-inside relative overflow-hidden flex flex-col justify-between space-y-3 text-sm rounded-xl min-w-[16rem] max-w-[23rem] p-4 mb-4 bg-white text-black dark:bg-slate-800 dark:text-white">
        <div className="flex items-center justify-between font-medium">
          <span className="uppercase text-xs text-green-500">edit collabs</span>
          <span className="text-xs text-slate-500">#team</span>
        </div>
        <a href={"/pages/homepage/userMainPage/" + props._id}>
          <div className="flex flex-row items-center space-x-3">
            <div className="flex flex-none items-center justify-center w-10 h-10 rounded-full bg-green-500 text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polygon points="14 2 18 6 7 17 3 17 3 13 14 2" />
                <line x1="3" y1="22" x2="21" y2="22" />
              </svg>
            </div>
            <span className="text-base font-medium">{props.name}</span>
          </div>
        </a>
        <div>{props.description}</div>
        <div className="flex justify-between items-center">
          <div>
            <dt className="sr-only">Users</dt>
            <dd className="flex justify-start -space-x-1.5">
              <a href="#" className="inline-block -m-1">
                <img
                  className="w-7 h-7 rounded-full ring-2 ring-white dark:ring-slate-800"
                  src={session?.user.image}
                  alt="avatar"
                />
              </a>
              {/* {props.collabUser.map(()=>{
              return<a href='#' className='inline-block -m-1'>
                <img className='w-7 h-7 rounded-full ring-2 ring-white dark:ring-slate-800' src={session?.user.image} alt='avatar' />
                </a>
            })
               
            } */}

              <span className="inline-block -m-1 rounded-full ring-2 ring-white dark:ring-slate-800">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 31 31"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-slate-200 dark:text-slate-600"
                >
                  <path
                    d="M31 15.5C31 24.0604 24.0604 31 15.5 31C6.93959 31 0 24.0604 0 15.5C0 6.93959 6.93959 0 15.5 0C24.0604 rem0 31 6.93959 31 15.5ZM8.20879 15.5C8.20879 19.5268 11.4732 22.7912 15.5 22.7912C19.5268 22.7912 22.7912 19.5268 22.7912 15.5C22.7912 11.4732 19.5268 8.20879 15.5 8.20879C11.4732 8.20879 8.20879 11.4732 8.20879 15.5Z"
                    fill="currentColor"
                  />
                  <path
                    d="M31 15.5C31 18.049 30.3714 20.5586 29.1698 22.8066C27.9682 25.0547 26.2307 26.9716 24.1113 28.3878C21.9919 29.8039 19.556 30.6755 17.0193 30.9254C14.4826 31.1752 11.9234 30.7956 9.56841 29.8201C7.21345 28.8447 5.1354 27.3035 3.51834 25.3331C1.90128 23.3627 0.795112 21.0239 0.297828 18.5239C-0.199455 16.0239 -0.0725081 13.4398 0.667425 11.0006C1.40736 8.56136 2.73744 6.34225 4.53984 4.53985L10.2876 10.2876C9.43046 11.1448 8.79791 12.2002 8.44602 13.3602C8.09413 14.5202 8.03376 15.7491 8.27025 16.9381C8.50675 18.127 9.03281 19.2393 9.80184 20.1764C10.5709 21.1134 11.5591 21.8464 12.6791 22.3103C13.799 22.7742 15.0161 22.9547 16.2225 22.8359C17.4289 22.7171 18.5874 22.3026 19.5953 21.6291C20.6033 20.9556 21.4295 20.0439 22.001 18.9748C22.5724 17.9058 22.8714 16.7122 22.8714 15.5H31Z"
                    fill="#2BC86A"
                  />
                </svg>
              </span>
            </dd>
          </div>
          <button
            onClick={() => {
              folderdeleteApiSet(folderdeleteApi);
              foldereditApiSet(foldereditApi);
              setFormtype("UPDATE");
              setToggle1(true);
              updateFormFill(props.name, props.description);
            }}
            className="flex items-center justify-center text-xs font-medium rounded-full px-4 py-1 space-x-1 border-2 border-black bg-white hover:bg-black hover:text-white text-black dark:bg-slate-800 dark:text-white dark:border-white dark:hover:bg-white dark:hover:text-black"
          >
            <span>Edit</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M5 12h13M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};
