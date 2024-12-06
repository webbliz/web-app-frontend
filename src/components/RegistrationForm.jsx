import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';

const RegistrationForm = ({ onRegister }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = data => {
        // Handle registration logic here
        console.log(data);
        if (onRegister) {
            onRegister(data);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600">
            <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-xl">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="mt-6 space-y-4"
                >
                    <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Registro</h2>

                    {/* Username Field */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium">Username</label>
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
                        <label className="block text-gray-700 font-medium">Email</label>
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
                        <label className="block text-gray-600 font-medium">Contraseña</label>
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
                        <label className="block text-gray-700 font-medium">Rol</label>
                        <select
                            {...register('role', { required: 'Role is required' })}
                            className={`w-full px-3 py-2 border ${errors.role ? 'border-red-500' : 'border-gray-300'
                                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        >
                            <option value="">Selecciona un rol</option>
                            <option value="Admin">Admin</option>
                            <option value="General">General</option>
                        </select>
                        {errors.role && (
                            <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-300"
                    >
                        Someter
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
