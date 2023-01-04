import { useEffect, useState } from "react";
import styles from "./Main.module.css"

function Main() {
    const [count, setCount] = useState(0) 
    const [checkintime, setCheckinTime] = useState("00:00:00")
    const [checkouttime, setCheckoutTime] = useState("00:00:00")
    const [students, setStudents] = useState([{}])
    const [showStudents, setShowStudents] = useState(false)
    const [showBanner, setShowBanner] = useState(false)

    function checkStudents(){
        var c=0;
        const time = new Date().toLocaleTimeString()
        for(var i=0;i<students.length;i++){
            if(students[i].checkintime <= time && students[i].checkouttime > time)
            c+=1
        }
        setCount(c)
    }
    useEffect(()=>{
        const pid = setInterval(
            checkStudents, 5000)
        return () => clearInterval(pid)
    }, [students])


function submitHandler(e){
    e.preventDefault()
    setStudents([...students, {checkintime, checkouttime}])
    
    setShowBanner(true)
    setTimeout(()=>{
        setShowBanner(false)
    },1000)
}

    return (
        <div className={styles.body}>
            {showBanner && <h1 className={styles.banner}>Student added</h1>}
            <div className={styles.container}>
                <h2>Enter Student Details</h2>
                <form className="form">
                    <input className={styles.input} type="text" style={{letterSpacing:"1px"}} placeholder="Student's Full Name"/>
                    <input className={styles.input} type="text" placeholder="Roll Number"></input>
                    <div  className={`${styles.time} ${styles.input}`}><label htmlFor="intime">Check-in Time</label><input type="time" step="60" value={checkintime}  id="intime"  onChange={(ev) => {setCheckinTime(ev.target.value)}}/></div>
                    <div  className={`${styles.time} ${styles.input}`}><label htmlFor="outtime">Check-out Time</label><input type="time" step="60" value={checkouttime} id="outtime" onChange={(ev) => {setCheckoutTime(ev.target.value)}}/></div>
                    <button type="submit" className={styles.btn} onClick={(e)=>submitHandler(e)}>Submit</button>
                </form>
            </div>
            <div className={styles.counter}>
                <button className={styles.btn} onClick={()=>setShowStudents(prev => !prev)}>
                    {showStudents?"Hide":"Show"} Student Count
                </button>
                {   showStudents&&
                    <div>
                        Current count : {count}
                    </div>
                }
            </div>
        </div>
     );
}

export default Main;
