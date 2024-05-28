import React from 'react';

const Modal = (props) => {

    if(props.status== "ended"){
        let text;
        let resultClass;
        if(props.result== "win"){text="Ganhaste! 👌"; resultClass="win"}
        if(props.result== "lose"){text="Perdeste! 🙁"; resultClass="lose"}
        return (
            <div className={`modal ${resultClass}`}>
                <b>{text}</b>
            </div>
        )
    }

}

export default Modal;