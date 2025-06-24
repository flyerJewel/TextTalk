import { useState, useEffect } from 'react';
import ProfileForm from "./components/ProfileForm";

function ProfilePage() {
  const [profile, setProfile] = useState({
      username: 'julian_dev',
      bio: 'I am a developer',
      picture: './logo.svg'
  });
    const [editing, setEditing] = useState(false);

    //lead profile frm localstorage
  useEffect(() => {
      const saved = localStorage.getItem('profile');
      if (saved) {
          setProfile(JSON.parse(saved));
      }
  },[]);
//save 2 localstorage
  useEffect(() => {
      localStorage.setItem('profile', JSON.stringify(profile));
  }, [profile]);

  const handlechange = (e) => {
      const { name, value } = e.target;
      setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handlePicture = (e) => {
      const file = e.target.files[0];
      if(file){
          const reader = new FileReader();
          reader.onloadend = () => {
              setProfile(prev => ({ ...prev, picture: reader.result }));
          };
          reader.readAsDataURL(file);
      }
  };
    const handleSave = (updatedProfile) => {
        setProfile(updatedProfile);
        setEditing(false);
    };


    return (
        <div style={{ maxWidth: '600px', margin: '2rem auto', textAlign: 'center' }}>
            <h2>Your Profile</h2>

            <div style={{ marginBottom: '1rem' }}>
                <img
                    src={profile.picture || 'https://via.placeholder.com/100'}
                    alt="profile"
                    style={{ width: '100px', height: '100px', borderRadius: '50%' }}
                />
            </div>

            {editing ? (
                <ProfileForm initialProfile={profile} onSave={handleSave} />
            ) : (
                <>
                    <h3>@{profile.username}</h3>
                    <p>{profile.bio}</p>
                    <button onClick={() => setEditing(true)}>Edit Profile</button>
                </>
            )}
        </div>
    );
}

export default ProfilePage;