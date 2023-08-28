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
              <a class="block min-w-60 max-w-60 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
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
              </a>
              {toggle && (
                <div class="mt-1 inline-flex rounded-md shadow-sm" role="group">
                  <button
                    type="button"
                    class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-green-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-blue-500 dark:focus:text-white"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-md hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-red-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-blue-500 dark:focus:text-white"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};
export default TextInFolder;
