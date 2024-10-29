import './CInput.css'
const CInput = ({value,name,onChange,placeholder,type,minDate}:any) => {
  return (

<div className="group">
  <input 
              required

   min={minDate && (new Date().toISOString().split('T')[0])}
  onChange={onChange} type={type ? type :"text"} name={name} value={value} placeholder={placeholder} className="input" />
</div>

  )
}

export default CInput