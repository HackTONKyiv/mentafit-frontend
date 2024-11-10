import './AddHabit.css';
import {useState} from "react";


interface AddHabitProps {
    onClose: () => void
    onSubmit: (habitName: string, repeatInterval: number, intevalType: string) => void
}

export function AddHabit({ onClose = () => {}, onSubmit = () => {} } : AddHabitProps) {
    const [habitName, setHabitName] = useState("")
    const [habitInterval, setHabitInterval] = useState(1)
    const [habitIntervalType, setHabitIntervalType] = useState("hour")
    return (
        <>
            <div className={"create-habit-popup"}>
                <button className={"create-habit-button"} onClick={onClose}>&times;</button>
                <input type="text" className={"habit-input"} placeholder={"Write a new habit"} value={habitName} onChange={(e) => setHabitName(e.target.value)}/>
                <p>repeat every</p>
                <div className={"repeat-row"}>
                    <input type={"number"} className={"input-number"} value={habitInterval} min="1" onChange={(e) => setHabitInterval(parseInt(e.target.value))}/>
                    <select name="interval" id="interval" className={"interval"} value={habitIntervalType} onChange={(e) => setHabitIntervalType(e.target.value)}>
                        <option value="hour">hour</option>
                        <option value="day">day</option>
                        <option value="week">week</option>
                        <option value="month">month</option>
                    </select>
                </div>
                <button className={"add-habit-button"} onClick={() => onSubmit(habitName, habitInterval, habitIntervalType)}>Create</button>
            </div>
        </>

    )
}
