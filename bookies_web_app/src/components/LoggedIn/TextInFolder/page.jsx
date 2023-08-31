"use client";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
const TextInFolder = ({ texts }) => {
  const [toggle, setToggle] = useState(false);

  const control = useAnimation();
  const [ref, inView] = useInView();
  const boxVariant = {
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.2 },
    },
    hidden: { opacity: 0, scale: 0.8 },
  };
  useEffect(() => {
    if (inView) {
      control.start("visible");
    } else {
      control.start("hidden");
    }
  }, [control, inView]);

  return (
    <>
      <div className="grid  place-items-center sm:grid-cols-2 lg:grid-cols-4">
        <h1>Your Notes</h1>
        {texts.map((text) => {
          const [toggle, setToggle] = useState(false);
          const [editable, setEditable] = useState(false);
          const [title, setTitle] = useState("title");
          const [desc, setDesc] = useState("description");
          const inputRef = useRef(null);
          const handleEdit = () => {
            setEditable(true);
            document.getElementById("noteTitle").style.background = "#334155";
            document.getElementById("noteDesc").style.background = "#334155";
            inputRef.current.focus();
          };
          const handleTitleChange = (e) => {
            setTitle(e.target.value);
          };
          const handleDescChange = (e) => {
            setDesc(e.target.value);
          };
          const handleSave = () => {
            setEditable(false);
            setToggle((prev) => !prev);
            document.getElementById("noteTitle").style.background = "#000";
            document.getElementById("noteDesc").style.background = "#000";
          };
          useEffect(() => {
            inputRef.current.disabled = !editable;
          }, [editable]);
          return (
            <div>
              <motion.div
                initial="hidden"
                animate={control}
                ref={ref}
                variants={boxVariant}
              >
                <div
                  onContextMenu={(e) => {
                    e.preventDefault();
                    // () => {
                    setToggle((prev) => !prev);
                    // };
                  }}
                  class="block w-64 mt-10 p-6  border border-gray-200 rounded-lg shadow  dark:border-gray-700 "
                >
                  {/* <h5 class="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white"> */}
                  {/* Noteworthy technology */}
                  <input
                    value={title}
                    onChange={handleTitleChange}
                    ref={inputRef}
                    readOnly={!editable}
                    tabIndex={"0"}
                    type="text"
                    id="noteTitle"
                    class="mb-2 p-1 rounded text-lg font-bold w-full text-white bg-transparent"
                  />
                  {/* </h5> */}
                  {/* <p class="text-sm text-left text-gray-700 dark:text-gray-400">
                    Here are the biggest enterprise technology.
                  </p> */}
                  <textarea
                    value={desc}
                    onChange={handleDescChange}
                    ref={inputRef}
                    readOnly={!editable}
                    tabIndex={"0"}
                    type="text"
                    id="noteDesc"
                    class="mb-2 p-1 rounded text-sm font-bold w-full text-gray-400 bg-transparent"
                  />
                  {toggle && (
                    <div className="mt-2">
                      <button
                        className="mr-2 hover:bg-green-400 p-2 rounded"
                        onClick={editable ? handleSave : handleEdit}
                      >
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
              </motion.div>
            </div>
          );
        })}
      </div>
    </>
  );
};
export default TextInFolder;
