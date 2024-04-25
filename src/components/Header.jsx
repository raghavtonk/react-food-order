import { useContext } from 'react'
import headerImg from '../assets/logo.jpg'
import CartContext from '../store/CartContext'
import UserProgressContext from '../store/UserProgressContext'
export default function Header({}){
    const cartCtx = useContext(CartContext)
    const userProgressCtx = useContext(UserProgressContext)
    const totalCartItem = cartCtx.items.reduce((totalNUmberofItem,item)=>{
        return totalNUmberofItem + item.quantity
    },0)
    return(
        <header id="main-header">
            <div id="title">
                <img src={headerImg} alt="App logo" />
                <h1>REACTFOOD</h1>
            </div>
            <nav>
            <button className="button" onClick={userProgressCtx.showCart} >Cart({totalCartItem})</button>
            </nav>
        </header>
    )
}