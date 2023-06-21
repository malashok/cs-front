import React, {FunctionComponent, useEffect, useState} from 'react';
import ProductInterface from "../Interfaces/ProductInterface";
import GroupInterface from "../Interfaces/GroupInterface";

const EditFormProduct = (props) => {
    const [groups, setGroups] = useState<GroupInterface[]>([]);
    useEffect(() => {
        fetch(`http://localhost:5001/api/goods/${props.prodId}`).then((res) => {
                if (res.ok) {
                    return res.json();
                }
            }
        ).then((jsonResponse) => {
            setFormData(jsonResponse)
        }).catch((er)=>{});
    }, [props.prodId]);
    const [formData, setFormData] = useState<ProductInterface>({
        id: props.prodId,
        name: "",
        price: -1,
        amount: 0,
        description: "",
        producer: "",
        group_name: ""
    });


    const handleSubmit = (e) => {
        e.preventDefault();
        formData.id = props.prodId;
        fetch(`http://localhost:5001/api/goods/${props.prodId}`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            method: "PATCH",

            body: JSON.stringify(formData)
        })
            .then(function (response) {

                 console.log(response);
                return response.json();

            }).then(() => props.setTrigger(false));
    };

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
    return (props.trigger) ? (
        <div className="login-page">

            <div className="form1">
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="forClose">
                        <button className="closeButton" onClick={() => props.setTrigger(false)}>&times;</button>
                    </div>
                    <h4>ID: {formData.id}</h4>
                    <div className="columns">
                        <div>
                            <label>Назва:
                                <input type="text" value={formData.name} required
                                       onChange={(e) => setFormData({...formData, name: e.target.value})}/>
                            </label>
                            <label>Ціна:
                                <input type="number" min ="1" value={formData.price} required
                                       onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}/>
                            </label>
                            <label>Група:
                                <select required value={formData.group_name} onChange={(e) => setFormData({...formData, group_name: e.target.value})}>
                                    {groups.map((el=>{return (
                                        <option key={el.name} value={el.name}>{el.name}</option>);
                                    }))}
                                </select></label>
                        </div>
                        <div>
                            <label>Кількість:
                                <input type="number" value={formData.amount} min = "0" required
                                       onChange={(e) => setFormData({...formData, amount: Number(e.target.value)})}/>
                            </label>
                            <label>Виробник:
                                <input type="text" value={formData.producer} required
                                       onChange={(e) => setFormData({...formData, producer: e.target.value})}/>
                            </label>
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

export default EditFormProduct;