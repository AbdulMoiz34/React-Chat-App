
import React, { useState } from "react";

const initialProfile = {
    name: "Your Name",
    username: "@username",
    email: "your.email@example.com",
    bio: "This is your bio. You can edit it as you like.",
    location: "Your City, Country",
};

const Profile: React.FC = () => {

    const [profile, setProfile] = useState(initialProfile);
    const [editing, setEditing] = useState(false);
    const [form, setForm] = useState(profile);

    const handleEdit = () => {
        setForm(profile);
        setEditing(true);
    };

    const handleCancel = () => {
        setEditing(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        setProfile(form);
        setEditing(false);
    };

    return (
        <div className="pb-8">

            <div className="max-w-lg mx-auto mt-12 bg-gray-50 border-1 border-gray-400 rounded-3xl shadow-2xl p-10 flex flex-col items-center relative">
                <div className="flex flex-col items-center mb-7">
                    <img
                        src="/src/assets/avatar.png"
                        alt="User Avatar"
                        className="w-28 h-28 rounded-full object-cover mb-4 border-4 border-blue-400 shadow-lg"
                    />
                    {editing ? (
                        <>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                className="w-full mb-2 px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-400 focus:outline-none bg-slate-100 text-lg font-semibold text-center"
                                placeholder="Name"
                            />
                        </>
                    ) : (
                        <>
                            <h2 className="text-2xl font-bold text-gray-800 mb-1">{profile.name}</h2>
                        </>
                    )}
                </div>
                <div className="w-full mb-7 bg-white rounded-xl shadow p-5">
                    <div className="flex items-center mb-4">
                        <label className="font-semibold text-blue-400 min-w-[80px]">Email:</label>
                        {editing ? (
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                className="flex-1 ml-3 px-3 py-2 rounded-lg border border-gray-300 focus:border-blue-400 focus:outline-none bg-slate-100 text-base"
                                placeholder="Email"
                            />
                        ) : (
                            <span className="ml-3 text-gray-700">{profile.email}</span>
                        )}
                    </div>
                    <div className="flex items-center mb-4">
                        <label className="font-semibold text-blue-400 min-w-[80px]">Bio:</label>
                        {editing ? (
                            <textarea
                                name="bio"
                                value={form.bio}
                                onChange={handleChange}
                                className="flex-1 ml-3 px-3 py-2 rounded-lg border border-gray-300 focus:border-blue-400 focus:outline-none bg-slate-100 text-base resize-none"
                                placeholder="Bio"
                                rows={2}
                            />
                        ) : (
                            <span className="ml-3 text-gray-700">{profile.bio}</span>
                        )}
                    </div>
                </div>
                <div className="flex gap-5 mt-2">
                    {editing ? (
                        <>
                            <button className="bg-gradient-to-r from-blue-400 to-blue-600 text-white px-7 py-2 rounded-xl font-semibold shadow hover:from-blue-600 hover:to-blue-400 transition" onClick={handleSave}>Save</button>
                            <button className="bg-slate-100 text-gray-700 px-7 py-2 rounded-xl font-semibold shadow hover:bg-slate-200 transition" onClick={handleCancel}>Cancel</button>
                        </>
                    ) : (
                        <>
                            <button className="bg-gradient-to-r from-blue-400 to-blue-600 text-white px-7 py-2 rounded-xl font-semibold shadow hover:from-blue-600 hover:to-blue-400 transition" onClick={handleEdit}>Edit Profile</button>
                            <button className="bg-slate-100 text-gray-700 px-7 py-2 rounded-xl font-semibold shadow hover:bg-slate-200 transition">Logout</button>
                        </>
                    )}
                </div>
            </div>
        </div>

    );
};

export default Profile;
