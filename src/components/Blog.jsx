import React, { useState, useEffect } from 'react';
import { useAuth } from '../store/AuthContext';
import DOMPurify from 'dompurify';
import '../styles/Blog.css';

const Blog = () => {
    const [posts, setPosts] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
        setPosts(storedPosts);
    }, []);

    const createMarkup = (html) => {
        return { __html: DOMPurify.sanitize(html) };
    };

    return (
        <div className="blog-container">
            <h1>Welcome, {user ? user.name : "Guest"}!</h1>
            {posts.length > 0 ? (
                posts.map((post, index) => (
                    <div key={index} className="blog-post">
                        <h2 className="blog-title">{post.title}</h2>
                        {post.images.length > 0 && <img id={`featured-image-${post.id}`} src={post.images[0]} alt="Blog visual" className="blog-image" />}
                        <div className="post-images">
							{post.images.map((image, index) => (
							<img
								key={index}
								src={image}
								alt={`Post ${index + 1}`}
								style={{width:'100px', height:'100px', objectFit:'cover'}}
								onClick={() => {
								document.getElementById(`featured-image-${post.id}`).src = image;
								}}
							/>
							))}
      					</div>
                        <div className="blog-meta">
                            <h1 className="blog-username">By: {post.author.Uname || "Anonymous"}</h1>
                            <h1 className="blog-date">Published on: {post.date}</h1>
                        </div>
                        <div className="blog-content" dangerouslySetInnerHTML={createMarkup(post.content)} />
                        <div className="blog-tags">
                            {post.tags && post.tags.length > 0 ? (
                                post.tags.map((tag, index) => (
                                    <span key={index} className="blog-tag">{tag}</span>
                                ))
                            ) : (
                                <h4>No tags available</h4>
                            )}
                        </div>
                    </div>
                ))
            ) : (
                <h4>No blog posts available.</h4>
            )}
        </div>
    );
};

export default Blog;