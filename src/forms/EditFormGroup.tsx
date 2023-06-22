import React, {FunctionComponent, useEffect, useState} from 'react';
import GroupInterface from "../Interfaces/GroupInterface";


const EditFormGroups = (props) => {
    useEffect(() => {
        fetch(`http://localhost:5001/api/groups/${props.prodId}`).then((res) => {
                if (res.ok) {
                    return res.json();
                }
            }
        ).then((jsonResponse) => {
            setFormData(jsonResponse);
        }).catch((er)=>{});
    }, [props.prodId]);

    const [formData, setFormData] = useState<GroupInterface>({
        id: 0,
        name: "",
        description: "",
    });


    const handleSubmit = (e) => {

        e.preventDefault();
        fetch(`http://localhost:5001/api/groups/${props.prodId}`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            method: "PATCH",

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
                    <h4>ID: {props.prodId}</h4>
                    <div className="columns">
                        <div>
                            <label>Назва:
                                <input type="text" value={formData.name} required
                                       onChange={(e) => setFormData({...formData, name: e.target.value})}/>
                            </label>
                        </div>
                        <div>

                            <label>Опис:
                                <input type="text" value={formData.description} required
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

export default EditFormGroups;