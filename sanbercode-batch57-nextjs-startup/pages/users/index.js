import Layout from "@/layout ";
import React, { useEffect, useState } from 'react';
import Link from "next/link";

export default function Users (){
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('/api/hello');
          const data = await response.json();
          setUsers(data.users);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching data:', error);
          setLoading(false);
        }
      };
      fetchData();
    }, []);
  
    if (loading) {
      return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }
    return (
        <Layout metaTitle="users">
            <h1>Users</h1>
            <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Users List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {users.map((user) => (
          <Link href={`/users/${user.id}`} key={user.id}>
            <div className="bg-white shadow-md rounded-lg p-4 cursor-pointer">
              <img src={user.image} alt={`${user.firstName} ${user.lastName}`} className="w-16 h-16 rounded-full mx-auto" />
              <h2 className="text-xl font-semibold text-center">{user.firstName} {user.lastName}</h2>
              <p className="text-gray-600 text-center">Age: {user.age}</p>
              <p className="text-gray-600 text-center">Email: {user.email}</p>
              <p className="text-gray-600 text-center">Phone: {user.phone}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
        </Layout>
    )
}