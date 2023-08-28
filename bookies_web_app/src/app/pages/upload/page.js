"use client"
import { useState } from "react";
const Upload = () => {
    const [file,setFile]=useState([]);
    const handleFileChange = (e) => {
        if (e.target.files) {
          setFile(file.push(e.target.files[0]));
        }
      };
    console.log(file);
    return (<>
        
        <div className="mt-20 ">
                
        <h1 class=" mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-5xl"><span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Upload Your</span> Files Here.</h1>
        <div class="flex items-center justify-center  lg:w-1/3">
    <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
        <div class="flex flex-col items-center justify-center pt-5 pb-6">
            <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
            </svg>
            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
            <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
        </div>
        <input id="dropzone-file" type="file" class="hidden" onChange={(e)=>setFile(e.target.files[0])}/>
    </label>
</div> 
<a href="/pages/homepage/userMainPage">
<button className="border border-white hover:bg-gray-700 text-gray-200 p-3 rounded-lg mt-5">Go Back</button>
</a>
</div>
    </>
    );
  };
  
  export default Upload;
  