// app/customers/[id]/page.js
"use client"; // Client Component

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation'; // Import for getting the params and router

const CustomerDetail = () => {
    const { id } = useParams(); // Get the customer ID from the URL
    const router = useRouter(); // Initialize the router for navigation
    const [customer, setCustomer] = useState(null);

    useEffect(() => {
        const fetchCustomer = async () => {
            if (id) {
                try {
                    const response = await fetch(`/api/customers/${id}`);
                    if (!response.ok) throw new Error('Failed to fetch customer');
                    const data = await response.json();
                    setCustomer(data);
                } catch (error) {
                    console.error('Error fetching customer:', error);
                }
            }
        };
        fetchCustomer();
    }, [id]);

    if (!customer) {
        return <div>Loading...</div>; // Simple loading message
    }

    return (
        <div>
            <h1>Customer Details</h1>
            <div>
                <p><strong>Name:</strong> {customer.name}</p>
                <p><strong>Email:</strong> {customer.email}</p>
                {/* Add more fields as necessary */}
            </div>
            <button onClick={() => router.back()}>
                Back to Customer Management
            </button>
        </div>
    );
};

export default CustomerDetail;
