const ImgInFolder = ({ imgs }) => {
  return (
    <>
      <span class="flex ml-8 text-4xl mt-20 mb-8">
        <svg
          class="w-8 h-10 mr-2 text-gray-800 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 16 20"
        >
          <path
            fill="currentColor"
            d="M11.045 7.514a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Zm-4.572 3.072L3.857 15.92h7.949l-1.811-3.37-1.61 2.716-1.912-4.679Z"
          />
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 1v4a1 1 0 0 1-1 1H1m14 12a.97.97 0 0 1-.933 1H1.933A.97.97 0 0 1 1 18V5.828a2 2 0 0 1 .586-1.414l2.828-2.828A2 2 0 0 1 5.828 1h8.239A.97.97 0 0 1 15 2v16ZM11.045 7.514a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM3.857 15.92l2.616-5.333 1.912 4.68 1.61-2.717 1.81 3.37H3.858Z"
          />
        </svg>
        <p className="ml-2 mb-4 text-xl font-extrabold text-gray-900 dark:text-white  lg:text-4xl">
          Your{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-sky-600 from-purple-600">
            Images
          </span>
        </p>
      </span>
      <div className="grid  place-items-center sm:grid-cols-2 lg:grid-cols-4">
        {imgs.map((img) => {
          return (
            <div>
              <figure class="px-5 py-4 relative max-w-sm transition-all duration-300 cursor-pointer filter grayscale hover:grayscale-0">
                <a href="#">
                  <img
                    class="rounded-lg"
                    src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/content-gallery-3.png"
                    alt="image description"
                  />
                </a>
                <figcaption class="absolute px-4 text-lg text-white bottom-6">
                  <p>Sample Image</p>
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
