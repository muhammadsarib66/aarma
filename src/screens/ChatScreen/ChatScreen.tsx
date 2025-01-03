/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import ChatImg from "../../assets/images/Chat.svg";
import moment from "moment";
import TruncateMarkup from "react-truncate-markup";
import CustomOffer from "../../components/CustomOffer";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Chip,
} from "@material-tailwind/react";
import { Divider } from "@mui/material";
import { toast } from "react-toastify";
import notisound from "../../audio/notification.mp3"
import { baseUrl, setIsImageFilterOpen, socket, userData } from "../../features/slicer/Slicer";
import { useDispatch } from "react-redux";
import { ImageModal } from "../../components/ImageModal";
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const ChatScreen = () => {
  const dispatch = useDispatch()
  const { _id } = userData;

  const messagesData = [
    {
      id: 10,
      name: "John",
      img: "https://mui.com/static/images/avatar/1.jpg",
      status: "online",
      messages: [
        {
          id: 1,
          message: "Hey, how are you?",
          time: `${new Date().getHours()}:${new Date().getMinutes()}`,
        },
        {
          id: 2,
          message: "Did you finish the assignment?",
          time: `${new Date().getHours()}:${new Date().getMinutes()}`,
        },
      ],
      email: "john@gmail.com",
      phone: "1234567890",
      address: "New York, USA",
      dob: "1999 Dec 2",
    },
    {
      id: 9,
      name: "Alice",
      img: "https://mui.com/static/images/avatar/3.jpg",
      status: "offline",
      messages: [
        {
          id: 1,
          message: "Hi there!",
          time: `${new Date().getHours()}:${new Date().getMinutes()}`,
        },
        {
          id: 2,
          message: "I completed my project yesterday.",
          time: `${new Date().getHours()}:${new Date().getMinutes()}`,
        },
        // Add more messages as needed
      ],
      email: "Alice@gmail.com",
      phone: "1234567890",
      address: "Hyder, USA",
      dob: "1999 Dec 2",
    },
    {
      id: 1,
      name: "Bob",
      img: "https://mui.com/static/images/avatar/2.jpg",
      status: "online",
      messages: [
        {
          id: 1,
          message: "Morning, everyone!",
          time: `${new Date().getHours()}:${new Date().getMinutes()}`,
        },
        {
          id: 2,
          message: "Any plans for the weekend?",
          time: `${new Date().getHours()}:${new Date().getMinutes()}`,
        },
        // Add more messages as needed
      ],
    },
    {
      id: 2,
      name: "Sarah",
      img: "https://mui.com/static/images/avatar/4.jpg",
      status: "offline",
      messages: [
        {
          id: 1,
          message: "Hello!",
          time: `${new Date().getHours()}:${new Date().getMinutes()}`,
          sender: "me",
        },
        {
          id: 2,
          message: "How was your day?",
          time: `${new Date().getHours()}:${new Date().getMinutes()}`,
        },
        // Add more messages as needed
      ],
    },
    {
      id: 3,
      name: "Michael",
      img: "https://mui.com/static/images/avatar/5.jpg",
      status: "online",
      messages: [
        {
          id: 1,
          message: "Good evening!",
          time: `${new Date().getHours()}:${new Date().getMinutes()}`,
        },
        {
          id: 2,
          message: "I m working on a new project.",
          time: `${new Date().getHours()}:${new Date().getMinutes()}`,
        },
        // Add more messages as needed
      ],
    },
    {
      id: 4,
      name: "Emily",
      img: "https://mui.com/static/images/avatar/6.jpg",
      status: "offline",
      messages: [
        {
          id: 1,
          message: "Hi friends!",
          time: `${new Date().getHours()}:${new Date().getMinutes()}`,
        },
        {
          id: 2,
          message: "What are you up to?",
          time: `${new Date().getHours()}:${new Date().getMinutes()}`,
        },
        // Add more messages as needed
      ],
    },
    {
      id: 5,
      name: "David",
      img: "https://mui.com/static/images/avatar/7.jpg",
      status: "online",
      messages: [
        {
          id: 1,
          message: "Hey everyone!",
          time: `${new Date().getHours()}:${new Date().getMinutes()}`,
        },
        {
          id: 2,
          message: "Lets grab a coffee!",
          time: `${new Date().getHours()}:${new Date().getMinutes()}`,
        },
        // Add more messages as needed
      ],
    },
    {
      id: 6,
      name: "Olivia",
      img: "https://mui.com/static/images/avatar/8.jpg",
      status: "offline",
      messages: [
        {
          id: 1,
          message: "Hello friends!",
          time: `${new Date().getHours()}:${new Date().getMinutes()}`,
        },
        {
          id: 2,
          message: "How was your weekend?",
          time: `${new Date().getHours()}:${new Date().getMinutes()}`,
        },
        // Add more messages as needed
      ],
    },
    {
      id: 7,
      name: "Daniel",
      img: "https://mui.com/static/images/avatar/1.jpg",
      status: "online",
      messages: [
        {
          id: 1,
          message: "Good morning!",
          time: `${new Date().getHours()}:${new Date().getMinutes()}`,
        },
        {
          id: 2,
          message: "Im excited for the party!",
          time: `${new Date().getHours()}:${new Date().getMinutes()}`,
        },
        // Add more messages as needed
      ],
    },
    {
      id: 8,
      name: "Sophia",
      img: "https://mui.com/static/images/avatar/10.jpg",
      status: "offline",
      messages: [
        {
          id: 1,
          message: "Hi everyone!",
          time: `${new Date().getHours()}:${new Date().getMinutes()}`,
        },
        {
          id: 2,
          message: "Whats new?",
          time: `${new Date().getHours()}:${new Date().getMinutes()}`,
        },
        // Add more messages as needed
      ],
    },
  ];
  const [singleChat, setSingleChat] = useState<any>("");
  const [activeChat, setActiveChat] = useState<any>(false);
  const [usersConv, setusersConv] = useState<any>([]);
  const [clientActiveChat, setClientActiveChat] = useState<any>([]);
  const [chats, setChats] = useState<any>([]);
  const [inputStr, setInputStr] = useState("");
  const scrollableDivRef = useRef(null);
  const [ImageUrl, setImageUrl] = useState<any>(null)
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const handleSelectChat = (person: any) => {
    setSingleChat(person);
   
    setActiveChat((prevState: any) => {
      return prevState === person._id ? null : person._id;
    });

    // console.log(person?._id,'roomChat')
    socket.emit("joinRoom", person?._id);

  // Listen for room messages
    socket.off("roomMessages"); 
    socket.on("roomMessages", (data) => {
      console.log(data,'room messages')
      setClientActiveChat(data);
      setChats(data?.messages);
      // console.log(data);
    });
  };
  

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };
  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImagePreview(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSendMessage = () => {
    if (inputStr.trim() === "" && !selectedImage) {
      toast.error("Please type a message or select an image");
      return;
    }

    const sending: any = {
      messageContent: inputStr,
      sender: _id,
      senderType: "EventManager",
      eventManager: _id,
      client: clientActiveChat?.room?.client?._id,
      messageType: "text",
    };

    if (selectedImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        sending.images = reader.result;
        socket.emit("sendMessage", sending);
        setInputStr(""); // Clear input field 
        setSelectedImage(null); 
        handleRemoveImage();
      };
      reader.readAsDataURL(selectedImage);
    } else {
      socket.emit("sendMessage", sending);
      setInputStr(""); 
    }
  };

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };
  const handleWithDrawOffer = (id: any) => {
    socket.emit("withdraw-offer", id);
  };

  const handleMessageDetected = (data: any) => {
    console.log(data, 'sockettt data receiving')
    
    setChats((prevChats: any) => {
        const chatIndex = prevChats.findIndex((chat: any) => 
            chat?.chatRoom?._id === data.chatRoom?._id
        );

        if (chatIndex !== -1) {
            // Create new array with all previous chats
            const updatedChats = [...prevChats];
            // Push the new data to matched chat
            updatedChats.push(data);
            return updatedChats;
        }
        
        return prevChats;
    });
};
  
  useEffect(() => {
  
  
    const handleRoomsFetched = (data: any) => {
      setusersConv(data);
    };
  
   
    const handleOfferUpdated = (data: any) => {
      // console.log(data, "offer updated");

       // for bokking offer accpeted or Rejected
      const audio = new Audio(notisound);
      const all_chats = [...chats];
      const message_index = chats.findIndex((item: { _id: any; }) => item?._id == data?.data?._id);
      all_chats[message_index] = data?.data;
      setChats(all_chats);
      // console.log(data, "offer updated");
      if(data?.data?.offer?.offer_statuscode == 'REJECTED'){
        audio.play();
        toast.error(data?.message)
      }
      if(data?.data?.offer?.offer_statuscode == 'ACCEPTED'){
        audio.play();
        toast.success(data?.message)
     
    }
    if(data?.data?.offer?.offer_statuscode == 'WITHDRAWN'){
      audio.play();
      toast.error(data?.message)
    }
  }
  const fetchOnlineClients = (data:any) =>{
    console.log(data,'come from sockets')
  }


    socket.emit("fetch-myRooms", _id);
    socket.on("myRooms", handleRoomsFetched);
    socket.on("online-clients", fetchOnlineClients);
    
    socket.on("offer-updated",handleOfferUpdated)
  
    return () => {
      socket.off("myRooms", handleRoomsFetched);
      socket.off("roomMessages");
      socket.off("offer-updated",handleOfferUpdated)
      socket.off("online-clients",fetchOnlineClients)
    };
  }, [_id,chats]);




const handleOpenImage = (image:any)=>{
  setImageUrl(baseUrl+image)
  // console.log('open image',image)
  dispatch(setIsImageFilterOpen(true))
  
}
// Set up the socket event listener
useEffect(() => {
  socket.on("message-detected", handleMessageDetected);

  return () => {
    socket.off("message-detected", handleMessageDetected);
  };
}, [chats]);
  useEffect(() => {
    const scrollableDiv = scrollableDivRef.current as HTMLElement | null; // Explicitly specify the type as HTMLElement or null
    if (scrollableDiv) {
      scrollableDiv.scrollIntoView({ behavior: "smooth" });
    }
  }, [chats]);

  return (
    <section className="pt-16  w-full  max-h-[100vh]  ">
      <div className=" bg-gray-100 grid  p-4 grid-cols-12 gap-4">
        <div className="bg-white p-6 md:col-span-3 col-span-4 flex   flex-col gap-4  rounded-md">
          <div>
            <h1> Active Users 👀</h1>
          </div>
          <div className="flex  items-center  space-x-5  overflow-hidden">
            {messagesData.map(
              (person, ind) =>
                person.status === "online" && (
                  <div className="" key={ind}>
                    <StyledBadge
                      className="cursor-pointer"
                      overlap="circular"
                      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                      variant="dot"
                    >
                      <Avatar
                        className="h-24 w-24"
                        alt="Remy Sharp"
                        src={person.img}
                      />
                    </StyledBadge>
                  </div>
                )
            )}
          </div>
          <div className="bg-gray-200 rounded-full w-full flex items-center pl-4 gap-2  p-1">
            <i className="text-gray-500 fa-solid fa-magnifying-glass"></i>
            <input
              className="bg-gray-200 w-full"
              type="text"
                    placeholder="Search user"
                  />
                </div>
                <div>
                  <h1>All Chats </h1>
                  <div className="overflow-y-scroll flex gap-1 flex-col  h-[50vh]">
                    {usersConv ? (
                      usersConv.map((person: any) => (
                        <div
                          key={person._id}
                          onClick={() => handleSelectChat(person)}
                          className={`cursor-pointer  ${
                            activeChat === person._id ? "bg-gray-300" : ""
                          } hover:bg-gray-300 p-2 flex gap-2 w-full`}
                        >
                          <div>
                            <Avatar alt="Remy Sharp" src={person?.img} />
                          </div>
                          <div className="w-full">
                            <div className="flex items-center  w-full justify-between">
                              <h1 className="font-semibold text-xs md:text-base text-onPrimary">
                                {person?.client?.fullname}{" "}
                              </h1>
                              <p className="text-[8px] md:text-xs  font-semibold">
                               
                                    {moment(person?.lastMessage?.messaged_on).fromNow()}
                              </p>
                            </div>
                            <TruncateMarkup lines={1}>
                              <p className="w-full text-xs text-gray-600">
                                {person?.lastMessage?.messageContent}
                              </p>
                            </TruncateMarkup>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p>No user Found </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-white shadow-md col-span-8 md:col-span-6 h-fit w-full rounded-md">
                {singleChat ? (
                  <div className="w-full ">
                    <div className="p-3 flex  justify-between items-center">
                      <div>
                        <div className="flex items-center gap-3">
                          <Avatar
                            src={singleChat?.img}
                            sx={{ width: 45, height: 45 }}
                          />
                          <div>
                            <h1 className="font-semibold text-onPrimary">
                              {clientActiveChat &&
                                clientActiveChat?.room?.client?.fullname}
                            </h1>
                            <p className=" text-xs text-gray-500">
                              {" "}
                              {clientActiveChat &&
                                clientActiveChat?.room?.client?.isActive}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div>
                        {" "}
                        <i className=" text-xl fa-solid fa-xmark "></i>
                      </div>
                    </div>
                    <div className="bg-gray-100  h-[65vh]  flex flex-col overflow-auto justify-around  w-full">
                      {chats &&
                        chats?.map((item: any) => (
                          <div
                            key={item?._id}
                            className={`flex m-2 gap-2 items-center  ${
                              item?.sender?._id == _id  || item?.sender == _id ?  "justify-end" : "justify-start"
                            }`}
                          >
                            {item?.sender?._id !== _id && (
                              <Avatar
                                src={clientActiveChat?.rooms?.img}
                                sx={{ width: 35, height: 35 }}
                              />
                            )}
                            {item?.isOfferIncluded &&
                            item?.messageType === "offer" && (
                              <Card
                                  className="mt-6 w-96" placeholder={undefined}                        >
                                <CardBody className="flex flex-col gap-3" placeholder={undefined}>
                                  <div className="flex justify-between ">
                                    <div>
                                      <Typography
                                          variant="h5"
                                          color="blue-gray"
                                          className="mb-2" placeholder={undefined}                                >
                                        {item?.offer?.eventTitle}
                                      </Typography>
                                      <Chip
                        variant="ghost"
                        size="sm"
                        className="w-fit px-4 mx-auto"
                        value={item?.offer?.offer_statuscode }
                        color={
                          item?.offer?.offer_statuscode === "ACCEPTED"
                            ? "green"
                            : item?.offer?.offer_statuscode === "PENDING"
                            ? "blue"
                            : 'red'
                        }
                      />
                                    
                                    </div>
                                    <Typography
                                        variant="h5"
                                        color="blue-gray"
                                        className="mb-2" placeholder={""} >
                                      {item?.offer?.budget}$
                                    </Typography>
                                  </div>
                                  <Divider />
                                  <div className="flex">
                                    <div className="flex flex-col gap-2">
                                      <div>
                                        <Typography className="font-semibold" placeholder={undefined}>
                                          Description
                                        </Typography>
                                        <Typography placeholder={undefined}>
                                          {item?.offer?.serviceDescription}
                                        </Typography>
                                      </div>
                                      <div>
                                        <Typography className="font-semibold" placeholder={undefined}>
                                          Event Date
                                        </Typography>
                                        <Typography placeholder={undefined}>
                                          <i className="pr-2 fa-solid fa-calendar-days"></i>
                                          {moment(item?.offer?.eventStartDate).format(
                                            "MMM Do YY"
                                          )}{" "}
                                          -{" "}
                                          {moment(
                                            item?.offer?.eventTimeFrame?.eventEndDate
                                          ).format("MMM Do YY")}
                                        </Typography>
                                      </div>
                                      <div>
                                        <Typography className="font-semibold" placeholder={undefined}>
                                          Offer Expires in
                                        </Typography>
                                        <Typography placeholder={undefined}>
                                          <i className="pr-2 fa-solid fa-calendar-days"></i>
                                          {moment(item?.offer?.expiry_date).format(
                                            "MMM Do YY"
                                          )}
                                        </Typography>
                                      </div>
                                    </div>
                                    <div className="flex gap-2 font-semibold">
                                      <i className="fa-solid fa-users"></i>
                                      {item?.offer?.totalGuests} guest
                                    </div>
                                  </div>
                                </CardBody>
                                <CardFooter className="pt-0" placeholder={undefined}>
                                  {item?.offer?.offer_statuscode === "PENDING" && (
                                    <Button
                                        onClick={() => handleWithDrawOffer(item?.offer?._id)}
                                        color="red" placeholder={undefined}                              >
                                      Withdraw Offer
                                    </Button>
                                  )}
                                  {item?.offer?.offer_statuscode === "WITHDRAWN" && (
                                    <Button placeholder="" className="bg-gray-600">
                                      {" "}
                                      Offer Withdrawn
                                    </Button>
                                  )}
                                  <div className="flex justify-end">
                              <p className="text-xs">
                                {" "}
                                {moment(item?.chatRoom?.updatedAt).calendar()}
                              </p>
                            </div>
                          </CardFooter>
                        </Card>
                      ) || item?.messageType === "text" && (
                        <div
  className={`${
    item?.sender?._id == _id
      ? "bg-primary text-white text-right"
      : "bg-white "
  } text-black text-sm max-w-[60%] p-2 rounded-lg`}
>
  {item?.images && (
    <img src={baseUrl + item.images} 
    onClick={()=>{handleOpenImage(item.images)}}
    alt="message image" className=" cursor-pointer max-w-full h-auto mb-2 rounded-lg" />
  )}
  {item?.messageContent && (
    <p className="text-left break-words"> {item?.messageContent}</p>
  )}
  <p
    className={`text-xs text-black ${
      item?.sender?._id == _id ? "text-right text-white" : "text-right"
    }`}
  >
    {moment(item?.messaged_on).format('HH:mm')}
  </p>
</div>
                      )}
                      {item?.sender?._id === _id && (
                        <Avatar
                          src={clientActiveChat?.rooms?.img}
                          sx={{ width: 35, height: 35 }}
                        />
                      )}
                    </div>
                  ))}
                <div ref={scrollableDivRef}></div>
              </div>
              <div className="chat relative bg-gray-100 flex flex-col gap-4 p-4">
      {imagePreview && (
        <div className="absolute bottom-16 mb-4">
          <img
            src={imagePreview}
            alt="Selected"
            className="w-40 h-40 object-contain rounded-lg"
          />
          <button
            onClick={handleRemoveImage}
            className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-8 h-8 p-1"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
      )}
      <div className="flex items-center gap-4">
        <div className="text-gray-700 rounded-full bg-white items-center justify-center gap-1 p-3 w-full flex">
          <input
            value={inputStr}
            onChange={(e) => setInputStr(e.target.value)}
            onKeyDown={handleKeyDown}
            type="text"
            className="w-full"
            placeholder="Type a message"
          />
        </div>
        <CustomOffer
          senderId={_id}
          clientId={clientActiveChat?.room?.client?._id}
        />
        <div className="flex items-center gap-2">
          <input
            type="file"
            accept="image/*"
            id="imageInput"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
          <label htmlFor="imageInput" className="cursor-pointer">
            <i className="text-2xl text-blue-500 fa-regular fa-file-image"></i>
          </label>
          <div
            onClick={handleSendMessage}
            className="cursor-pointer bg-white flex items-center justify-center rounded-full h-14 w-14"
          >
            <i className="text-2xl text-blue-500 fa-solid fa-paper-plane"></i>
          </div>
        </div>
      </div>
    </div>
            </div>
          ) : (
            <div className="w-full flex h-screen  flex-col pt-20 gap-4 justify-center items-center ">
              <h1 className="text-onPrimary font-bold text-3xl capitalize">
                No Chat Open
              </h1>
              <img
                src={ChatImg}
                className="w-60 h-60 object-cover"
                alt="chat"
              />
            </div>
          )}
        </div>
        <div className="bg-white hidden md:block md:col-span-3 shadow-md   rounded-md p-6">
          {singleChat && (
            <div >
              <div className="flex items-center gap-4">
                <i
                  className="text-xl fa-solid fa-xmark cursor-pointer"
                  onClick={() => {
                    setActiveChat(false);
                    setSingleChat("");
                    setClientActiveChat("");
                  }}
                ></i>
                <h2 className="font-semibold text-onPrimary text-xl">
                  Contact Info
                </h2>
              </div>
              <div>
                <div className="w-full  flex flex-col justify-center items-center mt-14">
                  <Avatar
                    src={singleChat?.img}
                    sx={{ width: 100, height: 100 }}
                  />
                  <h2 className="mt-2 font-semibold text-onPrimary">
                    {" "}
                    {clientActiveChat?.room?.client?.fullname}
                  </h2>
                  <p className="text-sm flex  text-gray-400 ">
                    {" "}
                    {singleChat?.status}
                    {singleChat?.status === "online" ? (
                      <div className=" h-2 w-2 bg-green-500 p-0 rounded-full">
                        {" "}
                      </div>
                    ) : (
                      ""
                    )}
                  </p>
                </div>
                <div className="mt-8 flex flex-col gap-4">
                  <div className="">
                    <h1 className="  text-sm lowercase text-onPrimary font-semibold ">
                      Email:{" "}
                    </h1>
                    <p className="text-sm lowercase text-gray-600">
                      {clientActiveChat?.room?.client?.email ?? "xyz@gmail.com"}
                    </p>
                  </div>
                  <div>
                    <h1 className="  text-sm lowercase text-onPrimary font-semibold ">
                      Phone:{" "}
                    </h1>
                    <p className="text-sm lowercase text-gray-600">
                      {clientActiveChat?.room?.client?.phoneNumber ??
                        "1234567890"}
                    </p>
                  </div>
                  <div>
                    <h1 className="  text-sm lowercase text-onPrimary font-semibold ">
                      Address:{" "}
                    </h1>
                    <p className="text-sm lowercase text-gray-600">
                      {singleChat?.address ?? "New York, USA"}
                    </p>
                  </div>
                  <div>
                    <h1 className="  text-sm lowercase text-onPrimary font-semibold ">
                      About:{" "}
                    </h1>
                    <p className="text-sm lowercase text-gray-600">
                      {" "}
                      Available for call please contact on a chat
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )
          }
        </div>
      </div>
          <ImageModal  Image={ImageUrl}/>
    </section>
    );
};

export default ChatScreen;
