const userMainPage=()=>{
    return(
        <>
            <section class="bg-white py-6 sm:py-8 lg:py-12 mx-auto">
    <div class="mx-auto max-w-screen-xl px-4 md:px-8">

        <div class="relative mb-10 pt-8 md:mb-16">
        <h2 class="mb-4 text-center font-serif text-3xl font-bold text-gray-800 md:mb-6 md:text-4xl">Integration Guides</h2>

        <div className="lg:px-80">
            <form>   
                <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div class="relative">
                    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input type="search" id="default-search" class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." required/>
                    <button type="submit" class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                </div>

            </form>
            </div>  
        </div>
        
        <div class="mx-5 grid gap-8 sm:grid-cols-2 sm:gap-12 lg:grid-cols-3  xl:gap-16">

        <Article/>
        <Article/>
        <Article/>
        <Article/>
     
            

        </div>
    </div>
</section>

        </>
    )
}

export default userMainPage;

const Article=()=>{
    return(
        <>
            {/* <article class="">
            <a class="block rounded-lg bg-gray-900 p-2 transition hover:scale-105" href="#">
            <h2 class="mx-4 mt-4 mb-10 font-serif text-2xl font-semibold text-white">12 Ways to Utilize Zapier for Business Productivity</h2>
            <div class="flex items-center rounded-md px-4 py-3">
                <img class="h-10 w-10 rounded-full object-cover" src="/images/y9s3xOJV6rnQPKIrdPYJy.png" alt="Simon Lewis" />
                <p class="ml-4 w-56">
                <strong class="block text-lg font-medium text-white">Simon Lewis</strong>
                <span class="text-xs text-white"> Founder of 2 Startups </span>
                </p>
            </div>
            </a>
        </article> */}
        
        <div class="border  relative flex max-w-[20rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
  <div class="relative m-0 overflow-hidden rounded-none bg-transparent bg-clip-border text-gray-700 shadow-none">
  <h4 class="p-3 block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
      UI/UX Review Check
    </h4>
    <img
    src="data:image/jpeg;base64,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"
    width={400}
    height={200}
    //   src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1471&amp;q=80"
    //   src="card.jpg"
    // src=""
      alt="ui/ux review check"
    />
  </div>
  <div class="p-6">
    
  </div>
  <div class="flex items-center  p-6">
    <div class="flex items-center -space-x-3">
      <div
        data-tooltip="author-2"
        class="absolute z-50 whitespace-normal break-words rounded-lg bg-black py-1.5 px-3 font-sans text-sm font-normal text-white focus:outline-none"
      >
        Tania Andrew
      </div>
    </div> 
  </div>
</div>

        </>
    )
}