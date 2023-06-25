import {FunctionComponent, useEffect, useState} from "react";
import "./stats.css";

interface ProductInterface {
    id: number;
    name: string;
    price: number;
    amount: number;
    group_name: string;
    producer: string;
    description: string;
}
const Stats: FunctionComponent = () => {
    const all = "Всі групи"
    const [allProducts, setAllProducts] = useState<ProductInterface[]>([]);
    const [options, setOptions] = useState([]);
    const [price, setPrice] = useState(0);
    const [amount, setAmount] = useState(0);
    useEffect(() => {
        fetch("http://localhost:5001/api/groups").then((res) => {
                console.log(res)
                if (res.ok) {
                    return res.json();
                }
            }
        ).then((jsonResponse) => {
            const result = jsonResponse.result.map((group) => (group.name));
            result.unshift(all);
            setOptions(result);
        });
        fetch("http://localhost:5001/api/goods").then((res) => {
                if (res.ok) {
                    return res.json();
                }
            }
        ).then((jsonResponse) => {
            setAllProducts(jsonResponse.result);
        });
    }, []);


    const calculateData = (group: string) => {
        let calc_price = 0;
        let calc_amount = 0;
        let filteredProducts = allProducts;
        if (group != all){
            filteredProducts = allProducts.filter(pr => pr.group_name === group)
        }
        filteredProducts.forEach((product) => {
            calc_amount += product.amount;
            calc_price += (product.price * product.amount);
        });
        setAmount(calc_amount);
        setPrice(calc_price);
    }

    return (
        <div>
<div className="statDiv">
    <div className = "statDivDivs">
        <label>Оберіть групи:
                <select onChange={(o) => calculateData(o.target.value)}>
                    <option value="all"></option>
                    {options.map((opt=>{return (
                        <option key={opt} value={opt}>{opt}</option>);
                    }))}
                </select>
        </label>
    </div>
</div>
    <div className="statDivDivs stats-box">
        <p className="stats-p">Статистика</p>
        <hr/>
        <div className="for-columns">
        <p className="data_text">Ціна товарів: {price} грн</p>
        <p className="data_text">Кількість товарів: {amount} шт</p>
        </div>
    </div>
</div>
    );
};
export default Stats;
