"use client";
import axios from "axios";
import { useAnimation } from "framer-motion";
import { useEffect, useState } from "react";

const LinksInFolder = ({ links }) => {
  return (
    <>
      <span class="flex ml-8 text-4xl mt-20 mb-8">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-8 h-10 "
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
          />
        </svg>
        {/* <motion.p initial="hidden" animate="visible" variants={textVariant}> */}
        <p className="ml-2 mb-4 text-xl font-extrabold text-gray-900 dark:text-white  lg:text-4xl">
          Your{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-sky-600 from-purple-600">
            Links
          </span>
        </p>
        {/* </motion.p> */}
      </span>

      <div className="grid  place-items-center sm:grid-cols-2 lg:grid-cols-4">
        {links.map((link, index) => {
          return <LinkItem index={index} link={link} />;
        })}
      </div>
    </>
  );
};

const LinkItem = ({ link }) => {
  const control = useAnimation();
  // const [ref, inView] = useInView();
  const [toggle, setToggle] = useState(false);
  const [editable, setEditable] = useState(false);
  let [text, setText] = useState(link.contentLink);

  // console.log(text);
  useEffect(() => {
    setText(link.contentLink);
  }, [link.contentLink]);
  // const boxVariant = {
  //   visible: {
  //     opacity: 1,
  //     scale: 1,
  //     transition: { duration: 0.4 },
  //   },
  //   hidden: { opacity: 0, scale: 0.8 },
  // };
  // useEffect(() => {
  //   if (inView) {
  //     control.start("visible");
  //   } else {
  //     control.start("hidden");
  //   }
  // }, [control, inView]);
  const handleEdit = () => {
    setEditable(!editable);
    // document.getElementById(`input${index}`).style.background = "white";
  };
  const handleChange = (e) => {
    setText(e.target.value);
  };
  const handleSave = async () => {
    setToggle((prev) => !prev);
    // document.getElementById(`input${index}`).style.background = "#0f172a";
    await axios.put(`/api/uploadfile/link/${link.folderId}/${link._id}`, {
      contentLink: text,
    });
    handleEdit();
  };

  // const handleClick = () => {
  //   if (!editable) {
  //     document.getElementById(`input${index}`).style.borderColor =
  //       "transparent";
  //     window.open(link.contentLink, "_blank");
  //   }
  // };

  const handleDelete = async () => {
    console.log(link._id);
    await axios.delete(`/api/uploadfile/link/${link.folderId}/${link._id}`);
    location.reload();
  };

  function addHttpToHref(link) {
    //all links will be absolute
    if (/^https?:\/\//.test(link) || /^http?:\/\//.test(link)) {
      return link;
    } else {
      return "http://" + link;
    }
  }

  return (
    // <motion.div
    //   initial="hidden"
    //   animate={control}
    //   ref={ref}
    //   variants={boxVariant}
    // >
    <div class="mb-20 w-60">
      <div
        id="toast-default"
        class="border  mt-2 p-3 bg-gray-900 hover:text-gray-200 hover:bg-none flex-col justify-between items-center w-full max-w-xs  rounded-lg shadow  "
        role="alert"
        onContextMenu={(e) => {
          e.preventDefault();
          // () => {
          setToggle((prev) => !prev);
          // };
        }}
      >
        <div
          id="toast-default"
          class="flex items-center w-full max-w-xs p-4 text-gray-500  rounded-lg shadow dark:text-gray-400 "
          role="alert"
        >
          <div class="inline-flex items-center justify-center  flex-shrink-0 w-8 h-8 text-green-300 bg-gray-800 rounded-lg  ">
            <svg
              class="w-4 h-4 "
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
                d="M15.147 15.085a7.159 7.159 0 0 1-6.189 3.307A6.713 6.713 0 0 1 3.1 15.444c-2.679-4.513.287-8.737.888-9.548A4.373 4.373 0 0 0 5 1.608c1.287.953 6.445 3.218 5.537 10.5 1.5-1.122 2.706-3.01 2.853-6.14 1.433 1.049 3.993 5.395 1.757 9.117Z"
              />
            </svg>
            <span class="sr-only">Fire icon</span>
          </div>
          <div class="ml-3 text-sm font-normal ">
            {/* <p contentEditable={true}>Links lorem20</p> */}
            {/* <a href={text}> */}
            {editable ? (
              <input
                className=" w-full rounded p-2 bg-transparent cursor-pointer bg-gray-800"
                // id={`input${index}`}
                type="text"
                value={text}
                onChange={handleChange}
                // onClick={handleClick}
                onBlur={handleSave}
                tabIndex={"0"}
                autoFocus
              />
            ) : (
              <div>
                <a
                  href={addHttpToHref(text)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <input
                    type="text"
                    className=" w-full rounded p-2 bg-transparent cursor-pointer"
                    value={text}
                    readOnly
                  />
                </a>
              </div>
            )}
            {/* </a> */}
          </div>
        </div>

        {toggle && (
          <div class="mt-2">
            {/* edit button */}
            <button
              onClick={handleEdit}
              className="ml-3  p-2 hover:bg-green-400  rounded "
            >
              <svg
                class="w-[16px] h-[16px] text-gray-800 dark:text-white"
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
            {/* delete button */}
            <button
              className="ml-1 hover:bg-red-700 p-2  rounded"
              onClick={handleDelete}
            >
              <svg
                class="w-[16px] h-[16px] text-gray-800 dark:text-white"
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
    </div>
    // </motion.div>
  );
};
export default LinksInFolder;
