import "./input.css";
const InputField = ({ placeholder, type ,onChange, value }: any) => {
  return (
    <div className="relative">
      <input
        type={type}
        className=" myIn placeholder-red bg-onSecondary h-12 w-full px-2 my-2 rounded-md placeholder-red"
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        required
      />
    </div>
  );
};

export default InputField;
