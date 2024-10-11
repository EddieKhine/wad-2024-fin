// app/customers/ManageCustomers.js
'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link'; // Import Link for navigation
import './ManageCustomers.css';

const ManageCustomers = () => {
    const [customers, setCustomers] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    // Fetch customers when the component mounts
    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        try {
            const response = await fetch('/api/customers');
            if (!response.ok) throw new Error('Failed to fetch customers');
            const data = await response.json();
            setCustomers(data);
        } catch (error) {
            console.error('Error fetching customers:', error);
        }
    };

    const handleAddCustomer = async () => {
        try {
            const response = await fetch('/api/customers', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email }),
            });
            if (!response.ok) throw new Error('Failed to add customer');
            const newCustomer = await response.json();
            setCustomers((prev) => [...prev, newCustomer]);
            setName('');
            setEmail('');
        } catch (error) {
            console.error('Error saving customer:', error);
        }
    };

    const handleUpdate = async () => {
        try {
            const response = await fetch(`/api/customers/${selectedCustomer._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: selectedCustomer._id, name, email }),
            });
            if (!response.ok) throw new Error('Failed to update customer');
            const updatedCustomer = await response.json();
            setCustomers((prev) => prev.map((customer) => (customer._id === updatedCustomer._id ? updatedCustomer : customer)));
            setSelectedCustomer(null);
            setName('');
            setEmail('');
        } catch (error) {
            console.error('Error updating customer:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`/api/customers/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Failed to delete customer');
            setCustomers((prev) => prev.filter((customer) => customer._id !== id));
        } catch (error) {
            console.error('Error deleting customer:', error);
        }
    };

    return (
        <div className="container">
           
            {/* Create Customer Form */}
            <h2>Create New Customer</h2>
            <form className="create-form" onSubmit={(e) => { e.preventDefault(); handleAddCustomer(); }}>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    required
                />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
                <button type="submit">Add Customer</button>
            </form>

            {/* Customers Table */}
            <h2>Customers List</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map(customer => (
                        <tr key={customer._id}>
                            <td>
                                <Link href={`/customers/${customer._id}`}>{customer.name}</Link>
                            </td>
                            <td>{customer.email}</td>
                            <td>
                                <button onClick={() => {
                                    setSelectedCustomer(customer);
                                    setName(customer.name);
                                    setEmail(customer.email);
                                }}>
                                    Edit
                                </button>
                                <button onClick={() => handleDelete(customer._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Update Customer Form */}
            {selectedCustomer && (
                <div>
                    <h2>Update Customer</h2>
                    <form onSubmit={(e) => { e.preventDefault(); handleUpdate(); }}>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Name"
                            required
                        />
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            required
                        />
                        <div>
                            <button type="submit">Update</button>
                            <button type="button" onClick={() => setSelectedCustomer(null)}>Cancel</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ManageCustomers;
