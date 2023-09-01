"use client";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
const TextInFolder = ({ texts }) => {
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
      <span class="flex ml-8 text-4xl mt-20 mb-8">
        <svg
          class="w-8 h-10 mr-2 text-gray-800 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z" />
          <path d="M6.737 11.061a2.961 2.961 0 0 1 .81-1.515l6.117-6.116A4.839 4.839 0 0 1 16 2.141V2a1.97 1.97 0 0 0-1.933-2H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18v-3.093l-1.546 1.546c-.413.413-.94.695-1.513.81l-3.4.679a2.947 2.947 0 0 1-1.85-.227 2.96 2.96 0 0 1-1.635-3.257l.681-3.397Z" />
          <path d="M8.961 16a.93.93 0 0 0 .189-.019l3.4-.679a.961.961 0 0 0 .49-.263l6.118-6.117a2.884 2.884 0 0 0-4.079-4.078l-6.117 6.117a.96.96 0 0 0-.263.491l-.679 3.4A.961.961 0 0 0 8.961 16Zm7.477-9.8a.958.958 0 0 1 .68-.281.961.961 0 0 1 .682 1.644l-.315.315-1.36-1.36.313-.318Zm-5.911 5.911 4.236-4.236 1.359 1.359-4.236 4.237-1.7.339.341-1.699Z" />
        </svg>
        <p className="ml-2 mb-4 text-xl font-extrabold text-gray-900 dark:text-white  lg:text-4xl">
          Your{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-sky-600 from-purple-600">
            Notes
          </span>
        </p>
        {/* </motion.p> */}
      </span>
      <div className="grid  place-items-center sm:grid-cols-2 lg:grid-cols-4">
        {texts.map((text, index) => {
          return <TextHelper text={text} index={index} />;
        })}
      </div>
    </>
  );
};
const TextHelper = ({ text }, { index }) => {
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
  const [toggle, setToggle] = useState(false);
  const [editable, setEditable] = useState(false);
  const [title, setTitle] = useState("title");
  const [desc, setDesc] = useState("description");
  const inputRef = useRef(null);
  const handleEdit = () => {
    setEditable(true);
    document.getElementById(`noteTitle${index}`).style.background = "#334155";
    document.getElementById(`noteDesc${index}`).style.background = "#334155";
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
    document.getElementById(`noteTitle${index}`).style.background = "#000";
    document.getElementById(`noteDesc${index}`).style.background = "#000";
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
            value={text.name}
            onChange={handleTitleChange}
            ref={inputRef}
            readOnly={!editable}
            tabIndex={"0"}
            type="text"
            id={`noteTitle${index}`}
            class="mb-2 p-1 rounded text-lg font-bold w-full text-white bg-transparent"
          />
          {/* </h5> */}
          {/* <p class="text-sm text-left text-gray-700 dark:text-gray-400">
                    Here are the biggest enterprise technology.
                  </p> */}
          <textarea
            value={text.description}
            onChange={handleDescChange}
            ref={inputRef}
            readOnly={!editable}
            tabIndex={"0"}
            type="text"
            id={`noteDesc${index}`}
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
};
export default TextInFolder;
