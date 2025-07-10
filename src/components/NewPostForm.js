import { useState } from 'react';

function NewPostForm({ onPost }) {
  const [text, setText] = useState('');
  const [picture, setPicture] = useState('');

  const [image, setImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            setImage(reader.result);
        };
        reader.readAsDataURL(file);
    }
};

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() === '') return;

    onPost(text, image);
    setText('');
    setImage(null);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows="3"
        maxLength="280"
        placeholder="What's happening?"
        style={{ width: '100%', padding: '10px' }}
      />
        <input type="file" accept="image/*" onChange={handleImageUpload} />


        <div style={{ textAlign: 'right' }}>
        <small>{text.length}/280</small>
      </div>
      <button
        type="submit"
        style={{
          marginTop: '10px',
          padding: '8px 16px',
          backgroundColor: '#1DA1F2',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Tweet
      </button>
    </form>
  );
}

export default NewPostForm;