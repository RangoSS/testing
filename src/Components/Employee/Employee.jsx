
import React, { useState, useEffect } from 'react';
import Form from '../Form.jsx'
import Card from '../Card.jsx'


const Employee = () => {
    //storing items
    const [items, setItems] = useState([]);
    //filtering
    const[filter,setFilter]=useState('');

    // Load data from localStorage when the app starts
    useEffect(() => {
        const storedItems = JSON.parse(localStorage.getItem('imageCards')) || [];
        setItems(storedItems);
    }, []);

    // Function to add new item
    const addItem = (newItem) => {
        const updatedItems = [...items, newItem];
        setItems(updatedItems);
        localStorage.setItem('imageCards', JSON.stringify(updatedItems));
    };

    //filter function start here
    const filterItems=items.filter(item=>
        item.name.toLowerCase().includes(filter.toLocaleLowerCase())
    );


    // Function to delete item
    const deleteItem = (id) => {
        console.log({ items });
        
        console.log({ id });
        // return
        const updatedItems = items.filter((item, index) => index === id);

        console.log({ updatedItems });
        
        return
        setItems(updatedItems);
        localStorage.setItem('imageCards', JSON.stringify(updatedItems));
    };

    // Function to update item
    const updateItem = (id, updatedItem) => {
        const updatedItems = items.map((item, index) => (index === id ? updatedItem : item));
        setItems(updatedItems);
        localStorage.setItem('imageCards', JSON.stringify(updatedItems));
    };
    return (

        <div className="container">
            <Form addItem={addItem} />
            <div className="row">
                {items.map((item, index) => (
                    <Card
                        key={index}
                        id={index}
                        item={item}
                        deleteItem={deleteItem}
                        updateItem={updateItem}
                    />
                ))}
            </div>
        </div>
    )
}

export default Employee
