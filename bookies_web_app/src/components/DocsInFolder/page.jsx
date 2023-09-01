import React from 'react';
import cloudinary from 'cloudinary-core';

const CLOUDINARY_CLOUD_NAME = 'dp9sxoddy';
const CLOUDINARY_API_KEY = '744592612514596';
const CLOUDINARY_API_SECRET = 'tTNiGqsPjnHncSuQ4NI5cY5x_Rc';
const docs=[
  { public_id: 'x01zfpyogutnhpkefwkf', caption: 'Image 1 Caption' }
]
const DocsInFolder = () => {
    const cloudinaryInstance = new cloudinary.Cloudinary({
        cloud_name: CLOUDINARY_CLOUD_NAME,
        api_key: CLOUDINARY_API_KEY,
        api_secret: CLOUDINARY_API_SECRET,
    });

    return (
        <>
         <span class="flex ml-8 text-4xl mt-20 mb-8">
         <svg class="w-8 h-10 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
      <path d="M14.707 7.793a1 1 0 0 0-1.414 0L11 10.086V1.5a1 1 0 0 0-2 0v8.586L6.707 7.793a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.416 0l4-4a1 1 0 0 0-.002-1.414Z"/>
      <path d="M18 12h-2.55l-2.975 2.975a3.5 3.5 0 0 1-4.95 0L4.55 12H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Zm-3 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"/>
    </svg>
        <p className="ml-2 mb-4 text-xl font-extrabold text-gray-900 dark:text-white  lg:text-4xl">
          Your{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-sky-600 from-purple-600">
            Documents
          </span>
        </p>
        {/* </motion.p> */}
      </span>
            <div className="grid mb-4 place-items-center sm:grid-cols-2 lg:grid-cols-4">
                {docs.map((doc, index) => {
                    const docURL = cloudinaryInstance.url(doc.public_id, {
                        secure: true,
                    });
console.log("kjbasdc",docURL);
console.log("kjbasdc",doc.name);
                    return (
                        <div key={index}>
                            <div className="inline-flex rounded-md shadow-sm mb-4" role="group">
                                <a
                                    href={docURL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 py-2 text-sm font-medium border border-gray-600 rounded-l-lg focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700"
                                >
                                    {/* You can replace the SVG icon here */}
                                    <svg
                                        className="w-6 h-6 text-gray-800 dark:text-white"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 16 20"
                                    >
                                        {/* SVG path code */}
                                    </svg>
                                </a>
                                <div className="w-full pl-6 pr-28 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-md hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                                    {/* Display the document name */}
                                    {doc.name}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default DocsInFolder;
