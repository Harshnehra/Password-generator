import { useCallback, useEffect, useRef, useState } from "react"
import Styles from "./Box.module.css"

function Box() {

  const [length, setlength]= useState(10)
  const [isnumber, setisnumber]=useState(false)
  const [ischaracter, setischaracter]=useState(false)
  const [password, setpassword]=useState("")

  const passwordRef = useRef(null)

  const passwordgenerator = useCallback(()=>{
    
    let pass=""
    let str="abcdefghijklmnopqrstuvwxyzABCDEFGHIJLMNOPQRSTUVWXYZ"

    if(isnumber){
      str += "1234567890"
    }
    if(ischaracter){
      str += "`~!@#$%^&*()-_=+[]{};:',./<>?"
    }

    for(let i=1 ; i<=length ; i++){
      let char = Math.floor(Math.random() * str.length + 1)
      pass+= str.charAt(char)
    }

    setpassword(pass)

  },[length,isnumber,ischaracter,setpassword])

  const copypassword = useCallback(() => {
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordgenerator()
  }, [length,isnumber,ischaracter,passwordgenerator])

    return (
      <>  

      <div className={`${Styles["input"]}`}>
        <input type="text" value={password} ref={passwordRef} readOnly />
        <button onClick={copypassword} className={`${Styles["btn"]}`}> Copy </button>
      </div>

      <div className={`${Styles["dependencies"]}`}>

      <div className={`${Styles["range"]}`}>  
        <input type="range" value={length} min={6} max={100} onChange={(e) => {setlength(e.target.value)}}/>
        <label className={`${Styles["range-label"]}`}>Length: {length} </label>
      </div>
      <div className={`${Styles["check-box-1"]}`}>
        <input  type="checkbox" defaultChecked={isnumber} onChange={() => {setisnumber((prev)=>!prev)}}/>
        <label className={`${Styles["check-label-1"]}`}> Number </label>
      </div>
      <div className={`${Styles["check-box-2"]}`}>
        <input  type="checkbox" defaultChecked={ischaracter} onChange={() => {setischaracter((prev) => !prev)}}/>
        <label className={`${Styles["check-label-2"]}`}> Character </label>
      </div>

      </div>
      
      </>
    )
  }
  
  export default Box