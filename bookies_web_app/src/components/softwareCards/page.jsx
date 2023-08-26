const Services = (props) => {
    // const image=this.props.img
    return (
        <>

            <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <a href="#">
                <img class="p-8 rounded-t-lg" src={props.props.img} alt="product image" />
                </a>
                <div class="px-5 pb-5">
                    <a href="#">
                        <h5 class="text-center text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{props.props.type}</h5>
                        <br />
                        <p class="text-center text-gray-500 dark:text-gray-400">{props.props.offering}</p>

                    </a>
                    <br />
                    <div class="grid place-items-center">
                        <a href="#" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Download {props.props.type}</a>
                    </div>
                </div>
            </div>

        </>
    )
}
export default Services