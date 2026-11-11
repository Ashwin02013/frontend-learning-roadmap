




function Button(){
    const handleClick = (e) => e.target.textContent="Xaasio";
    return(<button onClick={(e) => handleClick(e)}>click me </button>);
}


export default Button



