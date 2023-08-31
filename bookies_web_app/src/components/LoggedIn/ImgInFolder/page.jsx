import React from 'react';
import cloudinary from 'cloudinary-core';

const CLOUDINARY_CLOUD_NAME = 'dp9sxoddy';
const CLOUDINARY_API_KEY = '744592612514596';
const CLOUDINARY_API_SECRET = 'tTNiGqsPjnHncSuQ4NI5cY5x_Rc';
const imgs = [
    { public_id: 'deroqqyweujt9qoodc0p', caption: 'Image 1 Caption' },
    { public_id: 'brxkasdockhzoahe7mse', caption: 'Image 2 Caption' },
 
];

const ImgInFolder = () => {
    const cloudinaryInstance = new cloudinary.Cloudinary({
        cloud_name: CLOUDINARY_CLOUD_NAME,
        api_key: CLOUDINARY_API_KEY,
        api_secret: CLOUDINARY_API_SECRET,
    });
console.log('imhs',imgs);
    return (
        <>
            <div className="grid place-items-center sm:grid-cols-2 lg:grid-cols-4">
                {imgs.map((img, index) => {
                    console.log("hgglsdbkbjv",img.public_id); // Make sure this logs the correct value

                    const imageURL = cloudinaryInstance.url(img.public_id, {
                        secure: true,
                        transformation: [
                            { width: 300, height: 200, crop: 'fill' },
                        ],
                    });

                    return (
                        <div key={index}>
                            <figure className="px-5 py-4 relative max-w-sm transition-all duration-300 cursor-pointer filter grayscale hover:grayscale-0">
                                <a href="#">
                                    <img className="rounded-lg" src={imageURL} alt="image description" />
                                </a>
                                <figcaption className="absolute px-4 text-lg text-white bottom-6">
                                    <p>{img.caption}</p>
                                </figcaption>
                            </figure>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default ImgInFolder;
