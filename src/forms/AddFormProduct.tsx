import React, {FunctionComponent, useEffect, useState} from 'react';
import GroupInterface from "../Interfaces/GroupInterface";


interface ProductInterface2 {
    name: string;
    price: number;
    amount: number;
    group_name: string;
    producer: string;
    description: string;
}

const AddFormProduct = (props) => {
    const [groups, setGroups] = useState<GroupInterface[]>([]);
    const [formData, setFormData] = useState<ProductInterface2>({
        name: "",
        price: -1,
        amount: 0,
        description: "",
        producer: "",
        group_name: ""
    });

    useEffect(() => {
        fetch("http://localhost:5001/api/groups").then((res) => {
                console.log(res)
                if (res.ok) {
                    return res.json();
                }
            }
        ).then((jsonResponse) => {
            setGroups(jsonResponse.result)
        });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`http://localhost:5001/api/goods`, {
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
                <h4>ID: {props.prodId}</h4>
                <div className="columns">
                    <div>
                        <label>Назва:
                            <input type="text" required
                                   onChange={(e) => setFormData({...formData, name: e.target.value})}/>
                        </label>
                        <label>Ціна:
                            <input type="number" min ="1" required
                                   onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}/>
                        </label>
                        <label>Група:
                            <select required onChange={(e) => setFormData({...formData, group_name: e.target.value})}>
                                <option value=""></option>
                                {groups.map((el=>{return (
                                    <option key={el.name} value={el.name}>{el.name}</option>);
                                }))}
                            </select>
                        </label>
                    </div>
                    <div>
                        <label>Кількість:
                            <input type="number" min = "0" required
                                   onChange={(e) => setFormData({...formData, amount: Number(e.target.value)})}/>
                        </label>
                        <label>Виробник:
                            <input type="text" required
                                   onChange={(e) => setFormData({...formData, producer: e.target.value})}/>
                        </label>
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
): "";
}

export default AddFormProduct;
