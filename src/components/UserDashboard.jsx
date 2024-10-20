import React, { useState, useEffect } from 'react';
import { useAuth } from '../store/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/UserDashboard.css';

const UserDashboard = () => {
    const { user } = useAuth();
    const [userPosts, setUserPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const checkUserAndFetchPosts = async () => {
            const storedUser = localStorage.getItem('user');
            
            if (!user && !storedUser) {
                navigate('/login');
                return;
            }

            if (!user && storedUser) {
                await new Promise(resolve => setTimeout(resolve, 100));
            }

            const allPosts = JSON.parse(localStorage.getItem('posts')) || [];
            const currentUser = user || JSON.parse(storedUser);
            const filteredPosts = allPosts.filter(post => post.author.uId === currentUser.id);
            setUserPosts(filteredPosts);
            setLoading(false);
        };

        checkUserAndFetchPosts();
    }, [user, navigate]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <div>User not found. Please log in.</div>;
    }

    return (
        <div className="user-dashboard">
            <h1>Welcome to your dashboard, {user.username}!</h1>
            <div className="user-info">
                <h2>Your Information</h2>
                <p>Name: {user.username}</p>
                <p>Email: {user.email}</p>
                
                {user.img && <img src={user.img} alt='User' />}
            </div>
            <div className="user-posts">
                <h2>Your Posts</h2>
                {userPosts.length > 0 ? (
                    userPosts.map((post, index) => (
                        <div key={index} className="blog-post">
                            <h2 className="blog-title">{post.title}</h2>
                            {post.images && post.images.length > 0 && (
                                <img 
                                    id={`featured-image-${post.id}`} 
                                    src={post.images[0]} 
                                    alt="Blog visual" 
                                    className="blog-image" 
                                />
                            )}
                            <div className="post-images">
                                {post.images && post.images.map((image, index) => (
                                    <img
                                        key={index}
                                        src={image}
                                        alt={`Post ${index + 1}`}
                                        onClick={() => {
                                            document.getElementById(`featured-image-${post.id}`).src = image;
                                        }}
                                    />
                                ))}
                            </div>
                            <div className="blog-meta">
                                <span className="blog-username">By: {post.author.Uname || "Anonymous"}</span>
                                <span className="blog-date">Published on: {new Date(post.date).toLocaleDateString()}</span>
                            </div>
                            <div className="blog-content">{post.content}</div>
                            <div className="blog-tags">
                                {post.tags && post.tags.length > 0 ? (
                                    post.tags.map((tag, index) => (
                                        <span key={index} className="blog-tag">{tag}</span>
                                    ))
                                ) : (
                                    <span>No tags available</span>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <p>You haven't created any posts yet.</p>
                )}
            </div>
        </div>
    );
};

export default UserDashboard;