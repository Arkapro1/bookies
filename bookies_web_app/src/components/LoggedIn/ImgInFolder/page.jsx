
const ImgInFolder = ({imgs}) => {
    return (
        <>
        <div className="grid  place-items-center sm:grid-cols-2 lg:grid-cols-4">
    {

        imgs.map((img)=>{  
        return <div>
            <figure class="px-5 py-4 relative max-w-sm transition-all duration-300 cursor-pointer filter grayscale hover:grayscale-0">
                <a href="#">
                    <img class="rounded-lg" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/content-gallery-3.png" alt="image description" />
                </a>
                <figcaption class="absolute px-4 text-lg text-white bottom-6">
                    <p>Do you want to get notified when a new component is added to Flowbite?</p>
                </figcaption>
            </figure>
            </div>
        })
    }
    </div>
        </>
    )
}
export default ImgInFolder;