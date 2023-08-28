const DocsInFolder = ({ docs }) => {
  return (
    <>
      <div className="grid mb-4 place-items-center sm:grid-cols-2 lg:grid-cols-4">
        {docs.map((doc) => {
          return (
            <div>
              <div class="inline-flex rounded-md shadow-sm mb-4" role="group">
                <button
                  type="button"
                  class=" px-4 py-2 text-sm font-medium border  border-gray-600  rounded-l-lg focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 "
                >
                  <svg
                    class="w-6 h-6 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 16 20"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4.828 10h6.239m-6.239 4h6.239M6 1v4a1 1 0 0 1-1 1H1m14-4v16a.97.97 0 0 1-.933 1H1.933A.97.97 0 0 1 1 18V5.828a2 2 0 0 1 .586-1.414l2.828-2.828A2 2 0 0 1 5.828 1h8.239A.97.97 0 0 1 15 2Z"
                    />
                  </svg>
                </button>
                <div class=" w-full  pl-6 pr-28 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-md hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                  abcd.pdf
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
