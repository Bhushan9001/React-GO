import React, { useEffect, useState } from 'react';
import ReplyComp from './ReplyComp';
import Avatar from './Avatar';
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from "react-icons/md";
import { GoHeart, GoHeartFill } from "react-icons/go";
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { userAtom } from '../atoms/userAtom';
import { Bounce, ToastContainer, toast } from "react-toastify";

const CommentComp = ({ recipeId }) => {
    const [comments, setComments] = useState([]);
    const [isFocused, setIsFocused] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const token = localStorage.getItem("token");
    const user = useRecoilValue(userAtom);

    const toggleReplies = (commentId) => {
        setComments((prevComments) =>
            prevComments.map((comment) =>
                comment.id === commentId ? { ...comment, showReplies: !comment.showReplies } : comment
            )
        );
    };

    const handleReplyToggle = (commentId) => {
        setComments((prevComments) =>
            prevComments.map((comment) =>
                comment.id === commentId ? { ...comment, reply: !comment.reply } : comment
            )
        );
    };

    const handleFocus = () => setIsFocused(true);
    const handleCancel = () => {
        setIsFocused(false);
        setInputValue("");
    };
    const handleChange = (e) => setInputValue(e.target.value);

    const calculateTimeSinceCreated = (createdDate) => {
        const created = new Date(createdDate);
        const now = new Date();
        const diffInMs = now - created;
    
        const minutes = Math.floor(diffInMs / (1000 * 60));
        const hours = Math.floor(diffInMs / (1000 * 60 * 60));
        const days = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
        const weeks = Math.floor(days / 7);
        const months = Math.floor(days / 30);
        const years = Math.floor(days / 365);
    
        if (minutes < 1) return "Just now";
        if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        if (days < 7) return `${days} day${days > 1 ? 's' : ''} ago`;
        if (weeks < 4) return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
        if (months < 12) return `${months} month${months > 1 ? 's' : ''} ago`;
        return `${years} year${years > 1 ? 's' : ''} ago`;
    };
    

    const fetchComments = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND}/comments/${recipeId}`);
            const fetchedComments = response.data.comments.map((comment) => ({
                ...comment,
                liked: false,
                reply: false,
                showReplies: false,
            }));
            setComments(fetchedComments);
        } catch (error) {
            console.error("Error fetching comments:", error);
        }
    };

    useEffect(() => {
        fetchComments();
    }, [recipeId]);

    const handleLike = async (commentId) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND}/comments/like-dislike/${commentId}`,
                {},
                { headers: { 'Authorization': token } }
            );

            if (response.status === 200) {
                const liked = response.data.liked;
                
                setComments((prevComments) =>
                    prevComments.map((comment) =>
                        comment.id === commentId
                            ? {
                                ...comment,
                                liked: liked,
                                likes_count: liked
                                    ? comment.likes_count + 1
                                    : comment.likes_count - 1,
                            }
                            : comment
                    )
                );
            } else {
                console.error("Failed to toggle like on the server");
            }
        } catch (error) {
            console.error("Error toggling like:", error);
        }
    };

    const handleSubmit = async () => {
        try {
            await axios.post(
                `${import.meta.env.VITE_BACKEND}/comments/${recipeId}`,
                { text: inputValue },
                { headers: { Authorization: token } }
            );
            setIsFocused(false);
            setInputValue("");
            fetchComments();
        } catch (error) {
            console.error("Error adding comment:", error);
        }
    };

    return (
        <div className="px-4 md:px-8 lg:px-20 my-6">
            <h3 className="text-2xl md:text-3xl font-semibold text-green-700">
                {comments?.length || 0} Comments
            </h3>
            <div className="flex flex-col md:flex-row items-start my-4 space-x-0 md:space-x-4 space-y-3 md:space-y-0">
                {user ? (
                    <Avatar name={user} />
                ) : (
                    <img className="w-10 h-10 rounded-full" src="path/to/default/avatar.jpg" alt="Avatar" />
                )}
                <input
                    placeholder="Add a comment..."
                    className="flex-grow p-2 border-b-2 outline-none focus:border-green-600 text-lg transition-all"
                    onFocus={handleFocus}
                    onChange={handleChange}
                    value={inputValue}
                />
            </div>

            {isFocused && (
                <div className="flex justify-end space-x-3 mt-2">
                    <button
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-full hover:bg-gray-400 transition-colors"
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-4 py-2 bg-green-700 text-white rounded-full hover:bg-green-800 transition-colors"
                        onClick={handleSubmit}
                    >
                        Comment
                    </button>
                </div>
            )}

            {comments.map((comment) => (
                <div key={comment.id} className="py-4  flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 w-full md:w-[80%] lg:w-[60%] font-poppins">
                    <Avatar name={comment.author?.name || "Anonymous"} />

                    <div className="w-full">
                        <div className="flex  space-x-4 items-center">
                            <span className="font-semibold text-lg text-gray-800">{comment.author?.name || "Unknown User"}</span>
                            <span className=" text-sm text-gray-400">{calculateTimeSinceCreated(comment.created_at)}</span>
                            
                        </div>

                        <p className="text-gray-800 mb-2">{comment.text || "No comment text available."}</p>

                        <div className="flex items-center space-x-4 text-gray-600 text-sm">
                            <button
                                onClick={() => handleLike(comment.id)}
                                className="flex items-center space-x-1 transition hover:text-red-500"
                            >
                                {comment.liked ? <GoHeartFill size={18} color="red" /> : <GoHeart size={18} />}
                                <span>{comment.likes_count}</span>
                            </button>
                            <button
                                onClick={() => handleReplyToggle(comment.id)}
                                className="text-xs px-2 py-1 bg-gray-200 rounded-full hover:bg-gray-300 transition"
                            >
                                Reply
                            </button>
                        </div>

                        {comment.reply && (
                            <div className="mt-3 ml-8">
                                <ReplyComp commentId={comment.id} fetchComments={fetchComments} setReply={() => handleReplyToggle(comment.id)} />
                            </div>
                        )}

                        {comment.replies?.length > 0 ? (
                            <button
                                onClick={() => toggleReplies(comment.id)}
                                className="mt-4 text-green-600 flex items-center space-x-1 text-sm hover:text-green-700 transition"
                            >
                                {comment.showReplies ? <MdOutlineKeyboardArrowUp size={18} /> : <MdOutlineKeyboardArrowDown size={18} />}
                                <span>{comment.replies.length} {comment.replies.length > 1 ? 'replies' : 'reply'}</span>
                            </button>
                        ) : (
                            <p className="mt-4 text-gray-500 text-sm">No replies yet.</p>
                        )}

                        {comment.showReplies && comment.replies?.length > 0 && (
                            <div className="mt-3 ml-8 space-y-3">
                                {comment.replies.map((reply, index) => (
                                    <div key={index} className="flex space-x-3 items-start">
                                        <Avatar name={reply.author?.name || "Anonymous"} />
                                        <div>
                                            <span className="text-sm font-semibold text-gray-700">
                                                {reply.author?.name || "Unknown User"}
                                            </span>
                                            <p className="text-gray-800 text-sm">{reply.text || "No reply text available."}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};


export default CommentComp;
