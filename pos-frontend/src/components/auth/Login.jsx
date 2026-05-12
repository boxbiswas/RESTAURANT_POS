import React from 'react';
import { useMutation } from '@tanstack/react-query';
import { login } from '../../https/index';
import { enqueueSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const [formData, setFormData] = React.useState({
            email: '',
            password: '',
        });
    
        const handleChange = (event) => {
            setFormData({
                ...formData,
                [event.target.name]: event.target.value
            });
        }
    
        const handleSubmit = (event) => {
            event.preventDefault();
            loginMutation.mutate(formData);
        }
    
        const loginMutation = useMutation({
            mutationFn: (reqData) => login(reqData),

            onSuccess: ( res ) => {
                const { data } = res;
                console.log('LOGIN SUCCESS:', data);
                const { _id, name, email, phone, role } = data.data;
                // Dispatch the setUser action to update the user state
                dispatch(setUser({ _id, name, email, phone, role }));
                enqueueSnackbar('Login successful!', { variant: 'success' });
                navigate("/");
            },
            onError: (error) => {
                console.error('LOGIN ERROR:', error);
                console.error('ERROR RESPONSE:', error?.response);
                console.error('ERROR RESPONSE DATA:', error?.response?.data);

                const message =
                    error?.response?.data?.message ||
                    error?.response?.data?.error ||
                    error?.message ||
                    'Invalid email or password';

                console.log('SHOWING ERROR MESSAGE:', message);
                enqueueSnackbar(message, { variant: 'error' });
            }
        });

    return (
        <div>
            <form className='space-y-2.5' onSubmit={handleSubmit}>
                
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
                        required />
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
                        required />
                    </div>
                </div>

                <button type="submit" className='mt-3 w-full rounded-lg bg-yellow-400 py-2.5 text-base font-bold text-gray-900 transition-colors hover:bg-yellow-300'>
                    Sign In
                </button>
            </form>
        </div>
    )
}

export default Login;