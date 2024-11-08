import './Home.css'
import Arrow from './assets/Arrow.png';
import Edit from './assets/Edit.png';
import Delete from './assets/Delete.png';

function Home() {
    return (
        <>
        <dates-view>
            <button className={"change-date"}><img src={Arrow} alt="Change date after"/>
        </button>
        <date>19</date>
            <button className={"change-date"}><img src={Arrow} alt="Change date after" style={{transform: 'rotate(180deg)'}}/>
            </button>
        </dates-view>
            <tasks-list>
                <task-body-done>
                    <task-name>
                        Wake up at 5:00
                    </task-name>
                    <task-buttons>
                    <button className={"edit"}>
                        <img src={Edit} alt="edit-button"/>
                    </button>
                    <button className={"delete"}>
                        <img src={Delete} alt="delete-button"/>
                    </button>
                            <label className="custom-checkbox">
                                <input type="checkbox"/>
                                <span className="checkmark"></span>
                            </label>
                    </task-buttons>
                </task-body-done>
            </tasks-list>
        </>

    )
}

export default Home
