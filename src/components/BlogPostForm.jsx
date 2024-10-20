import React, { useState, useEffect } from 'react';
import { useAuth } from '../store/AuthContext';
import '../styles/BlogPostForm.css';
import { useNavigate } from 'react-router-dom';

function BlogPostForm({ onSubmit }) {
    const { user } = useAuth();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState('');
    const [images, setImages] = useState([]);
    const [country, setCountry] = useState('');
    const [destinations, setDestinations] = useState('');
    const navigate = useNavigate();

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        Promise.all(files.map(file => getBase64(file)))
            .then(base64Images => {
                setImages(base64Images);
            });
    };

    const getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    };

    const stripHtmlTags = (html) => {
        const tmp = document.createElement("DIV");
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || "";
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const strippedContent = stripHtmlTags(content);
        const newPost = {
            id: Date.now().toString(),
            title,
            content: strippedContent,
            date: new Date().toISOString(),
            author: {
                uId: user?.id || Date.now().toString(),
                Uname: user?.name || "Anonymous"
            },
            tags: tags.split(',').map(tag => tag.trim()),
            comments: [],
            images: images,
            Country: country,
            Destination: destinations.split(',').map(dest => dest.trim())
        };

        const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
        const updatedPosts = [newPost, ...storedPosts];
        localStorage.setItem('posts', JSON.stringify(updatedPosts));

        setTitle('');
        setContent('');
        setTags('');
        setImages([]);
        setCountry('');
        setDestinations('');

        onSubmit && onSubmit(newPost);
        navigate('/');
        window.scrollTo(0, 0);  // Add this line to scroll to top
    };

    // Scroll to top when component mounts
    useEffect(() => {
       
        // navigate('/');
         window.scrollTo(0, 0);
    }, []);

    return (
        <div className="blog-post-form">
            <h2>Create a New Blog Post</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="content">Content:</label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="tags">Tags (comma-separated):</label>
                    <input
                        type="text"
                        id="tags"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="country">Country:</label>
                    <input
                        type="text"
                        id="country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="destinations">Destinations (comma-separated):</label>
                    <input
                        type="text"
                        id="destinations"
                        value={destinations}
                        onChange={(e) => setDestinations(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="images">Upload Images:</label>
                    <input
                        type="file"
                        id="images"
                        onChange={handleImageChange}
                        accept="image/*"
                        multiple
                    />
                </div>
                {images.length > 0 && (
                    <div className="image-preview">
                        {images.map((image, index) => (
                            <img key={index} src={image} alt={`Preview ${index + 1}`} />
                        ))}
                    </div>
                )}
                <button type="submit">Submit Post</button>
            </form>
        </div>
    );
}

export default BlogPostForm;