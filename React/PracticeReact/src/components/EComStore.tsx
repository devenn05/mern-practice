import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { toggleTheme } from '../store/uiSlice';
import type { UserProfile } from '../types';
import { addUser } from '../store/userSlice';
import type { Product } from '../types';
import {addToCart, removeFromCart} from '../store/cartSlice'
import { decrement, increment } from '../store/counterSlice';


const StoreItem = ({ product }: { product: Product }) => {
    const dispatch = useAppDispatch();
    const [ quantity, setQuantity] = useState(1)

    const handleAdd = () =>{
        if (quantity > 0){
            dispatch(addToCart({product, quantity}))
            setQuantity(1)
        }
    }
    return (
        <div>
            <h3>{product.name}</h3>
            <p>Price: ${product.price}</p>
            
            <div>
                <label>Qty:</label>
                <input type="number" min="1" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} />
                <button onClick={handleAdd}>Add to Cart</button>
            </div>
        </div>
    )
}


const EComStore = () => {
    const dispatch = useAppDispatch();

    const count = useAppSelector((state)=> state.counter);

    const isDark = useAppSelector((state)=> state.ui.isDarkMode)
    const themeStyles = {
    backgroundColor: isDark ? 'black' : '#FFF',
    color: isDark ? 'white' : 'black',
    minHeight: '100vh',
  };

  const {userList} = useAppSelector((state)=> state.user);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const country = 'India';

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) =>{
    e.preventDefault();
    const newUser: UserProfile = {name,email,address: {city,country}};
    dispatch(addUser(newUser));
    setName('');
    setEmail('');
    setCity('');
  }

  const {products} = useAppSelector(state=> state.product)
  const {item, totalAmount} = useAppSelector(state=> state.cart)

  return (
    <>
        <div>
            <h1>{count.count}</h1>
            <button onClick={()=> dispatch(increment())}>Add</button>
            <button onClick={()=> dispatch(decrement())}>Subtract</button>
        </div>
        <div style={themeStyles}>
            <span>Theme: <button onClick={()=> dispatch(toggleTheme())}>Mode</button> <br /></span>
            <br />
            <form onSubmit={handleSubmit}>
                <input type="text" value={name} onChange={(e)=>setName(e.target.value)} required placeholder='name'/>
                <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} required placeholder='email'/>
                <input type="text" value={city} onChange={(e)=>setCity(e.target.value)} required placeholder='city'/>
                <button type='submit'>Submit</button>
            </form>
            <br />
            <table>
                <thead>
                    <tr>
                        <td>Id</td>
                        <td>Name</td>
                        <td>Email</td>
                        <td>City</td>
                        <td>Country</td>
                    </tr>
                </thead>
                <tbody>
                    {userList.map((user, index)=>(
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.address.city}</td>
                            <td>{user.address.country}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        <br />
        <div>
            <div>
                <h2>Available Products</h2>
                {products.map(product => (
                    <StoreItem key={product.id} product={product} />
                ))}
            </div>
            <div>
                {item.length===0 ?(
                    <p>Your cart is completely empty.</p>
                ) : (
                    <table style={{ width: '100%', textAlign: 'left', marginTop: '20px', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ borderBottom: '2px solid #ccc' }}>
                                    <th>Product</th>
                                    <th>Price</th>
                                    <th>Qty</th>
                                    <th>Subtotal</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {item.map(Oneitem => (
                                    <tr key={Oneitem.id}>
                                        <td>{Oneitem.name}</td>
                                        <td>${Oneitem.price}</td>
                                        <td>{Oneitem.quantity}</td>
                                        <td><strong>${(Oneitem.price * Oneitem.quantity).toFixed(2)}</strong></td>
                                        <td><button onClick={() => dispatch(removeFromCart(Oneitem.id))}>Remove</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                )}
            </div>
        </div>
        </div>
    </>
  )
}

export default EComStore
