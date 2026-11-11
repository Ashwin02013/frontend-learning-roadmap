


function Renderinglist() {
    const fruits = [{id:1, name:"apple"},
        {id:2, name:"orange"} , {id:3 , name:"banana"},{id:4, name:"pineapple"} ];
    const listItems = fruits.map(fruit => <li key={fruit.id}>{fruit.name}</li>);
    return <ol>{listItems}</ol>;
}

export default Renderinglist


