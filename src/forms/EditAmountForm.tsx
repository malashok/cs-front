import React, {FunctionComponent, useEffect, useState} from 'react';

const EditAmountForm = (props) => {
 const [newAmount, setNewAmount] = useState(0);

    const createRequest = (method: string) => {
        let allIsOk = true;
        if(method === 'reduce' && props.currentAmount < newAmount){
            allIsOk = false;
            window.alert('Ви намагаєтеся списати більше товару ніж є на складі!');
        }
        if(newAmount<0){
            allIsOk = false;
            window.alert("Ви не можете вводити від'ємні значення!");
        }
       if(allIsOk){
        fetch(`http://localhost:5001/${method}/amount/${props.prodId}/${newAmount}`, {
            method: "PATCH",
        }).then(() => {
            setNewAmount(0);
            props.setTrigger(false);
        })}
    };

    return (props.trigger) ? (
        <div className="login-page">
            <div className="form1">
                <form className="login-form">
                    <div className="forClose">
                        <button className="closeButton" onClick={() => { setNewAmount(0); props.setTrigger(false)}}>&times;</button>
                    </div>
                    <p>Додайте або спишіть товар</p>
                    <div className="edit-amount">
                        <button className="plus-minus" onClick={(e) => {e.preventDefault(); createRequest('reduce');}}>-</button>
                        <input className="newAmount" type="number" min ="1" required onChange={(e)=>setNewAmount(Number(e.target.value))}/>
                        <button className="plus-minus" onClick={(e) => { e.preventDefault(); createRequest('add'); }}>+</button>
                    </div>
                </form>
            </div>
        </div>
    ) : "";
};

export default EditAmountForm;
