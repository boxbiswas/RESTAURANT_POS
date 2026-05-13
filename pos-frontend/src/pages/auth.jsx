import React from 'react';
import restraunt from '../assets/images/restraunt.jpg';
import logo from '../assets/images/logo.png';
import { useSelector } from 'react-redux';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';
import { useState } from 'react';

const Auth = () => {

    const [isRegister, setIsRegister] = useState(false);

    const settings = useSelector((state) => state.settings || {});

    return (
        <div className='relative h-screen w-full overflow-hidden'>
            <img className='absolute inset-0 h-full w-full object-cover' src={restraunt} alt='Restaurant background' />

            <div className='absolute inset-0 bg-black/40' />

            <div className='relative z-10 flex h-full w-full items-stretch p-4 sm:p-6 lg:p-8'>
                <div className='hidden flex-1 lg:flex lg:items-stretch'>
                    <div className='relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-4xl border border-white/10 bg-black/10 px-8 py-8 text-center backdrop-blur-[2px]'>
                        <div className='absolute inset-x-0 top-0 h-40 bg-linear-to-b from-yellow-400/10 to-transparent' />
                        <div className='absolute -left-24 top-24 h-56 w-56 rounded-full bg-yellow-400/10 blur-3xl' />
                        <div className='absolute bottom-24 right-16 h-40 w-40 rounded-full bg-white/10 blur-3xl' />

                        <div className='relative flex max-w-2xl flex-col items-center text-center'>
                            <div className='inline-flex items-center rounded-full border border-yellow-300/20 bg-black/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-yellow-300 backdrop-blur-sm'>
                                Restaurant POS
                            </div>
                            <h1 className='mx-auto mt-6 max-w-lg text-5xl font-bold leading-[1.05] text-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.35)]'>
                                Welcome back to your workspace
                            </h1>
                            <p className='mx-auto mt-5 max-w-md text-base leading-7 text-white/80'>
                                Manage orders, staff, and payments from one clean dashboard with a clear view of the dining room.
                            </p>
                        </div>

                        <blockquote className='relative mx-auto mt-8 max-w-xl rounded-3xl border border-white/10 bg-black/25 px-6 py-5 text-center text-base italic text-white/90 shadow-lg shadow-black/20 backdrop-blur-md'>
                            <span className='absolute left-4 top-3 text-3xl leading-none text-yellow-300/70'>“</span>
                            <span className='relative z-10 block px-3'>Food is not just fuel, it's information. It talks to your DNA and tells it what to do.</span>
                            <span className='absolute right-4 bottom-3 text-3xl leading-none text-yellow-300/70'>”</span>
                            <span className='mt-3 block text-sm not-italic text-yellow-300'>
                                - Dr. Mark Hyman
                            </span>
                        </blockquote>
                    </div>
                </div>

                <div className='ml-auto flex h-full w-full max-w-135 items-stretch justify-center lg:pl-8'>
                    <div className='flex h-full max-h-[calc(100vh-2rem)] w-full flex-col justify-start gap-2 overflow-hidden rounded-4xl border border-white/15 bg-white/10 p-3 shadow-2xl shadow-black/30 backdrop-blur-2xl sm:p-4 lg:p-5'>
                        <div className='flex flex-col items-center gap-1.5'>
                            <img src={settings.logo || logo} alt='Logo' className='h-10 w-10 rounded-full border-2 border-white/10 p-1 object-cover' />
                            <h1 className='text-xs font-semibold uppercase tracking-[0.3em] text-[#f5f5f5]'>{settings.restaurantName || 'Restro'}</h1>
                        </div>

                        <div className='text-center'>
                            <h2 className='text-[1.6rem] font-semibold leading-tight text-yellow-400 sm:text-[1.75rem] lg:text-[1.9rem]'>
                                {isRegister ? 'Create your account' : 'Employee sign in'}
                            </h2>
                            <p className='mt-1 text-[11px] leading-4 text-[#d6d6d6] sm:text-xs'>
                                {isRegister
                                    ? 'Set up a staff account to start managing the restaurant.'
                                    : 'Use your employee email and password to continue.'}
                            </p>
                        </div>

                        <div className='min-h-0'>
                            {isRegister ? <Register setIsRegister={setIsRegister} /> : <Login />}
                        </div>

                        <div className='flex justify-center pb-0.5'>
                            <p className='text-center text-[11px] text-[#d6d6d6] sm:text-xs'>
                                {isRegister ? 'Already have an account?' : "Don't have an account?"}
                                <button
                                    type='button'
                                    onClick={() => setIsRegister(!isRegister)}
                                    className='ml-1 font-semibold text-yellow-400 hover:underline'
                                >
                                    {isRegister ? 'Sign In' : 'Sign Up'}
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
</div>
    )
}

export default Auth;