import React, { useState, useEffect } from "react";
import maleAvatar from "/public/male.png";
import femaleAvatar from "/public/female.png";
import "./ProfilePage.css"; // Import the CSS file for the styles

const ProfilePage: React.FC = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [name, setName] = useState("");
  const [idd, setIdd] = useState("");
  const [idd1, setIdd1] = useState("");
  const [currentAvatar, setCurrentAvatar] = useState(maleAvatar);

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("profileData") || "{}");
    setName(savedData.name || "");
    setIdd(savedData.idd || "");
    setIdd1(savedData.idd1 || "");
    setCurrentAvatar(savedData.avatar || maleAvatar);
  }, []);

  const handleEditClick = () => {
    setIsEditMode((prevIsEditMode) => !prevIsEditMode);
  };

  const handleImageClick = () => {
    if (isEditMode) {
      setCurrentAvatar((prevAvatar) =>
        prevAvatar === maleAvatar ? femaleAvatar : maleAvatar
      );
    }
  };

  useEffect(() => {
    if (!isEditMode) {
      const profileData = {
        name: name,
        idd: idd,
        idd1: idd1,
        avatar: currentAvatar,
      };
      localStorage.setItem("profileData", JSON.stringify(profileData));
    }
  }, [isEditMode, name, idd, idd1, currentAvatar]);

  return (
    <div className="profile-container">
      <h1 className="text-center profile-heading">PROFILE</h1>
      <div className="outer-profile-box">
        <div className="inner-profile-box">
          <div className="d-flex flex-column justify-content-center align-items-center">
            <button
              id="imageButton"
              className="avatar-button"
              onClick={handleImageClick}
            >
              <img src={currentAvatar} height="100" width="100" alt="Avatar" />
            </button>
            <br />
            <div className="profile-info-container">
              <p className="profile-label">Name:</p>
              <input
                className={`profile-input ${isEditMode ? "editable" : ""}`}
                value={name}
                onChange={(e) => setName(e.target.value)}
                readOnly={!isEditMode}
              />
              <p className="profile-label">Username:</p>
              <input
                className={`profile-input ${isEditMode ? "editable" : ""}`}
                value={idd}
                onChange={(e) => setIdd(e.target.value)}
                readOnly={!isEditMode}
              />
              <p className="profile-label">Role:</p>
              <input
                className={`profile-input ${isEditMode ? "editable" : ""}`}
                value={idd1}
                onChange={(e) => setIdd1(e.target.value)}
                readOnly={!isEditMode}
              />
            </div>
            <div className="d-flex mt-2">
              <button className="edit-button" onClick={handleEditClick}>
                {isEditMode ? "Save Changes" : "Edit Profile"}
              </button>
            </div>
            <div className="profile-text">
              <span>
                This is your account page. Click on Edit to change the
                highlighted data and your avatar.
                <br />
                <br />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
