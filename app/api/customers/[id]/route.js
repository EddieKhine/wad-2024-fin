// app/api/customers/[id]/route.js
import Customer from "@/models/Customers"; // Adjust the path according to your project structure
import dbConnect from "@/lib/db"; // Utility for connecting to the database

export async function GET(request, { params }) {
    const { id } = params; // Get the ID from the URL parameters
    try {
        await dbConnect(); // Ensure the database is connected
        const customer = await Customer.findById(id);
        if (!customer) {
            return new Response('Customer not found', { status: 404 });
        }
        return new Response(JSON.stringify(customer), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.error('Error fetching customer:', error);
        return new Response('Failed to fetch customer', { status: 500 });
    }
}
// Update a customer by ID
export async function PUT(request, { params }) {
    try {
        await dbConnect(); // Ensure the database is connected
        const { id } = params; // Get the customer ID from the request parameters
        const updateData = await request.json(); // Get the updated data from the request
        const updatedCustomer = await Customer.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedCustomer) {
            return new Response('Customer not found', { status: 404 });
        }
        return new Response(JSON.stringify(updatedCustomer), { status: 200 });
    } catch (error) {
        console.error('Error updating customer:', error);
        return new Response('Failed to update customer', { status: 500 });
    }
}

// Delete a customer by ID
export async function DELETE(request, { params }) {
    try {
        await dbConnect(); // Ensure the database is connected
        const { id } = params; // Get the customer ID from the request parameters
        const deletedCustomer = await Customer.findByIdAndDelete(id);
        if (!deletedCustomer) {
            return new Response('Customer not found', { status: 404 });
        }
        return new Response(JSON.stringify(deletedCustomer), { status: 200 });
    } catch (error) {
        console.error('Error deleting customer:', error);
        return new Response('Failed to delete customer', { status: 500 });
    }
}