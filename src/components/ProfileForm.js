import { useState } from 'react';


function ProfileForm({ initialProfile, onSave }) {
    const [formData, setFormData] = useState(initialProfile);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handlePicture = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, picture: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData); // send edited profile up
    };

    return (
        <form onSubmit={handleSubmit} style={{ textAlign: 'center' }}>
            <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
                style={{ marginBottom: '0.5rem' }}
            />
            <br />
            <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows="3"
                placeholder="Your bio"
                style={{ width: '100%', marginBottom: '0.5rem' }}
            />
            <br />
            <input type="file" accept="image/*" onChange={handlePicture} />
            <br />
            <button type="submit" style={{ marginTop: '1rem' }}>
                Save Profile
            </button>
        </form>
    );
}



export default ProfileForm;