import React, {FunctionComponent, useEffect, useState} from 'react';
import GroupInterface from "../Interfaces/GroupInterface";

interface GroupInterface2 {
    name: string;
    description: string;
}
const AddFormGroup = (props) => {
    const [formData, setFormData] = useState<GroupInterface2>({
        name: "",
        description: "",
    });



    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(JSON.stringify(formData));
        fetch(`http://localhost:5001/api/groups`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(formData)
        }).then(() => props.setTrigger(false));
    };

    return (props.trigger) ? (
        <div className="login-page">

            <div className="form1">
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="forClose">
                        <button className="closeButton" onClick={() => props.setTrigger(false)}>&times;</button>
                    </div>
                    <h4>Створити групу: </h4>
                    <div className="columns">
                        <div>
                            <label>Назва:
                                <input type="text" required
                                       onChange={(e) => setFormData({...formData, name: e.target.value})}/>
                            </label>
                        </div>
                        <div>

                            <label>Опис:
                                <input type="text" required
                                       onChange={(e) => setFormData({...formData, description: e.target.value})}/>
                            </label>

                        </div>
                    </div>
                    <button type="submit" className="okButton">Надіслати</button>
                </form>
            </div>
        </div>
    ) : "";
};

export default AddFormGroup;