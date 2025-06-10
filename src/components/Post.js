function Post({ data }) {
  const { username, text, timestamp } = data;

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
      <div style={{ marginBottom: '0.5rem' }}>
        <strong>@{username}</strong>
        <span style={{ color: '#888', marginLeft: '10px', fontSize: '0.9rem' }}>
          {timestamp}
        </span>
      </div>
      <p style={{ margin: 0 }}>{text}</p>
    </div>
  );
}

export default Post;