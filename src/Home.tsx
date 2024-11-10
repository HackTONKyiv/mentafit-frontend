import Arrow from './assets/Arrow.png';
import Edit from './assets/Edit.png';
import Delete from './assets/Delete.png';
import EditDone from './assets/EditDone.png';
import DeleteDone from './assets/DeleteDone.png';
import Profile from './assets/Profile.png';
import './Home.css';
import {retrieveLaunchParams} from "@telegram-apps/sdk-react";
import {useEffect, useMemo, useState} from "react";
import {createSupabaseClient} from "./supabase/supabase.ts";
import {useCalendarStore} from "./stores/calendarStore.ts";
import {getDateHabits, getDateString} from "./utils/utils.ts";
import {User, Habit} from "./types/types.ts";
import {AddHabit} from "./components/AddHabit.tsx";
import {ModalPopup} from "./components/ModalPopup.tsx";

function Home() {
  const [dbUser, setDbUser] = useState<User | null>(null);

  const launchParams = retrieveLaunchParams();
  const calendarStore = useCalendarStore();
  const user = launchParams.initData?.user;
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [habitsFetched, setHabitsFetched] = useState(false);
  const [deletePopupMessage, setDeletePopupMessage] = useState("Are you sure you want to delete this habit?");
  const [selectedHabit, setSelectedHabit] = useState<number | null>(null)
  const [showEditPopup, setShowEditPopup] = useState(false);

  const supabase = useMemo(() => createSupabaseClient(launchParams.initDataRaw),
    [launchParams.initDataRaw])

  useEffect(() => {
    console.log(launchParams);
    if (!dbUser) {
      console.log("Getting users");
      if (user) {
        console.log(`User ${user.username} is logged in`);
        getTgUser().then((data) => {
          setDbUser(data)
        });
      }
    }
    if (!habitsFetched) {
      getHabits().then((habits) => {
        calendarStore.setHabits(habits);
        setHabitsFetched(true);
      });
    }
  }, [dbUser, calendarStore.habits, calendarStore.setCurrentDate]);

  async function getTgUser() {
    if (!user) {
      return;
    }
    const {data} = await supabase.from("telegram_users").select().eq("tg_id", user.id);
    if (!data || data.length === 0) {
      console.log("creating user");
      try {
        const {data} = await supabase.from("telegram_users").insert([
          {
            tg_id: user.id,
            first_name: user.firstName || null,
            last_name: user.lastName || null,
            username: user.username || null,
            allows_write_to_pm: user.allowsWriteToPm,
          }
        ]).select();
        console.log(data);
        return data?.length === 1 ? {
          tgId: data[0].tg_id,
          firstName: data[0].first_name,
          lastName: data[0].last_name,
          username: data[0].username,
          allowsWriteToPM: data[0].allows_write_to_pm,

        } : [];
      } catch (e) {
        console.error(e);
      }
    }
    return data?.length === 1 ? {
      tgId: data[0].tg_id,
      firstName: data[0].first_name,
      lastName: data[0].last_name,
      username: data[0].username,
      allowsWriteToPM: data[0].allows_write_to_pm,

    } : [];
  }

  async function getHabits() {
    const {data} = await supabase.from("habbits").select();
    console.log(data);
    return data?.map<Habit>((habbitData: any) => {
      return {
        id: habbitData.id,
        authorId: habbitData.author,
        repeatEveryCount: habbitData.repeat_every_count,
        repeatEveryType: habbitData.repeat_every_type,
        name: habbitData.name,
        notificationsStartFrom: new Date(Date.parse(habbitData.notifications_start)),
        done: false,
      }
    }) || [];
  }

  async function addHabit(habitName: string, repeatInterval: number, intervalType: string) {
    const {data} = await supabase.from("habbits").insert(
      {
        author: user?.id,
        name: habitName,
        repeat_every_count: repeatInterval,
        repeat_every_type: intervalType,
        notifications_start: new Date(),
      });
    console.log(data);
    const newHabits = await getHabits();
    calendarStore.setHabits(newHabits);
  }

  async function deleteHabit(habitId: number) {
    const {data} = await supabase.from("habbits").delete().eq("id", habitId);
    console.log(data);
    const newHabits = await getHabits();
    calendarStore.setHabits(newHabits);
  }

  async function editHabit(habitId: number, habitName: string, repeatInterval: number, intervalType: string) {
    const {data} = await supabase.from("habbits").update(
      {
        name: habitName,
        repeat_every_count: repeatInterval,
        repeat_every_type: intervalType,
      }).eq("id", habitId);
    console.log(data);
    const newHabits = await getHabits();
    calendarStore.setHabits(newHabits);
  }

  if (!dbUser) {
    // TODO: Add a loading page
    return <div>Loading...</div>
  }

  const currentDate = new Date(calendarStore.currentDate.getTime());
  const isDateLessThanToday = currentDate.setHours(0, 0, 0, 0) > new Date().setHours(0, 0, 0, 0);

  return (
    <>
      <div className={"profile"}>
        <div className={"profile-icon"}>
          <img src={Profile} alt="User profile button and counter"/>
        </div>
      </div>
      <div className={"dates-view"}>
        {isDateLessThanToday &&
            <button className={"change-date-button"} onClick={calendarStore.decreaseDay}>
                <img src={Arrow} alt="Change date after"/>
            </button>
        }
        <div className={"date"}>{getDateString(calendarStore.currentDate)}</div>
        <button className={"change-date-button"} onClick={calendarStore.increaseDay}><img src={Arrow}
                                                                                          alt="Change date after"
                                                                                          style={{transform: 'rotate(180deg)'}}/>
        </button>
      </div>
      <div className={"main-container"}>
        <div className={"habits-list"}>
          {getDateHabits(calendarStore.currentDate, calendarStore.habits).map((habit) => {
            return (
              <div className={habit.done ? "habit-body-done" : "habit-body"} key={habit.id}>
                <div className={"habit-name"}>
                  {habit.name}
                </div>
                <div className={"habit-buttons"}>
                  <button className={"delete"} onClick={() => {
                    setShowDeletePopup(true);
                    setDeletePopupMessage(`Are you sure you want to delete the habit "${habit.name}"?`);
                    setSelectedHabit(habit.id);
                  }}>
                    <img src={habit.done ? DeleteDone : Delete} alt="delete-button-done"/>
                  </button>
                  <button className={"edit"} onClick={() => {
                    setShowEditPopup(true);
                    setSelectedHabit(habit.id);
                  }}>
                    <img src={habit.done ? EditDone : Edit} alt="edit-button-done"/>
                  </button>
                  <label className="custom-checkbox">
                    <input type="checkbox" defaultChecked={habit.done} onClick={() => {
                      calendarStore.setHabitDone(habit.id, !habit.done);
                    }}/>
                    <span className="checkmark">&times;</span>
                  </label>
                </div>
              </div>
            )
          })}

          {/*<div className={"habit-body-done"}>*/}
          {/*  <div className={"habit-name"}>*/}
          {/*    Wake up at 5:00*/}
          {/*  </div>*/}
          {/*  <div className={"habit-buttons"}>*/}
          {/*    <button className={"delete"}>*/}
          {/*      <img src={DeleteDone} alt="delete-button"/>*/}
          {/*    </button>*/}
          {/*    <button className={"edit"}>*/}
          {/*      <img src={EditDone} alt="edit-button"/>*/}
          {/*    </button>*/}
          {/*    <label className="custom-checkbox">*/}
          {/*      <input type="checkbox"/>*/}
          {/*      <span className="checkmark"></span>*/}
          {/*    </label>*/}
          {/*  </div>*/}
          {/*</div>*/}
        </div>


        <button className={"create-habit-button"} onClick={() => setShowAddPopup(true)}>
          +
        </button>
        {showAddPopup &&
            <AddHabit onClose={() => setShowAddPopup(false)} onSubmit={(...args) => {
              setShowAddPopup(false);
              addHabit(...args);
            }} buttonText={"Create"}/>
        }
        {showDeletePopup &&
          <ModalPopup onClose={() => setShowDeletePopup(false)} text={deletePopupMessage}
                      onOk={() => {
                        setShowDeletePopup(false);
                        if (selectedHabit) {
                          deleteHabit(selectedHabit);
                        }
                        setSelectedHabit(null);
                      }}
                      onCancel={() => {
                        setShowDeletePopup(false);
                        setSelectedHabit(null);
                      }}/>
        }
        {showEditPopup &&
          <AddHabit onClose={() => setShowEditPopup(false)} buttonText={"Edit habit"}
                    habitTitle={calendarStore.habits.find((habit) => habit.id === selectedHabit)?.name || ""}
                    intervalCount={calendarStore.habits.find((habit) => habit.id === selectedHabit)?.repeatEveryCount || 1}
                    intervalType={calendarStore.habits.find((habit) => habit.id === selectedHabit)?.repeatEveryType || "hour"}
                    onSubmit={(habitName, repeatInterval, intervalType) => {
                      setShowEditPopup(false);
                      if (selectedHabit) {
                        editHabit(selectedHabit, habitName, repeatInterval, intervalType);
                      }
                      setSelectedHabit(null);
                    }}/>
        }
      </div>
    </>

  )
}

export default Home
