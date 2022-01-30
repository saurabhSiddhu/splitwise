import "./Header.css";
import LoggedInUserContext from "../../context/LoggedInUser";
import { useContext } from "react";
export default function Header() {
    const loggedInUser = useContext(LoggedInUserContext);
    return (
        <header className="navbar">
            <div>
                <h5 className="text-md">Splitwise</h5>
            </div>
            <div className="flex center">
            <img src="https://s3.amazonaws.com/splitwise/uploads/user/default_avatars/avatar-orange28-50px.png"/>
                <span className="name">{loggedInUser.name }</span>
            </div>
        </header>
    )
}