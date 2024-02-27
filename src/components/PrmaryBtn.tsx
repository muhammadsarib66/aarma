const PrmaryBtn = ({ btnText, style, onClick }: any) => {
  return (
    <div
      onClick={onClick}
      className={`${style}  cursor-pointer rounded-lg w-full  bg-primary `}
    >
      {btnText}
    </div>
  );
};

export default PrmaryBtn;
