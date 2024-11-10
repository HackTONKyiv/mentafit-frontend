import './AddHabit.css';
import {useState} from "react";


interface AddHabitProps {
    onClose: () => void
    onSubmit: (habitName: string, repeatInterval: number, intevalType: string) => void
    buttonText: string
    habitTitle: string
    intervalCount: number
    intervalType: string
}

export function AddHabit({ habitTitle = "", intervalCount = 1, intervalType = "hour", onClose = () => {}, onSubmit = () => {}, buttonText = "Create" } : AddHabitProps) {
    const [habitName, setHabitName] = useState(habitTitle)
    const [habitInterval, setHabitInterval] = useState(intervalCount)
    const [habitIntervalType, setHabitIntervalType] = useState(intervalType)
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
                <button className={"add-habit-button"} onClick={() => {
                    if (habitName.length > 0 && habitInterval > 0) {
                        onSubmit(habitName, habitInterval, habitIntervalType)
                    }
                }}>{buttonText}</button>
            </div>
        </>

    )
}
