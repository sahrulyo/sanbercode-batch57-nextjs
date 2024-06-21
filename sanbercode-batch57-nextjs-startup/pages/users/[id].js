import Layout from "@/layout ";
import { useRouter } from "next/router";
import { useEffect, useState } from 'react';

export default function UserIdByName (){
    const router = useRouter();
    const {id} = router?.query;
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
          const fetchUser = async () => {
            try {
              const response = await fetch(`https://dummyjson.com/users/${id}`);
              const data = await response.json();
              setUser(data);
              setLoading(false);
            } catch (error) {
              console.error('Error fetching user data:', error);
              setLoading(false);
            }
          };
          fetchUser();
        }
      }, [id]);
    
      if (loading) {
        return (
          <Layout metaTitle="User Detail" metaDescription="This is the user detail page">
            <div className="flex justify-center items-center h-screen">Loading...</div>
          </Layout>
        );
      }
    
      if (!user) {
        return (
          <Layout metaTitle="User Detail" metaDescription="This is the user detail page">
            <div className="flex justify-center items-center h-screen">User not found</div>
          </Layout>
        );
      }
    return (
        <Layout metaTitle="User Detail" metaDescription="This is the user detail page">
        <div className="container mx-auto p-4">
          <div className="bg-white shadow-md rounded-lg p-6">
            <img src={user.image} alt={`${user.firstName} ${user.lastName}`} className="w-32 h-32 rounded-full mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-center">{user.firstName} {user.lastName}</h2>
            <p className="text-gray-600 text-center">Age: {user.age}</p>
            <p className="text-gray-600 text-center">Email: {user.email}</p>
            <p className="text-gray-600 text-center">Phone: {user.phone}</p>
            <p className="text-gray-600 text-center">Username: {user.username}</p>
            <p className="text-gray-600 text-center">Gender: {user.gender}</p>
            <p className="text-gray-600 text-center">Blood Group: {user.bloodGroup}</p>
            <p className="text-gray-600 text-center">Height: {user.height} cm</p>
            <p className="text-gray-600 text-center">Weight: {user.weight} kg</p>
            <p className="text-gray-600 text-center">Eye Color: {user.eyeColor}</p>
            <p className="text-gray-600 text-center">Hair Color: {user.hair.color}</p>
            <p className="text-gray-600 text-center">Hair Type: {user.hair.type}</p>
            <p className="text-gray-600 text-center">IP Address: {user.ip}</p>
            <p className="text-gray-600 text-center">Address: {user.address.address}</p>
          </div>
        </div>
      </Layout>
    )
}