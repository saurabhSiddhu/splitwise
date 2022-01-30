import { useRef, useState } from 'react';
import "./MultiUserSelect.css";
export default function MultiUserSelect({ list, selectedList, onChange, displayKey }) {
    const [value, setValue] = useState('');
    const inputRef = useRef();
    const [focused, setFocused] = useState(false);
    const onFocus = () => setFocused(true);
    const onBlur = () => {
        setTimeout(() => {
            setFocused(false)
        }, 1000);
    };
    const getList = () => {
        const regex = new RegExp(value, 'ig');
        let renderedList =  list.filter((item) => !selectedList.find(selected => {
            return selected.id === item.id;
        }) && regex.test(item[displayKey])).map((item) => (
            <li className="pointer" key={item.id} onClick={() => handleSelect(item)}>
                {item[displayKey]}
            </li>));
        return renderedList.length? renderedList : <li>Add more Friends</li>
    };

    const handleChange = ($event) => {
        setValue($event.target.value);
    }
    const handleSelect = (value) => {
        onChange([...selectedList, value]);
    };
    const handleRemoveChip = (item) => {
        const filteredList = selectedList.filter((val) => val.id !== item.id);
        onChange(filteredList);
    }
    const getSelectedList = () => (
        selectedList.map((item) => (
            <span className="chip" key={item.id} >
                <span className="chip-title">{item[displayKey]}</span>
                <div className="cross-button" onClick={() => handleRemoveChip(item)}>
                    <svg height="14" width="14" viewBox="0 0 20 20" aria-hidden="true" focusable="false" ><path d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"></path></svg>
                </div>
            </span>
        )
        )
    )
    function handleFocus() {
        inputRef.current.focus();
    }
    return (
        <div className="multiUserSelect">
            <div className="input-container">
                {getSelectedList()}
                <div className="input-box" data-value={value} onClick={handleFocus}>
                    <input value={value} onChange={handleChange} ref={inputRef} onFocus={onFocus} onBlur={onBlur} ></input>
                </div>
            </div>
            {focused && <ul className="list">
                {
                    getList()
                }
            </ul>
            }
            
        </div>
    )
}
