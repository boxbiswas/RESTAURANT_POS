import React from 'react';
import { useMutation } from '@tanstack/react-query';
import { enqueueSnackbar } from 'notistack';
import { register } from '../../https/index';

const Register = ({ setIsRegister }) => {

    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        role: ''
    });

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        registerMutation.mutate({
            ...formData,
            email: formData.email.trim().toLowerCase(),
        });
    }

    const handleRoleSelection = (selectedRole) => {
        setFormData({
            ...formData,
            role: selectedRole
        });
    }

    const roleOptions = [
        { label: 'Admin', value: 'admin' },
        { label: 'Staff', value: 'staff' },
    ];

    const registerMutation = useMutation({
            mutationFn: (reqData) => register(reqData),

            onSuccess: ( res ) => {
                const { data } =res;
                enqueueSnackbar(data.message, { variant: 'success' });
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    password: '',
                    role: ''
                });

                setTimeout(() => {
                    setIsRegister(false);
                }, 2000);
            },
            onError: (error) => {
                const message =
                    error?.response?.data?.message ||
                    error?.response?.data?.error ||
                    error?.message ||
                    'Registration failed';

                enqueueSnackbar(message, { variant: 'error' });
            }
        });


    return (
        <div>
            <form onSubmit={handleSubmit} className='space-y-2.5'>
                <div>
                    <label className='mb-1 block text-sm font-medium text-[#d2d2d2]'>
                        Employee Name
                    </label>
                    <div className='flex items-center rounded-lg border border-white/5 bg-[#1f1f1f] px-4 py-2.5'>
                        <input 
                            type="text" 
                            name="name" 
                            value={formData.name}
                            onChange={handleChange}
                            placeholder='Enter employee name' 
                            className='w-full bg-transparent text-white placeholder:text-[#666] focus:outline-none' 
                            required 
                        />
                    </div>
                </div>

                <div>
                    <label className='mb-1 block text-sm font-medium text-[#d2d2d2]'>
                        Employee Email
                    </label>
                    <div className='flex items-center rounded-lg border border-white/5 bg-[#1f1f1f] px-4 py-2.5'>
                        <input 
                            type="email" 
                            name="email" 
                            value={formData.email}
                            onChange={handleChange}
                            placeholder='Enter employee email' 
                            className='w-full bg-transparent text-white placeholder:text-[#666] focus:outline-none' 
                            required 
                        />
                    </div>
                </div>

                <div>
                    <label className='mb-1 block text-sm font-medium text-[#d2d2d2]'>
                        Employee Phone
                    </label>
                    <div className='flex items-center rounded-lg border border-white/5 bg-[#1f1f1f] px-4 py-2.5'>
                        <input 
                            type="tel" 
                            name="phone" 
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder='Enter employee phone' 
                            className='w-full bg-transparent text-white placeholder:text-[#666] focus:outline-none' 
                            required 
                        />
                    </div>
                </div>

                <div>
                    <label className='mb-1 block text-sm font-medium text-[#d2d2d2]'>
                        Password
                    </label>
                    <div className='flex items-center rounded-lg border border-white/5 bg-[#1f1f1f] px-4 py-2.5'>
                        <input 
                            type="password" 
                            name="password" 
                            value={formData.password}
                            onChange={handleChange}
                            placeholder='Enter password' 
                            className='w-full bg-transparent text-white placeholder:text-[#666] focus:outline-none' 
                            required 
                        />
                    </div>
                </div>

                <div>
                    <label className='mb-1 block text-sm font-medium text-[#d2d2d2]'>
                        Choose your role
                    </label>
                    <div className='mt-2.5 flex items-center gap-3'>
                        {roleOptions.map((role) => {
                            return (
                                <button 
                                    key={role.value} 
                                    className={`w-full rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${role.value === formData.role ? 'bg-[#dec924] text-gray-900' : 'bg-[#1f1f1f] text-[#d2d2d2] hover:bg-[#252525]'}`}
                                    type="button"
                                    onClick={() => handleRoleSelection(role.value)}
                                >
                                    {role.label}
                                </button>
                            )
                        })}
                    </div>
                </div>

                <button 
                    type="submit" 
                    className='mt-3 w-full rounded-lg bg-yellow-400 py-2.5 text-base font-bold text-gray-900 transition-colors hover:bg-yellow-300'
                >
                    Sign Up
                </button>
            </form>
        </div>
    )
}

export default Register;