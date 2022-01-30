import { useContext } from "react";
import LoggedInUserContext from "../../context/LoggedInUser";
import MultiUserSelect from "../../components/multiUserSelect/MultiUserSelect";
import useForm from '../../hooks/useForm';
import Modal from "../../components/modal/Modal";
import Error from "../../components/error/Error";
import  constant  from "../../App.enum";

export default function AddExpense({ toggle, list, onSave }) {
    const { values, errors, handleSubmit, register, setFormValue } = useForm(onSubmit, validate, handleChange);
    const loggedInUser = useContext(LoggedInUserContext)
  
    function onSubmit() {
        let total;
        total = values.persons.reduce((acc, val) => {
            acc += Number(values[val.id]);
            return acc;
        }, 0);
        total += Number(values[loggedInUser.id]);
        if (values.type === constant.percentage) {
            if (Math.round(total * 10) / 10 !== 100) {
                alert("Total percentage is not right.");
                return;
            }
        } else {
            if (total != Number(values.amount)) {
                alert("Total split amount is not right.");
                return;
            }
        }

        onSave(values);
        toggle();
    }
    function validate(name, value) {
        switch (name) {
            case constant.persons: if (!value || !value.length) return "There is only one person involved in this expense.";
                break;
            case constant.description: if (!value) return "You must enter a description.";
                break;
            case constant.amount: if (!value) return "You must enter an amount."
                if(Number(value)<=0) return "Amount should be greater than zero."
                break;
            case constant.paid: if (!value) return "You must enter who paid."
                break;
            case constant.type: if (!value) return "You must enter expense type."
                break;
            default: return false;
        }
        return false;
    }
    function handleChange(name, value) {
        if (name === constant.type || name === constant.persons || name === constant.amount) {
            let type = name === constant.type ? value : values.type;
            if(type===constant.percentage) 
                setPercentage(name, value);
            else {
                setEqual(name, value);
            }
        }
          
    }
    function setEqual(name, value) {
        let amount = name === constant.amount ? value : values.amount;
        let persons = name === constant.persons ? [...value, loggedInUser] : values.persons ? [...values.persons, loggedInUser]:[loggedInUser];
        const splitPercentage = amount /( persons && persons.length) || 1;
        persons && persons.forEach((person) => {
            setFormValue(splitPercentage, person.id);
        });
    }
    function setPercentage(name, value) {
        
        let persons = name === constant.persons ? [...value, loggedInUser] : values.persons ? [...values.persons, loggedInUser]:[loggedInUser];
        const splitPercentage = 100 /( persons && persons.length) || 1;
        persons && persons.forEach((person) => {
            setFormValue(splitPercentage, person.id);
        });
    }
    function getSplitShareList() {
        let persons = values.persons ? [...values.persons, loggedInUser]:[loggedInUser];
        return persons.map((item) => {
            return (
                <div key={item.id} className="formController">
                    <div>
                        <span className="share-name">{item.name}:</span>
                        <input disabled={values.type === constant.equally} type="number" value={values[item.id] || ''}  {...register(item.id)}></input>
                    </div>
                </div>
            )
        })
    }
    
    return (
        <Modal>
            <div className="form-container">
                <h5>Add Expense</h5>
                <form onSubmit={handleSubmit}>
                <div className="formController">
                     <label>Add Friends</label>
                    <MultiUserSelect displayKey="name" list={list} selectedList={values.persons || []} {...register(constant.persons)}></MultiUserSelect>
                        <Error error={errors[constant.persons]}></Error>
                        </div>
                    <div className="formController">
                        <label>Description</label>
                        <textarea placeholder="Enter a description" {...register(constant.description)}></textarea>
                        <Error error={errors[constant.description]}></Error>
                    </div>
                    <div className="formController">
                        <label>Amount</label>
                        <input type="number" placeholder="0.0" {...register(constant.amount)}></input>
                        <Error error={errors[constant.amount]}></Error>
                    </div>
                    <div className="formController">
                        <label>Who paid?</label>
                        <select placeholder="0.0" {...register(constant.paid)}>
                            <option value="">Select who paid</option>
                            <option value={loggedInUser.id}>{loggedInUser.name}</option>
                            {
                                values.persons && values.persons.map((value) => {
                                    return <option id={value.id} value={value.id}>{value.name}</option>
                                })
                            }
                        </select>
                        <Error error={errors[constant.paid]}></Error>
                    </div>
                    <div className="formController">
                        <label>Expense Type</label>
                        <select placeholder="Expense Type" {...register(constant.type)}>
                            <option value="">Select Type</option>
                            <option value={constant.equally}>Equally</option>
                            <option value={constant.exact}>Exact</option>
                            <option value={constant.percentage}>Percentage</option>
                        </select>
                        <Error error={errors[constant.type]}></Error>
                    </div>
                    <div className="share">
                        <label>Share</label>
                        {getSplitShareList()}
                    </div>
                    <button className="btn btn-primary m-r-10" type="submit">Save</button>
                    <button className="btn" onClick={toggle}>Cancel</button>
                </form>
            </div>
        </Modal>
    )
}