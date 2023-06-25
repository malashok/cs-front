import React, {FunctionComponent, useEffect, useState} from 'react';
import EditFormProduct from "../forms/EditFormProduct";
import ProductInterface from "../Interfaces/ProductInterface";
import GroupInterface from "../Interfaces/GroupInterface";
import DeleteFormProduct from "../forms/DeleteFormProduct";
import EditFormGroup from "../forms/EditFormGroup";
import DeleteFormGroup from "../forms/DeleteFormGroup";
import AddFormProduct from "../forms/AddFormProduct";
import AddFormGroup from "../forms/AddFormGroup";




const Groups: FunctionComponent = () => {
   const [groups, setGroups] = useState<GroupInterface[]>([]);
    const [filteredArr ,setFilteredArr] = useState<GroupInterface[]>([]);
    const [buttonPopup, setButtonPopup] = useState(false);
    const [buttonDelPopup, setButtonDelPopup] = useState(false);
    const [buttonAddPopup, setButtonAddPopup] = useState(false);
    const [idProd, setIdProd] = useState(-1);

    useEffect(() => {
        fetch("http://localhost:5001/api/groups").then((res) => {
                console.log(res)
                if (res.ok) {
                    return res.json();
                }
            }
        ).then((jsonResponse) => {
            setGroups(jsonResponse.result)
            setFilteredArr(jsonResponse.result);
            filteredArr.sort((prev, curr) => prev.id-curr.id);
        });

    }, [buttonPopup, buttonDelPopup, buttonAddPopup]);
    const [filterSearch, setFilterSearch] = useState('');


    const handleSubmit = (e) =>{
        e.preventDefault();
        const filterArr = groups.filter((x) => {
            if (filterSearch !== '') {
                for (const p in x) {
                    console.log(p)
                    //if (x[p] == filterSearch) {
                    if(x[p].toString().toLowerCase().startsWith(filterSearch.toLowerCase())){
                        return x;
                    }
                }
                return '';
            } else {
                return x;
            }
        }).sort((prev, curr) => prev.id-curr.id);
        setFilteredArr(filterArr);
    };

    return (
        <div>
            <div className="cont">
                <form className="example" onSubmit={handleSubmit}>
                    <input type="text" placeholder="Пошук..." onChange={(e) => setFilterSearch(e.target.value)}></input>
                    <button type="submit">Знайти</button>
                </form>
            </div>
            <div className = "forTable">
                <table className="table-fill">
                    <thead>
                    <tr>
                        <th className="text-left">id</th>
                        <th className="text-left">Назва</th>
                        <th className="text-left desc">Опис</th>
                        <th className="forAdd"><button className="addButton" onClick={() => setButtonAddPopup(true)}>+</button></th>
                    </tr>
                    </thead>
                    <tbody className="table-hover">
                    {filteredArr.map((el) => {
                        return(
                            <tr key={el.id}>
                                <td className="text-left">{el.id}</td>
                                <td className="text-left">{el.name}</td>
                                <td className="text-left desc">{el.description}</td>
                                <td><div className="columns">
                                    <div>
                                        <button className="button-24" onClick={() => {
                                            setButtonPopup(true);
                                            setIdProd(el.id);
                                        }}> Редагувати
                                        </button>
                                    </div>
                                    <div>
                                        <button className="button-24 red" onClick={() => {
                                            setButtonDelPopup(true);
                                            setIdProd(el.id);
                                        }}> Видалити
                                        </button>
                                    </div>
                                </div></td>
                            </tr>

                        );
                    })}

                    </tbody>
                </table>

            </div>
            <EditFormGroup  trigger={buttonPopup} setTrigger={setButtonPopup} prodId={idProd}></EditFormGroup>
            <DeleteFormGroup trigger={buttonDelPopup} setTrigger={setButtonDelPopup} prodId={idProd}></DeleteFormGroup>
            <AddFormGroup trigger={buttonAddPopup} setTrigger={setButtonAddPopup}></AddFormGroup>
        </div>
    );
};

export default Groups;
