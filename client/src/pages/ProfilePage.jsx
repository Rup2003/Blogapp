import {
  FaTwitter,
  FaGithub,
  FaGlobe,
  FaEdit,
  FaHeart,
  FaPen,
  FaLink,
  FaCalendarAlt,
  FaUser,
} from "react-icons/fa";
import { useBlogStore } from "../store/useBlogStore";

import { useEffect } from "react";
import { useAuthstores } from "../store/useAuthstores";
import UserBlogsList from "/home/rupak/Blog app/client/components/UserBlogsList.jsx";

const ProfilePage = () => {
  const { authUser } = useAuthstores();
  const { getAuthorBlogs } = useBlogStore();

  useEffect(() => {
    getAuthorBlogs(authUser?._id);
  }, [getAuthorBlogs, authUser]);

  if (!authUser)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen relative">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
      </div>

      {/* Profile Header */}
      <div className="container mx-auto px-4 py-12">
        <div className="backdrop-blur-xl bg-purple-900/20 rounded-2xl border border-purple-800/30 shadow-2xl overflow-hidden">
          <div className="p-8">
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
              {/* Avatar with edit button */}
              <div className="avatar relative">
                <div className="w-32 rounded-full ring ring-purple-500 ring-offset-4 ring-offset-purple-900/30">
                  <img
                    src={authUser.avatar?.url || "/default-avatar.png"}
                    alt={authUser.username}
                    className="object-cover"
                  />
                </div>
                <button
                  className="btn btn-circle btn-sm absolute bottom-0 right-0 bg-purple-600 border-purple-500 hover:bg-purple-700 text-white"
                  onClick={() =>
                    document.getElementById("edit_modal").showModal()
                  }
                >
                  <FaEdit />
                </button>
              </div>

              {/* Profile Info */}
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h1 className="text-3xl font-bold text-white">
                      {authUser.firstname} {authUser.lastname}
                    </h1>
                    <p className="text-lg text-purple-300">@{authUser.username}</p>
                  </div>
                  <button
                    className="btn bg-purple-600 hover:bg-purple-700 border-purple-500 text-white"
                    onClick={() =>
                      document.getElementById("edit_modal").showModal()
                    }
                  >
                    Edit Profile
                  </button>
                </div>

                <p className="my-4 text-purple-100">
                  {authUser.bio ||
                    "Passionate writer sharing thoughts and stories with the world."}
                </p>

                {/* Social Links */}
                <div className="flex gap-4 justify-center md:justify-start">
                  {authUser.twitter && (
                    <a
                      href={`https://twitter.com/${authUser.twitter}`}
                      className="btn btn-ghost btn-sm text-purple-300 hover:text-white"
                    >
                      <FaTwitter /> Twitter
                    </a>
                  )}
                  {authUser.github && (
                    <a
                      href={`https://github.com/${authUser.github}`}
                      className="btn btn-ghost btn-sm text-purple-300 hover:text-white"
                    >
                      <FaGithub /> GitHub
                    </a>
                  )}
                  {authUser.website && (
                    <a 
                      href={authUser.website} 
                      className="btn btn-ghost btn-sm text-purple-300 hover:text-white"
                    >
                      <FaGlobe /> Website
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats and Content */}
        <div className="mt-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              {
                value: authUser.blogs?.length || 0,
                label: "Posts",
                icon: <FaPen className="text-purple-400" />,
              },
              {
                value: authUser.followers?.length || 0,
                label: "Followers",
                icon: <FaUser className="text-purple-400" />,
              },
              {
                value: authUser.following?.length || 0,
                label: "Following",
                icon: <FaUser className="text-purple-400" />,
              },
              { 
                value: "1.2K", 
                label: "Likes", 
                icon: <FaHeart className="text-purple-400" /> 
              },
            ].map((stat, i) => (
              <div
                key={i}
                className="backdrop-blur-xl bg-purple-900/20 rounded-xl border border-purple-800/30 shadow-lg"
              >
                <div className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="text-purple-400">{stat.icon}</div>
                    <div>
                      <div className="text-2xl font-bold text-white">{stat.value}</div>
                      <div className="text-sm font-semibold text-purple-300">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Content Section */}
          <div className="backdrop-blur-xl bg-purple-900/20 rounded-2xl border border-purple-800/30 shadow-2xl overflow-hidden">
            <div className="tabs border-b border-purple-800/30">
              <a className="tab text-purple-300 hover:text-white border-purple-400 tab-active">
                <span className="font-semibold">My Posts</span>
              </a>
            </div>
            <div className="p-4">
              <UserBlogsList />
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <dialog id="edit_modal" className="modal">
        <div className="modal-box max-w-2xl backdrop-blur-xl bg-purple-900/30 border border-purple-800/30">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-purple-300 hover:text-white">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg mb-6 text-white">Edit Profile</h3>

          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="avatar">
                <div className="w-24 rounded-full ring ring-purple-500 ring-offset-4 ring-offset-purple-900/30">
                  <img
                    src={authUser.avatar?.url || "/default-avatar.png"}
                    alt="Profile"
                  />
                </div>
              </div>
            </div>
            <button className="btn btn-outline btn-sm mx-auto block border-purple-500 text-purple-300 hover:bg-purple-900/30 hover:text-white hover:border-purple-400">
              Change Photo
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-purple-300">First Name</span>
                </label>
                <input
                  type="text"
                  defaultValue={authUser.firstname}
                  className="input bg-purple-900/30 border-purple-800/50 text-white placeholder-purple-400/70"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-purple-300">Last Name</span>
                </label>
                <input
                  type="text"
                  defaultValue={authUser.lastname}
                  className="input bg-purple-900/30 border-purple-800/50 text-white placeholder-purple-400/70"
                />
              </div>
            </div>

            <div className="form-control flex flex-col">
              <label className="label">
                <span className="label-text text-purple-300">Bio</span>
              </label>
              <textarea
                className="textarea bg-purple-900/30 border-purple-800/50 text-white placeholder-purple-400/70"
                defaultValue={authUser.bio || ""}
                placeholder="Tell us about yourself..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-purple-300 flex items-center gap-2">
                    <FaTwitter /> Twitter
                  </span>
                </label>
                <input
                  type="text"
                  defaultValue={authUser.twitter || ""}
                  className="input bg-purple-900/30 border-purple-800/50 text-white placeholder-purple-400/70"
                  placeholder="@username"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-purple-300 flex items-center gap-2">
                    <FaGithub /> GitHub
                  </span>
                </label>
                <input
                  type="text"
                  defaultValue={authUser.github || ""}
                  className="input bg-purple-900/30 border-purple-800/50 text-white placeholder-purple-400/70"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-purple-300 flex items-center gap-2">
                    <FaGlobe /> Website
                  </span>
                </label>
                <input
                  type="url"
                  defaultValue={authUser.website || ""}
                  className="input bg-purple-900/30 border-purple-800/50 text-white placeholder-purple-400/70"
                  placeholder="https://example.com"
                />
              </div>
            </div>

            <button className="btn bg-purple-600 hover:bg-purple-700 border-purple-500 text-white w-full mt-6">
              Save Changes
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ProfilePage;