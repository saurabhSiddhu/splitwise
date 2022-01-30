import { useContext } from "react";
import LoggedInUserContext from "../../context/LoggedInUser";
import constant from "../../App.enum";
import "./AllExpense.css";
export default function AllExpense({ expenses }) {
    console.log(expenses);
    const loggedInUser = useContext(LoggedInUserContext);
    const {
        owed,
        owe,
        positiveList,
        negativeList
    } = totalExpenses();
    

    function totalExpenses() {
        let { owed, totalOwedPersons } = expensePositive();
        let { owe, totalPersonsOwe } = expenseNegative();
        Object.values({ ...totalPersonsOwe }).forEach(val => {
            if (totalOwedPersons[val.id]) {
               
                if (totalOwedPersons[val.id].value === val.value) {
                    owe -= val.value;
                    owed -= val.value;
                    delete totalPersonsOwe[val.id];
                    delete totalOwedPersons[val.id];
                } else if (totalOwedPersons[val.id].value >= val.value) {
                    owe -= val.value;
                    owed -= val.value;
                    totalOwedPersons[val.id].value -= val.value;;
                    delete totalPersonsOwe[val.id];
                } else {
                    owe -= totalOwedPersons[val.id].value;
                    owed -= totalOwedPersons[val.id].value;
                    totalPersonsOwe[val.id].value -=  totalOwedPersons[val.id].value;
                    delete totalOwedPersons[val.id];
                }
            }
        });
        return {
            owed,
            owe,
            positiveList: Object.values(totalOwedPersons),
            negativeList: Object.values(totalPersonsOwe),
        }

    }
    function expensePositive() {
        let total = 0;
        let totalOwedPersons = expenses.filter((expense) => expense.paid === loggedInUser.id).reduce((acc, val) => {
            val.persons.forEach((person) => {
                let value = val.type === constant.percentage ? val[person.id] * val.amount/100 : val[person.id];
                if (acc[person.id]) {
                    acc[person.id].value += value;
                    
                } else {
                    acc[person.id] = person;
                    acc[person.id].value = value;
                }
                total += value;
            });
            return acc;
        }, {});
        return {
            owed: total,
            totalOwedPersons
        }
    }
    function expenseNegative() {
        let total = 0;
        let totalPersonsOwe = expenses.filter((expense) => expense.paid !== loggedInUser.id).reduce((acc, val) => {
            let person = val.persons.find((person) => person.id === val.paid);
            let value = val.type === constant.percentage ? val[person.id] * val.amount/100 : val[person.id];
            if (acc[person.id]) {
                acc[person.id].value += value;
                    
            } else {
                acc[person.id] = person;
                acc[person.id].value = value;
            }
            total += value;
            return acc;
        }, {});
        return {
            owe: total,
            totalPersonsOwe
        }
    }
    return (
        <div className="dashboard-container">
            <div className="total-balance">
                <div className="block">
                    <div className="title">Total Balance</div>
                    <div className="positive">₹{owed - owe}</div>
                </div>
                <div className="block">
                    <div className="title">You owe</div>
                    <div className="positive">₹{owe}</div>
                </div>
                <div className="block">
                    <div className="title">You are owed</div>
                    <div className="positive">₹{owed}</div>
                </div>

            </div>
            <div className="summary">
                <div className="expense-list text-left">
                    <h2>You owe</h2>
                    <ul>
                        {
                            negativeList.map((val) => {
                                return (
                                    <li className="flex" key={val.id}>
                                        <img className="avatar-icon" src="https://s3.amazonaws.com/splitwise/uploads/user/default_avatars/avatar-blue16-100px.png" />
                                        <div>
                                            <span>{val.name}</span>
                                            <br />
                                            <span>you owe ₹{val.value} </span>
                                        </div>
                
                                    </li>

                                )
                            }
                            )
                        }
                    </ul>
                </div>
                <div className="expense-list text-left">
                    <h2>You are owed</h2>
                    <ul>
                        {
                            positiveList.map((val) => {
                                return (
                                    <li className="flex" key={val.id}>
                                        <img className="avatar-icon" src="https://s3.amazonaws.com/splitwise/uploads/user/default_avatars/avatar-blue16-100px.png" />
                                        <div>
                                            <span>{val.name}</span>
                                            <br />
                                            <span>owes you ₹{val.value} </span>
                                        </div>
                
                                    </li>

                                )
                            }
                            )
                        }
                    </ul>
                </div>
               

            </div>
        </div>
    )
}