const PrmaryBtn = ({ btnText, style, onClick, type }: any) => {
  return (
    <>
      {type ? (
        <button
          type={type}
          onClick={onClick}
          className={`${style}  cursor-pointer`}
        >
          {btnText}
        </button>
      ) : (
        <div
          onClick={onClick}
          className={`${style}  cursor-pointer     `}
        >
          {btnText}
        </div>
      )}
    </>
  );
};

export default PrmaryBtn;
