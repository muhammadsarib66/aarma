const RadioButton = ({
  icon,
  style,
  label,
  value,
  name,
  checked,
  onChange,
}: any) => {
  return (
    <label
      className={`flex justify-center items-center ${style} ${
        checked
          ? "bg-primary text-secondary"
          : "bg-onSecondary text-placeHolder"
      }  `}
    >
      <input
        type="radio"
        className="hidden"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <i className={`pr-2 ${icon}`}></i>
      {label}
    </label>
  );
};

export default RadioButton;
