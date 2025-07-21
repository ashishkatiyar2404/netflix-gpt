const VideoTitle = ({ title, description }) => {
  return (
    <div className="w-screen aspect-video pt-[20%] px-6 md:px-20 absolute text-white bg-gradient-to-r from-black">
      <h1 className="text-2xl md:text-5xl font-bold">{title}</h1>
      <p className="hidden md:inline-block py-4 text-base w-1/3">
        {description.split(" ").slice(0, 30).join(" ")}
        {description.split(" ").length > 30 ? "..." : ""}
      </p>
      <div className="my-2 md:my-0">
        <button className="bg-white text-black py-[2px] md:py-[10px] px-3 md:px-10 text-base rounded-md hover:bg-opacity-80">
          ▶ Play
        </button>
        <button className="bg-gray-500 hidden md:inline-block text-white p-[10px] px-10 text-base bg-opacity-50 rounded-md mx-2">
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
