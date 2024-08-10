
const CustomToast = ({ messageContent, senderName, senderImage }:any) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <img
        src={senderImage}
        alt="Sender Profile"
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          marginRight: '10px',
        }}
      />
      <div>
        <p className='font-bold text 2'>{senderName}</p>
        <p style={{ margin: '5px 0' }}>{messageContent}</p>
      </div>
    </div>
  );
};

export default CustomToast;
