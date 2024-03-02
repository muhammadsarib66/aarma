const PrmaryBtn = ({ btnText, style, onClick }: any) => {
  return (
    <div
      onClick={onClick}
      className={`${style}  cursor-pointer    bg-primary `}
    >
      {btnText}
    </div>
  );
};

export default PrmaryBtn;
