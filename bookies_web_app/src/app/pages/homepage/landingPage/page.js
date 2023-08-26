const Page = (params) => {
    return (
        <>
            <section class="text-gray-600 body-font">
                <div class="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
                    <div class="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
                        <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium font-bold text-gray-300 font-poppins">
                            Bookies
                            <br class="hidden lg:inline-block" />
                            <br />
                            <span class="text-orange-300 text-2xl">Unleash Smarter Bookmark Management 🔐</span>
                        </h1>
                        <br />

                        <div class="mb-8 leading-relaxed text-gradient-purple-green">
                            <ul class=" list-inside">
                                <li class="mb-2"><strong class="text-blue-500">Seamless Organization:</strong> Effortlessly categorize and nest bookmarks for quick retrieval.</li>
                                <li class="mb-2"><strong class="text-blue-500">Universal Access:</strong> Access your bookmarks anytime, anywhere, across all devices.</li>
                                <li class="mb-2"><strong class="text-blue-500">Intelligent Suggestions:</strong> Discover new content with personalized bookmark recommendations.</li>
                                <li class="mb-2"><strong class="text-blue-500">Effortless Sharing:</strong> Collaborate by sharing curated folders with friends and colleagues.</li>
                            </ul>
                        </div>



                        <div class="flex justify-center">
                            <button class="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Download Extension</button>
                            <button class="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">Use It On Web</button>
                        </div>
                    </div>
                    <div class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
                        <img class="object-cover object-center rounded" alt="hero" src="/images/image-removebg-preview.png" />
                    </div>
                </div>
            </section>
        </>
    )
}
export default Page;