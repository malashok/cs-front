import {FunctionComponent, useEffect, useState} from 'react';
import "./products.css";
import "./button.css";

interface ProductInterface {
    id: number;
    name: string;
    price: number;
    amount: number;
    group_name: string;
    producer: string;
    description: string;
}

const Products: FunctionComponent = () => {
    const [arr, setArr] = useState<ProductInterface[]>([]);
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

    return (

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
                {arr.map((el) => {
                    return(
                        <tr>
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


    );
};

export default Products;
