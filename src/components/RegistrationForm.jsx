import React, { useEffect, useReducer, useState} from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import authService from '../api/authService';
import userService from '../api/userService';
import rolesService from '../api/rolesService';
import { useNavigate } from "react-router-dom";

const RegistrationForm = ({ onRegister }) => {

    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const [allUsers, setAllUsers] = useState();
    const [allRoles, setAllRoles] = useState();

    const getAllRoles = async () => {
        const roles = await rolesService.getRoles();
        setAllRoles(roles);
    }


    const onSubmit = data => {
        // Handle registration logic here
        authService.registerUser(data).then((res) => {
            userService.login(data.email, data.password);
            navigate("/dashboard")
            return res;
        }).catch((err) => {
            console.log(err)
        }) 
        console.log(data);
        if (onRegister) {
            onRegister(data);
        }
    };

    useEffect(() => {
        getAllRoles();
    }, [])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600">
            <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-xl">
                <h1 className="text-3xl font-bold text-center text-indigo-600">Registra tu cuenta</h1>
                <p className="mt-2 text-sm text-center text-gray-600">
                    Ingresa tus información para ser parte de nuestra comunidad.
                </p>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="mt-6 space-y-4"
                >
                     {/* Username Field */}
                     <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Nombre</label>
                        <input
                            {...register('name', { required: 'Name is required' })}
                            className={`w-full px-3 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'
                                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                        )}
                    </div>

                    {/* Username Field */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Username</label>
                        <input
                            {...register('username', { required: 'Username is required' })}
                            className={`w-full px-3 py-2 border ${errors.username ? 'border-red-500' : 'border-gray-300'
                                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        />
                        {errors.username && (
                            <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
                        )}
                    </div>

                    {/* Email Field */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
                        <input
                            type="email"
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: 'Invalid email address',
                                },
                            })}
                            className={`w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'
                                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                        )}
                    </div>

                    {/* Password Field */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Contraseña</label>
                        <input
                            type="password"
                            {...register('password', {
                                required: 'Password is required',
                                minLength: {
                                    value: 6,
                                    message: 'Password must be at least 6 characters long',
                                },
                            })}
                            className={`w-full px-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'
                                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                        )}
                    </div>

                    {/* Role Field */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Rol</label>
                        <select
                            {...register('r_id', { required: 'Role is required' })}
                            className={`w-full px-3 py-2 border ${errors.r_id ? 'border-red-500' : 'border-gray-300'
                                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        >
                            { allRoles?.map((role) => {
                                return <option value={role.r_id}>{role.role_name}</option>
                            })}

                        </select>
                        {errors.r_id && (
                            <p className="text-red-500 text-sm mt-1">{errors.r_id.message}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-300"
                    >
                        Crear Cuenta
                    </button>
                </form>
                <div>
                    <hr className="my-4 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:via-neutral-400" />
                    <p className="my-4 block text-sm font-medium text-gray-600">
                        ¿Ya tienes cuenta?
                    </p>
                    <Link to="/"
                        className="block w-full text-center py-2 border-2 border-indigo-600 text-gray-600 bg-white rounded-lg hover:bg-indigo-600 focus:ring-2 hover:text-white focus:ring-indigo-500 focus:outline-none">
                        Inicia Sesión aquí
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default RegistrationForm;
