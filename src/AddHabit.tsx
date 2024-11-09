import './AddHabit.css';

function AddHabit(){

    return (
        <>
            <div className={"create-habit-popup"}>
                <button className={"create-habit-button"}>+</button>
                <input type="text" className={"habit-input"}/>
                <p>repeat every</p>
                <div className={"repeat-row"}>
                    <input type={"number"} className={"input-number"} min="1"/>
                    <select name="interval" id="interval">
                        <option value="day">day</option>
                        <option value="week">week</option>
                        <option value="month">month</option>
                    </select>
                </div>
                <input type="submit" className={"create-habbit-button"}/>
            </div>
        </>

    )
}

export default AddHabit