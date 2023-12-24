const Terminal = () => {
  return (
    <>
      <div class="w-60% mx-auto">
        {/* Terminal Window  */}
        <div class="w-full shadow-2xl subpixel-antialiased rounded h-auto bg-gray-800 border-black mb-10 mx-auto pb-4">
          {/* Terminal Header  */}
          <div class="flex items-center h-8 rounded-t bg-gray-100 border-b border-gray-500 text-center text-black" id="headerTerminal">
            <div class="flex ml-2 items-center text-center border-red-900 bg-red-500 shadow-inner rounded-full w-3 h-3" id="closebtn">
            </div>
            <div class="ml-2 border-yellow-900 bg-yellow-500 shadow-inner rounded-full w-3 h-3" id="minbtn">
            </div>
            <div class="ml-2 border-green-900 bg-green-500 shadow-inner rounded-full w-3 h-3" id="maxbtn">
            </div>
            <div class="mx-auto pr-16" id="terminaltitle">
              <p class="text-center text-lg font-semibold">Terminal</p>
            </div>
          </div>
          {/* Terminal console  */}
          <div class="pl-2 pt-1 h-auto  text-green-200 font-mono text-base bg-gray-800 rounded" id="console">
            <p class="pb-1">How it helps to boost our Productivity:</p>
            <h3 class="pb-1">In the realm of productivity, Bookies have emerged as a guiding light
              for digital nomads. Regardless of the diverse locations they traverse,
              Bookies empower these modern wanderers to seamlessly manage their
              bookmarks. With universal accessibility, digital nomads can retrieve
              their cherished resources from any corner of the world, on any device.
              Effortless categorization ensures quick retrieval, enabling them to
              stay focused and organized amidst their globetrotting endeavors.
              Bookies have truly become an essential companion for those shaping
              their professional journey from various horizons.</h3>
          </div>
        </div>
      </div>
    </>
  )
}
export default Terminal