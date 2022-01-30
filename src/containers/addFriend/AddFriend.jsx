import Modal from "../../components/modal/Modal";
import useForm from '../../hooks/useForm';
import Error from "../../components/error/Error";

export default function AddFriend({ toggle, onSave }) {
    const { values, errors, handleSubmit, register } = useForm(onSubmit, validate);
    function onSubmit() {
        onSave(values);
        toggle();
    }
    function validate(name, value) {
        switch (name) {
            case "name": if (!value) return "You must enter a name.";
                break;
            case "email": if (!value) return "You must enter email."
                break;
            default: return false;
        }
        return false;
    }
    return (
        <Modal>
            <div className="form-container">
                <h5>Add Friends</h5>
                <form onSubmit={handleSubmit}>
                    <div className="formController">
                        <label>Name</label>
                        <input type="text" placeholder="Enter name" {...register('name')}></input>
                        <Error error={errors['name']}></Error>
                    </div>
                    <div className="formController">
                        <label>Email</label>
                        <input type="text" placeholder="Enter email" {...register('email')}></input>
                        <Error error={errors['email']}></Error>
                    </div>
                    <button className="btn btn-primary m-r-10" type="submit">Save</button>
                    <button className="btn" onClick={toggle}>Cancel</button>
                </form>
            </div>
        </Modal>
    )
}