import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');
    const [source, setSource] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await axios.get('http://localhost:5001/api/products', {
                headers: {
                    Authorization: localStorage.getItem('token')
                },
                params: {
                    search,
                    category,
                    source
                }
            });
            setProducts(response.data);
        };

        
        fetchProducts();
    }, [search, category, source]);

    return (
        <div>
            <h1>Product List</h1>
            <div>
                <input
                    type="text"
                    placeholder="Search by Name or SKU"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="">All Categories</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Books">Books</option>
                    <option value="Grocery">Grocery</option>

                </select>
                <select value={source} onChange={(e) => setSource(e.target.value)}>
                    <option value="">All Sources</option>
                    <option value="ADMIN">ADMIN</option>
                    <option value="USER">USER</option>
                </select>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>SKU</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Source</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.sku}>
                            <td>{product.name}</td>
                            <td>{product.sku}</td>
                            <td>{product.description}</td>
                            <td>{product.category}</td>
                            <td>{product.source}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductList;
