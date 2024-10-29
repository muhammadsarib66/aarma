// ProgressBar.js


const ProgressBar2 = ({
  progress,
  bgColor = 'bg-white',      // Default background color
  textColor = 'text-gray-800',       // Default text color
  
}:any) => {
  return (
    <div className="w-full bg-gray-200 h-5 rounded-full">
      <div
        className={`flex justify-center items-center h-5 text-xs ${bgColor} ${textColor} rounded-full`}
        style={{ width: `${progress}%`,  }}
      >
        {progress}%
      </div>
    </div>
  );
};

export default ProgressBar2;
