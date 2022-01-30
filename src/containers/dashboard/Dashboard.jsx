import useToggle from "../../hooks/useToggle"
import useLocalStorage from '../../hooks/useLocalStorage';
import AddExpense from '../addExpense/AddExpense';
import AddFriend from "../addFriend/AddFriend";

import "./Dashboard.css"

import AllExpense from "../allExpense/AllExpense";

export default function Dashboard() {
    const [isExpense, toggleAddExpense] = useToggle();
    const [isFriends, toggleAddFriends] = useToggle();
    const [users, setUsers] = useLocalStorage("users", []);
    const [expenses, setExpenses] = useLocalStorage("expenses", []);


    const onSaveFriend = (user) => {
        const id = "id" + Math.random().toString(16).slice(2);
        setUsers((val) => [...val, { id, ...user }]);
    }
    const onSaveExpense = (expense) => {
        const id = "id" + Math.random().toString(16).slice(2);
        setExpenses((val) => [...val, { id, ...expense }]);
    }
    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h1 className="text-left">Dashboard</h1>
                <div className="dashboard-action">
                    <button className="btn m-r-10" onClick={toggleAddExpense}>Add Expense</button>
                    <button  className="btn" onClick={toggleAddFriends}>Add Friends</button>
                </div>
            </div>
            <AllExpense expenses={expenses}></AllExpense>
            {isExpense && <AddExpense toggle={toggleAddExpense} list={users} onSave={onSaveExpense}></AddExpense>}
            {isFriends && <AddFriend toggle={toggleAddFriends}  onSave={onSaveFriend}></AddFriend>}
        </div>
    )
}


