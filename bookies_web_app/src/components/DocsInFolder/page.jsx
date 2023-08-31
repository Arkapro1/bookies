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
