"use client";
import { useState } from "react";
const TextInFolder = ({ texts }) => {
  const [toggle, setToggle] = useState(false);
  return (
    <>
      <div className="grid  place-items-center sm:grid-cols-2 lg:grid-cols-4">
        {texts.map((text) => {
          return (
            <div>
              {/* <a class="block min-w-60 max-w-60 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <div class="flex flex-inline justify-between">
                  <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {" "}
                    default Note Heading..........................
                  </h5>
                  <button
                    onClick={() => {
                      setToggle((prev) => !prev);
                    }}
                    class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
                  >
                    {" "}
                    <svg
                      class="w-6 h-5 mt-1 text-orange-500"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 4 15"
                    >
                      <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                    </svg>
                  </button>
                </div>
                <p class="font-normal text-gray-700 dark:text-gray-400">
                  Details of the text{" "}
                </p>
              </a> */}

              <div
                onContextMenu={(e) => {
                  e.preventDefault();
                  // () => {
                  setToggle((prev) => !prev);
                  // };
                }}
                class="block w-64 mt-10 p-6  border border-gray-200 rounded-lg shadow  dark:border-gray-700 "
              >
                <h5 class="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                  Noteworthy technology
                </h5>
                <p class="text-sm text-left text-gray-700 dark:text-gray-400">
                  Here are the biggest enterprise technology.
                </p>
                {toggle && (
                  <div className="mt-2">
                    <button className="mr-2 hover:bg-green-400 p-2 rounded">
                      <svg
                        class="w-[17px] h-[17px] text-gray-800 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 18"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M4.109 17H1v-2a4 4 0 0 1 4-4h.87M10 4.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm7.95 2.55a2 2 0 0 1 0 2.829l-6.364 6.364-3.536.707.707-3.536 6.364-6.364a2 2 0 0 1 2.829 0Z"
                        />
                      </svg>
                    </button>
                    <button className="mr-2 hover:bg-red-700 p-2 rounded">
                      <svg
                        class="w-[17px] h-[17px] text-gray-800 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 20"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z"
                        />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
              {/* 
              {toggle && (
                <div
                  class="mt-2  inline-flex rounded-md shadow-sm "
                  role="group"
                >
                  <button
                    type="button"
                    class="ml-16 px-3 py-2 text-sm font-medium text-gray-900 bg-white border mr-6 border-gray-200 rounded hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-dark dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-800 dark:focus:ring-blue-500 dark:focus:text-white"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    class="px-3  py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-red-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-blue-500 dark:focus:text-white"
                  >
                    Delete
                  </button>
                </div>
              )} */}
            </div>
          );
        })}
      </div>
    </>
  );
};
export default TextInFolder;
