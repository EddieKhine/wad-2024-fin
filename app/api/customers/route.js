// app/api/customers/route.js
import Customer from "@/models/Customers"; // Adjust the path as necessary
import dbConnect from "@/lib/db"; // Utility for connecting to the database

// Fetch all customers
export async function GET() {
    await dbConnect(); // Ensure the database is connected
    const customers = await Customer.find();
    return new Response(JSON.stringify(customers), { status: 200 });
}

// Create a new customer
export async function POST(request) {
    try {
        await dbConnect(); // Ensure the database is connected
        const customerData = await request.json(); // Parse the request body

        // Optional: Validate customer data before creating
        if (!customerData.name || !customerData.email) {
            return new Response('Name and email are required', { status: 400 });
        }

        const newCustomer = new Customer(customerData); // Create a new customer instance
        await newCustomer.save(); // Save the new customer to the database
        return new Response(JSON.stringify(newCustomer), { status: 201 });
    } catch (error) {
        console.error('Error saving customer:', error);
        return new Response('Failed to save customer: ' + error.message, { status: 500 });
    }
}
