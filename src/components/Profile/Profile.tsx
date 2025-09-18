
import { Button, Tooltip } from "antd";
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useUserStore } from "../../lib/userStore";
import { doc, updateDoc } from "firebase/firestore";
import { auth, db, signOut } from "../../lib/firebase";
import { showMessage } from "../../utils/notify";
import { isUsernameTaken, uploadImgOnCloudinary } from "../../helpers";
import { usernamePattern } from "../../constants";
import { useChatStore } from "../../lib/chatStore";
import { MdModeEditOutline } from "react-icons/md";

const Profile: React.FC = () => {

    const { currentUser, changeUsername, changeBio, changeAvatar } = useUserStore();

    const [profile, setProfile] = useState({
        name: currentUser?.username,
        email: currentUser?.email,
        bio: currentUser?.bio ?? "Bio",
    });

    const [editing, setEditing] = useState<boolean>(false);
    const [form, setForm] = useState(profile);
    const [isChanged, setIsChanged] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const imgRef = useRef<null | HTMLInputElement>(null);
    const [file, setFile] = useState<null | File | undefined>(null);
    const [isUploading, setIsUploading] = useState<boolean>(false);

    const handleEdit = () => {
        setForm(profile);
        setEditing(true);
        setIsChanged(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const updatedForm = { ...form, [e.target.name]: e.target.value };
        setForm(updatedForm);

        const changed = updatedForm.name !== profile.name || updatedForm.bio !== profile.bio;

        setIsChanged(changed);
    };

    const userRef = doc(db, "users", currentUser?.id as string);
    const handleSave = async () => {
        const { name: username, bio } = form;

        if (!usernamePattern.value.test(username as string)) {
            showMessage({ type: "error", content: usernamePattern.message });
            return;
        }

        setIsLoading(true);
        try {

            const isTaken = await isUsernameTaken(username as string);
            if (isTaken && username !== currentUser?.username) {
                showMessage({ type: "error", content: "Username already taken." });
                return;
            } else if (bio.length > 75) {
                showMessage({ type: "error", content: "maximum 75 characters are allowed in bio." });
                return;
            }

            changeUsername(username as string);
            changeBio(bio as string);
            await updateDoc(userRef, {
                bio,
                username
            });
            setProfile(form);
            setEditing(false);
            setIsChanged(false);
        } catch (err) {
            showMessage({ type: "error", content: "something went wrong." });
        } finally {
            setIsLoading(false);
        }
    };

    const saveFile = async () => {
        try {
            setIsUploading(true);
            const url = await uploadImgOnCloudinary(file as File);
            console.log(url);
            await updateDoc(userRef, {
                avatar: url
            });
            changeAvatar(url);
            setFile(null);
        } catch (err) {
            const error = err as Error;
            showMessage({ type: "error", content: error.message });
        } finally {
            setIsUploading(false);
        }
    }

    const { logout } = useChatStore();

    const logoutHandler = async () => {
        signOut(auth)
            .then(() => showMessage({ type: "success", content: "Logout." }))
            .catch(err => showMessage({ type: "error", content: err.message }));
        logout();
    }

    const avatar = currentUser?.avatar ?? `https://ui-avatars.com/api/?name=${currentUser?.username}&background=0D8ABC&color=fff&size=128`;

    return (
        <div className="pb-8">
            <div className="relative max-w-lg mx-auto mt-12 bg-gray-50 border-1 border-gray-400 rounded-3xl shadow-2xl p-10 flex flex-col items-center">
                <Tooltip
                    title={<span className="text-[10px] font-medium">Go to Home Page</span>}
                    placement="bottom">
                    <Link to="/" className="absolute left-4 bg-[#efefef] px-4 py-2 rounded-md text-xs hover:bg-gray-200 shadow hover:shadow-none hover:border border-[#0000003b] shadow-[#0000003b]">Back</ Link>
                </Tooltip>
                <div className="flex flex-col items-center mb-7">
                    <div className="relative">
                        <img src={file ? URL.createObjectURL(file as File) as string : avatar} alt="User Avatar"
                            className="w-28 h-28 rounded-full object-cover  mb-4 border-4 border-blue-400 shadow-lg" />
                        <div className="img-edit-box absolute bottom-5 right-0">
                            <Button shape="circle" onClick={() => imgRef.current?.click()} disabled={file ? true : false}>
                                <MdModeEditOutline color="blue" />
                            </Button>
                            <input accept="image/*" type="file"
                                className="hidden" ref={imgRef}
                                onChange={(e) => setFile(e?.target?.files?.[0])} />
                            {file && (
                                <div className="btns text-xs absolute flex gap-4 bottom-0 left-12">
                                    <Button
                                        onClick={() => setFile(null)} disabled={isUploading}
                                        className="!border-none !bg-blue-50 hover:!bg-red-50 !text-black !text-xs rounded-md !shadow disabled:opacity-70 disabled:!cursor-not-allowed">
                                        Cancel
                                    </Button>
                                    <Button loading={isUploading} disabled={isUploading}
                                        onClick={saveFile}
                                        className="!border-none !bg-blue-50 hover:!bg-green-50 !text-black !text-xs rounded-md !shadow disabled:opacity-70 disabled:!cursor-not-allowed">
                                        Save
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
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
                            <Tooltip title="username" placement="bottom">
                                <h2 className="text-2xl font-bold text-gray-800 mb-1">{profile.name}</h2>
                            </Tooltip>
                        </>
                    )}
                </div>
                <div className="w-full mb-7 bg-white rounded-xl shadow p-5">
                    <div className="flex items-center mb-4">
                        <label className="font-semibold text-blue-400 min-w-[80px]">Email:</label>
                        <Tooltip title="Email" >
                            <span className="ml-3 text-gray-700 cursor-not-allowed">{profile.email}</span>
                        </Tooltip>
                    </div>
                    <div className="flex items-center mb-4 w-full">
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
                            <span className="ml-3 text-gray-700 break-words">{profile.bio}</span>
                        )}
                    </div>
                </div>
                <div className="flex gap-5 mt-2">
                    {editing ? (
                        <>
                            <Button loading={isLoading} disabled={isLoading || !isChanged} className="bg-gradient-to-r from-blue-400 to-blue-600 text-white px-7 py-2 rounded-xl font-semibold shadow hover:from-blue-600 hover:to-blue-400 transition" onClick={handleSave}>Save</Button>
                            <Button className="bg-slate-100 text-gray-700 px-7 py-2 rounded-xl font-semibold shadow hover:bg-slate-200 transition" onClick={() => setEditing(false)}>Cancel</Button>
                        </>
                    ) : (
                        <>
                            <Button className="bg-gradient-to-r from-blue-400 to-blue-600 text-white px-7 py-2 rounded-xl font-semibold shadow hover:from-blue-600 hover:to-blue-400 transition" onClick={handleEdit}>Edit Profile</Button>
                            <Button onClick={logoutHandler} color="danger" className="hover:!text-red-800 hover:!border hover:!border-red-900 px-7 py-2 rounded-xl font-semibold shadow transition">Logout</Button>
                        </>
                    )}
                </div>
            </div>
        </div >

    );
};

export default Profile;
