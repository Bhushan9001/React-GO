import React, { useState } from 'react';
import boy from '../assets/boy.png';
import Avatar from './Avatar';
import { useRecoilValue } from 'recoil';
import { userAtom } from '../atoms/userAtom';
import axios from 'axios';
import { Bounce, ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const ReplyComp = ({commentId,fetchComments,setReply}) => {
    const [isFocused, setIsFocused] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const user = useRecoilValue(userAtom);
    const token = localStorage.getItem('token');

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleCancel = () => {
        setIsFocused(false);
        setInputValue('');
    };

    const handleChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = async () => {
        try {
            await toast.promise(
                axios.post(
                    ` /comments/reply/${commentId}`,
                    { text: inputValue },
                    {
                        headers: {
                            'Authorization': token,
                        },
                    }
                ),
                {
                    pending: "Adding Reply",
                    success: "Reply added successfully 👌",
                    error: "Error while adding reply 😶",
                },
                {
                    theme: "dark",
                    autoClose: 2000,
                }
            );
            setIsFocused(false);
            setInputValue('');
            setReply(false);
            fetchComments();
        } catch (error) {
            console.error("Error submitting reply:", error);
        }
    };

    return (
        <div className='pt-3 flex flex-col space-y-3 w-full'>
            <div className='flex space-x-3 items-center'>
                {user ? (
                    <Avatar name={user} />
                ) : (
                    <img className="w-10 h-10" src={boy} alt="User avatar" />
                )}
                <input
                    type="text"
                    placeholder='Add a reply...'
                    className='w-[85%] md:w-[70%] outline-none border-b-2 border-gray-300 focus:border-gray-500 text-base text-gray-800 font-normal font-poppins transition-all'
                    onFocus={handleFocus}
                    onChange={handleChange}
                    value={inputValue}
                />
            </div>
            {isFocused && (
                <div className='flex space-x-3 justify-end w-[85%] md:w-[70%]'>
                    <button
                        className='bg-gray-200 hover:bg-gray-300 transition rounded-full text-sm px-4 py-1 font-medium text-gray-600 font-poppins'
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>
                    <button
                        className='bg-green-400 hover:bg-green-500 transition text-white rounded-full text-sm px-4 py-1 font-medium font-poppins'
                        onClick={handleSubmit}
                    >
                        Reply
                    </button>
                </div>
            )}
        </div>
    );
};


export default ReplyComp;
