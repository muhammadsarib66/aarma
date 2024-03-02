import "./input.css";
const InputField = ({
  placeholder,
  type,
  onChange,
  value,
  style,
  label,
}: any) => {
  const isFileInput = type === "file";

  return (
    <div className="relative">
      {isFileInput ? (
        <>
          <label className="flex cursor-pointer bg-onSecondary  w-16 h-16 items-center justify-center rounded-full ">
            <i className="fa-solid py-4 text-xl text-onPrimary fa-arrow-up-from-bracket "></i>
            <input
              type={type}
              className="absolute opacity-0 h-full w-full cursor-pointer"
              onChange={onChange}
              required
            />
          </label>
          <p className="text-placeHolder text-xs mt-4">{label}</p>
        </>
      ) : (
        <input
          type={type}
          className={` ${style} myIn placeholder-red bg-onSecondary h-12 w-full px-2 my-2 rounded-md placeholder-red`}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          required
        />
      )}
    </div>
  );
};

export default InputField;
