// ProgressBar.js


const ProgressBar2 = ({
  progress,
  bgColor = 'bg-white',      // Default background color
  textColor = 'text-gray-800',       // Default text color
  
}:any) => {
  return (
    <div className="relative w-full bg-gray-300 h-5 rounded-full">
      <div
        className={` flex justify-center items-center h-5 text-xs ${bgColor} ${textColor} rounded-full`}
        style={{ width: `${progress}%`,  }}
      >
        <p className=" absolute  left-[50%]">

        {progress}%
        </p>
      </div>
    </div>
  );
};

export default ProgressBar2;
