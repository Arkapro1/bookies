"use client";
// import { motion, useAnimation } from "framer-motion";
// import { useEffect } from "react";
// import { useInView } from "react-intersection-observer";
// text split animation  

// const Play=()=>{
//     const sentence={
//       hidden:{
//         opacity:1
//       },
//       visible:{
//         opacity:1,
//         transition:{
//           delay:0.5,
//           staggerChildren:0.08
//         }
//       }
//     }
//     const letter={
//       hidden:{
//         opacity:0,y:100
//       },
//       visible:{opacity:1,y:0}
//     }
//     const word="Welcome User";

//     return (
//     <>
//         <motion.h3 variants={sentence} initial="hidden" animate="visible">
//             {word.split("").map((char,index)=>{
//               return(
//                 <motion.span key={char+"-"+index} variants={letter}>
//                   {char}
//                 </motion.span>
//               )
//             })}
//         </motion.h3>
//     </>
//     )
// }

// const Box=({num})=>{
//   const control=useAnimation()
//   const [ref,inView]=useInView()
//   const boxVariant={
//     visible:{opacity:1,scale:1,transition:{duration:0.6},color:"red"},
//     hidden:{opacity:0,scale:0.8,color:"white"}
//   } 
//   useEffect(()=>{
//     if(inView){
//       control.start("visible")
//     }
//     else{
//       control.start("hidden")
//     }
//   },[control,inView])
//   return(
//     <motion.div initial="hidden"  animate={control} ref={ref} variants={boxVariant}>
//       <h2 className="p-20 border border-white w-1/4 my-56">Box {num}</h2>
//     </motion.div>
//   )
// }

// const Play=()=>{
//   return(
//     <div>
//       <Box num={1}/>
//       <Box num={2}/>
//     </div>
//   )
// }
// export default Play;

// components/EditableInput.js

import { useState } from 'react';

const EditableInput = () => {
  const [isEditable, setIsEditable] = useState(false);
  const [text, setText] = useState('Initial Text');

  const toggleEdit = () => {
    setIsEditable(!isEditable);
  };

  const handleInputChange = (e) => {
    const ip=document.getElementById('ip');
    ip.style.color='red';
    ip.style.background='blue';
    setText(e.target.value);
  };

  return (
    <div>
      {isEditable ? (
        <input
          id="ip"
          type="text"
          value={text}
          onChange={handleInputChange}
          onBlur={toggleEdit}
          className='text-red-200 bg-gray-600'
          autoFocus
        />
      ) : (
        <div>
          <span>{text}</span>
          <button onClick={toggleEdit}>Edit</button>
        </div>
      )}
    </div>
  );
};

export default EditableInput;
