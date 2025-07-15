import {useState} from "react";

function Post({ data ,onLike, onComment, onDelete,  }) {
    const { username, text, timestamp, likes, comments, picture, image } = data;
    const [commentText, setCommentText] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();
        if (commentText.trim() !== '') {
            onComment(commentText.trim());
            setCommentText('');

        }
    };

    return (
        <div
            style={{
                border: '1px solid #ddd',
                borderRadius: '10px',
                padding: '1rem',
                marginBottom: '1rem',
                background: '#fff'
            }}
        >
            {/* Header: profile image + username + timestamp */}
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                <img
                    src={picture || 'https://via.placeholder.com/40'}
                    alt="profile"
                    style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        marginRight: '10px'
                    }}
                />
                <strong>@{username}</strong>
                <span
                    style={{
                        color: '#888',
                        marginLeft: 'auto',
                        fontSize: '0.9rem'
                    }}
                >
        {timestamp}
      </span>
            </div>

            {/* Image content */}
            {image && (
                <img
                    src={image}
                    alt="post"
                    style={{
                        width: '100%',
                        maxWidth: '100%',
                        borderRadius: '10px',
                        marginBottom: '0.5rem'
                    }}
                />
            )}

            {/* Text content */}
            <p style={{ margin: 0 }}>{text}</p>

            {/* Buttons */}
            <div style={{ marginTop: '0.5rem' }}>
                <button onClick={onLike}>❤️ {likes}</button>
                <button
                    onClick={onDelete}
                    style={{ marginLeft: '1rem', color: 'red' }}
                >
                    🗑 Delete
                </button>
            </div>

            {/* Comment form */}
            <form onSubmit={handleSubmit} style={{ marginTop: '0.5rem' }}>
                <input
                    type="text"
                    value={commentText}
                    placeholder="Add a comment..."
                    onChange={(e) => setCommentText(e.target.value)}
                    style={{ width: '80%', padding: '5px' }}
                />
                <button type="submit" style={{ marginLeft: '0.5rem' }}>
                    Post
                </button>
            </form>

            {/* Comments list */}
            {comments.length > 0 && (
                <div style={{ marginTop: '1rem' }}>
                    <strong>Comments:</strong>
                    <ul style={{ paddingLeft: '1rem' }}>
                        {comments.map((c, i) => (
                            <li key={i}>{c}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );

}

export default Post;