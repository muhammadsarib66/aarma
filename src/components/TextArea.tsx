
const TextArea = ({onChange,placeholder = "description*"}:any) => {
  return (
    <div className="relative">
       <textarea
        onChange={onChange}
         className="bg-onSecondary resize-none min-h-[150px]  w-full px-2 my-2 rounded-md placeholder-red" placeholder={placeholder} />
    
    </div>
  )
}

export default TextArea