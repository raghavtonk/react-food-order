import { useContext, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import UserProgressContext from "../store/UserProgressContext";


export default function Modal({ children, open, className = "", onClose }) {
  const dialog = useRef();
  useEffect(() => {
    const modal = dialog.current
    if (open) {
      modal.showModal();
    }
    return ()=> modal.close()
    
  }, [open]);
  const userProgressCtx = useContext(UserProgressContext);
function handleClose(){
    let preValue=''
    if(userProgressCtx.progress !== ''){
        preValue=userProgressCtx.progress
    }
    onClose();
    if(preValue === 'checkout'){
        userProgressCtx.showCheckout()
    }
}

  return createPortal(
    <dialog ref={dialog} className={`modal ${className}`} onClose={handleClose}>
      {children}
    </dialog>,
    document.getElementById("modal")
  );
}
