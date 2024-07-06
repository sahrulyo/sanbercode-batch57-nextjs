import { useMutation } from "@/hooks/useMutation ";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import Layout from "@/layout ";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();
  const toast = useToast();
  const { mutate } = useMutation();
  const [payload, setPayload] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await mutate({
      url: 'https://service.pace-unv.cloud/api/login',
      payload,
    });
    if (!response?.success) {
      toast({
        title: 'Gagal.',
        description: "Email dan password tidak cocok.",
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: "top"
      });
    } else {
      Cookies.set("token", response?.data?.token, {expires: new Date(response?.data?.expires_at), 
      path:"/" });
      router.push("/");
      toast({
        title: 'Sukses.',
        description: "Login berhasil.",
        status: 'success',
        duration: 9000,
        isClosable: true,
        position: "top"
      });
    }
  };

  return (
    <Layout>
      <div>
        <h1>i am loginers</h1>
        <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
            <input 
              value={payload.email} 
              onChange={(event) => setPayload({ ...payload, email: event.target.value })} 
              type="email" 
              id="email" 
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
              placeholder="name@flowbite.com" 
              required 
            />
          </div>
          <div className="mb-5">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
            <input 
              value={payload.password} 
              onChange={(event) => setPayload({ ...payload, password: event.target.value })} 
              type="password" 
              id="password" 
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
              required 
            />
          </div>
          <button 
            type="submit" 
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
}

export default Login;
