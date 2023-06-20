import {FunctionComponent} from 'react';

const Products: FunctionComponent = () => {

    return (

        <div>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
            <div className = "center">
                <div>
                    <h2>Найкращий спосіб допомогти нам
                        і нашим хвостикам – пожертвувати будь-яку суму на корм, лікування та забезпечення роботи
                        притулку.</h2>
                </div>
                <div className="cent">
                    <form action="https://click.pulse.is/public/s/MjMyOTY=/p/MjcyMzA=/l/aHR0cHM6Ly9zZW5kLm1vbm9iYW5rLnVhL2phci8zcFA4VjhnVXdF" >
                        <button type="submit" className="button-24" role="button"> <h3 className = "forText">Допомогти</h3>
                            <span className="material-symbols-outlined">pets</span>
                        </button></form></div>
            </div>

        </div>


    );
};

export default Products;