import {FunctionComponent, useEffect, useState} from 'react';
import "./products.css";
import "./button.css";
import "./filters.css";
import EditFormProduct from "../forms/EditFormProduct";
import ProductInterface from "../Interfaces/ProductInterface";
import GroupInterface from "../Interfaces/GroupInterface";
import DeleteFormProduct from "../forms/DeleteFormProduct";
import AddFormProduct from "../forms/AddFormProduct";
import EditAmountForm from "../forms/EditAmountForm";


const Products: FunctionComponent = () => {
    const [arr, setArr] = useState<ProductInterface[]>([]);
    const [groups, setGroups] = useState<GroupInterface[]>([]);
    const [filteredArr ,setFilteredArr] = useState<ProductInterface[]>([]);
    const [buttonPopup, setButtonPopup] = useState(false);
    const [buttonDelPopup, setButtonDelPopup] = useState(false);
    const [buttonAddPopup, setButtonAddPopup] = useState(false);
    const [idProd, setIdProd] = useState(-1);
    const [editAmount, setEditAmount] = useState(false);
    const [currentAmount, setCurrentAmount] = useState(-1);

    useEffect(() => {
        fetch("http://localhost:5001/api/goods").then((res) => {
                console.log(res)
                if (res.ok) {
                    return res.json();
                }
            }
        ).then((jsonResponse) => {
            setArr(jsonResponse.result)
            setFilteredArr(jsonResponse.result);
            filteredArr.sort((prev, curr) => prev.id-curr.id);
            });

    }, [buttonPopup, buttonDelPopup, buttonAddPopup, editAmount]);
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
    const [filterSearch, setFilterSearch] = useState('');
    const [filterGroup, setFilterGroup] = useState('all');
    const [filterPriceTo, setFilterPriceTo] = useState(0);
    const [filterPriceFrom, setFilterPriceFrom] = useState(0);


    const handleSubmit = (e) =>{
        e.preventDefault();
        const filterArr = arr.filter((x) => {
            if (filterGroup !== 'all') {
                return x.group_name === filterGroup;
            } else {
                return x;
            }
        }).filter((x) => {
            console.log(filterPriceFrom + " " + filterPriceTo)
            if(filterPriceTo === 0) return x.price >= Number(filterPriceFrom)
            return x.price >= Number(filterPriceFrom) && x.price <= Number(filterPriceTo);
        }).filter((x) => {
            if (filterSearch !== '') {
                for (const p in x) {
                    console.log(p)
                    if (x[p] == filterSearch) {
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
    <form className="filters" onSubmit ={handleSubmit}>

        <div className="row cont">
            <div className = "col">
        <label>Ціна від:
            <input type="number" className ="input" min="0"
                   onChange={(e) => setFilterPriceFrom(Number(e.target.value))}/>
        </label></div>
        <div className = "col"><label> Ціна до:
            <input type="number" className ="input" min="1"
                   onChange={(e) => setFilterPriceTo(Number(e.target.value))}/>
        </label></div>
            <div className = "col">
            <label>Група:
                <select onChange={(e) => setFilterGroup(e.target.value)}>
                    <option value="all">Виберіть опцію</option>
                    {groups.map((el=>{return (
                        <option key={el.name} value={el.name}>{el.name}</option>);
                    }))}

                </select></label>
            </div>
            <div className = "col2">
                <button className ="but" type="submit">Застосувати</button>
            </div>
        </div>
    </form>
        <div className = "forTable">
            <table className="table-fill">
                <thead>
                <tr>
                    <th className="text-left">id</th>
                    <th className="text-left">Назва</th>
                    <th className="text-left">Кількість</th>
                    <th className="text-left">Ціна</th>
                    <th className="text-left">Група</th>
                    <th className="text-left">Виробник</th>
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
                            <td className="text-left" onClick={() => {setEditAmount(true); setIdProd(el.id); setCurrentAmount(el.amount)}}>{el.amount}</td>
                            <td className="text-left">{el.price}</td>
                            <td className="text-left">{el.group_name}</td>
                            <td className="text-left">{el.producer}</td>
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
    <EditAmountForm trigger={editAmount} setTrigger={setEditAmount} prodId={idProd} currentAmount={currentAmount}></EditAmountForm>
    <EditFormProduct trigger={buttonPopup} setTrigger={setButtonPopup} prodId={idProd}></EditFormProduct>
    <DeleteFormProduct trigger={buttonDelPopup} setTrigger={setButtonDelPopup} prodId={idProd}></DeleteFormProduct>
    <AddFormProduct trigger={buttonAddPopup} setTrigger={setButtonAddPopup}></AddFormProduct>
</div>
    );
};

export default Products;
