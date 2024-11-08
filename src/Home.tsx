import Arrow from './assets/Arrow.png';
import Edit from './assets/Edit.png';
import Delete from './assets/Delete.png';
import './Home.css';
import {retrieveLaunchParams} from "@telegram-apps/sdk-react";
import {useEffect, useMemo, useState} from "react";
import {createSupabaseClient} from "./supabase/supabase.ts";

function Home() {
  const [users, setUsers] = useState([]);

  const launchParams = retrieveLaunchParams();
  const user = launchParams.initData?.user;

  const supabase = useMemo(() => createSupabaseClient(launchParams.initDataRaw),
    [launchParams.initDataRaw])

  useEffect(() => {
    console.log(launchParams);
    if (users?.length === 0) {
      console.log("Getting users");
      if (user) {
        console.log("User is logged in");
        getTgUsers().then((data) => {
          setUsers(data)
        });
      }
    }
  }, [users]);

  async function getTgUsers() {
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
        return data;
      } catch (e) {
        console.error(e);
      }
    }
    return data
  }

  return (
    <>
      <div className={"dates-view"}>
        <button className={"change-date-button"}>
          <img src={Arrow} alt="Change date after"/>
        </button>
        <div className={"date"}>19</div>
        <button className={"change-date-button"}><img src={Arrow} alt="Change date after"
                                                      style={{transform: 'rotate(180deg)'}}/>
        </button>
      </div>
      <div className={"tasks-list"}>
        <div className={"task-body-done"}>
          <div className={"task-name"}>
            Wake up at 5:00
          </div>
          <div className={"task-buttons"}>
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
          </div>
        </div>
      </div>
    </>

  )
}

export default Home
