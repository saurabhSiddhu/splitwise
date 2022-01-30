import './App.css';
import Header from './containers/header/Header';
import Dashboard from "./containers/dashboard/Dashboard";
import LoggedInUserContext from './context/LoggedInUser';
function App() {
  const LoggedInUser = { name: "John", email: "john@gmail.com", id: "1" };
  return (
    <LoggedInUserContext.Provider value={LoggedInUser}>
      <div className="App">
        <Header></Header>
        <div className="center-container">
          <section className="center-column">
            <Dashboard></Dashboard>
          </section>
        </div>
      
      </div>
    </LoggedInUserContext.Provider>
  );
}

export default App;
