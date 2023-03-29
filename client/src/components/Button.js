import React from "react";

const Button = ({ text, id, onClick }) => {
    return (
        <button
            id={id}
            style={{ margin: "20px 0px" }}
            onClick={onClick}
            type="button"
            className="btn-go"
        >
            {text}
        </button>
    );
};

export default Button;