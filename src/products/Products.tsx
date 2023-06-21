import {FunctionComponent, useEffect, useState} from 'react';
import "./products.css";
import "./button.css";
import "./filters.css";

interface ProductInterface {
    id: number;
    name: string;
    price: number;
    amount: number;
    group_name: string;
    producer: string;
    description: string;
}
interface GroupInterface {
    id: number;
    name: string;
    desc: string;
}

const Products: FunctionComponent = () => {
    const [arr, setArr] = useState<ProductInterface[]>([]);
    const [groups, setGroups] = useState<GroupInterface[]>([]);
    useEffect(() => {
        fetch("http://localhost:5001/api/goods").then((res) => {
                console.log(res)
                if (res.ok) {
                    return res.json();
                }
            }
        ).then((jsonResponse) => {
            setArr(jsonResponse.result)
        });
    }, []);
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
    const [filterPriceTo, setFilterPriceTo] = useState(1000000000);
    const [filterPriceFrom, setFilterPriceFrom] = useState(0);
    const [change, setFilterChange] = useState(false);
    let filteredArr = Object.assign(arr);

    useEffect(() =>{
        filteredArr = arr.filter((x) => {
            if (filterSearch !== '') {
                for (const p in x) {
                    if (p.includes(filterSearch)) {
                        return x;
                    }
                }
                return '';
            } else {
                return x;
            }
        }).filter((x) => {
            if (filterGroup !== 'all') {
                return x.group_name === filterGroup;
            } else {
                return x;
            }
        }).filter((x) => {
            return x.price > filterPriceFrom && x.price < filterPriceTo;
        });
    }, [change]);
    const handleSubmit = (e) =>{
        e.preventDefault();
        setFilterChange(true);
    }
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
            <input type="number" className ="input"
                   onChange={(e) => setFilterPriceFrom(Number(e.target.value))}/>
        </label></div>
        <div className = "col"><label> Ціна до:
            <input type="number" className ="input"
                   onChange={(e) => setFilterPriceTo(Number(e.target.value))}/>
        </label></div>
            <div className = "col">
            <label>Група:
                <select onChange={(e) => setFilterGroup(e.target.value)}>
                    <option value="">Виберіть опцію</option>
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
                    <th></th>
                </tr>
                </thead>
                <tbody className="table-hover">
                {filteredArr.map((el) => {
                    return(
                        <tr key={el.id}>
                            <td className="text-left">{el.id}</td>
                            <td className="text-left">{el.name}</td>
                            <td className="text-left">{el.amount}</td>
                            <td className="text-left">{el.price}</td>
                            <td className="text-left">{el.group_name}</td>
                            <td className="text-left">{el.producer}</td>
                            <td className="text-left desc">{el.description}</td>
                            <td><div className="columns">
                                <div>
                                    <button className="button-24 "> Редагувати
                                    </button>
                                </div>
                                <div>
                                    <button className="button-24 red"> Видалити
                                    </button>
                                </div>
                            </div></td>
                        </tr>

                    );
                })}

                </tbody>
            </table>

        </div>

</div>
    );
};

export default Products;
