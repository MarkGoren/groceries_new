
import './App.css';
import groceries from "./data/groceries.json";
import shoppingList from "./data/shoppingList.json";
import React, { useState } from "react";

function App() {
  const [myGroceries, setMyGroceries] = useState(groceries)
  const [myShoppingList, setMyShoppingList] = useState(shoppingList)

  const handleProduct = (e) => {
    let productId = parseInt(e.target.value)
    myGroceries.filter(product => product.id === productId)[0].quantity --

    if(myGroceries.filter(product => product.id === productId)[0].quantity === 0){
      let product = myGroceries.filter(product => product.id === productId)[0]
      myGroceries.splice(myGroceries.indexOf(product), 1)
      myGroceries.push(product)
    }

    if(!myShoppingList.filter(product => product.id === productId).length){
      myShoppingList.push({...myGroceries.filter(product => product.id === productId)[0]})
      myShoppingList.filter(product => product.id === productId)[0].quantity = 1
    }else{
      myShoppingList.filter(product => product.id === productId)[0].quantity ++
    }

    setMyGroceries([...myGroceries])
    setMyShoppingList([...myShoppingList])
  }

  return (
    <>
      <div className='container' style={{'display': 'flex'}}>
        <div className='card' style={{'width': '25rem'}}>
          <div class="card-header">
            Groceries
          </div>

          <ul class="list-group list-group-flush">
            {myGroceries.map(product => <li class="list-group-item">
              <img src={product.imgSrc} alt='uh oh' style={{'width': '5rem', 'height': 'auto'}}></img>
              {product.quantity ? (
                <button value={product.id} onClick={handleProduct}>
                  Price: {product.price}, QTY: {product.quantity}
                </button>
              ): (
                <p>Price: {product.price}, QTY: {product.quantity} (Out Of Stock)</p>
              )}
            </li>)}
          </ul>
        </div>

        <div className='card' style={{'width': '25rem', 'marginLeft': '15rem'}}>
          <div class="card-header">
            Shopping List
          </div>

          <ul class="list-group list-group-flush">
            {myShoppingList.length ? (myShoppingList.map(product => <li class="list-group-item">
              <img src={product.imgSrc} alt='uh oh' style={{'width': '5rem', 'height': 'auto'}}></img>
              <span style={{'paddingLeft': '2rem'}}>Price: {product.price}, QTY: {product.quantity}</span>
            </li>)) : <p>Nothing Here Yet</p>}
          </ul>
        </div>
      </div>

      <div className='container' style={{'margin': '2.5rem 0 0 35rem'}}>
        <p>Total Items: {myShoppingList.map(product => product.quantity).reduce((a, b) => a + b, 0)}, Price: {myShoppingList.map(product => product.quantity * product.price).reduce((a, b) => a + b, 0)}</p>
        <button type='button' className='btn btn-success' style={{'marginLeft': '2rem'}}>Checkout</button>
      </div>
    </>
  );
}

export default App;