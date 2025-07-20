import React from "react";
import Image from "next/image";
import Icon from "@/components/ui/Icon";

const StudentSettingsPage = () => {
  return (
    <div className="bg-base-100 max-w-5xl">
      {/* Header */}

      {/* Account Settings */}
      <div className="mb-12">
        <h3 className="mb-6 text-lg font-semibold">Account settings</h3>
        <div className="flex gap-10">
          {/* Profile Photo */}
          <div className="w-1/3 flex-shrink-0">
            <div className="border-base-content/10 flex flex-col items-center gap-2 border p-4">
              <div className="bg-base-100 relative mb-2 flex h-52 w-52 items-center justify-center overflow-hidden">
                <Image
                  width={192}
                  height={192}
                  src="/images/profile-student.jpg"
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
                <button
                  className="bg-base-content/70 text-base-100 absolute bottom-0 left-0 flex w-full items-center justify-center gap-2 py-2 text-sm font-medium"
                  type="button"
                >
                  <Icon icon="ph:upload-simple" width={16} height={16} />
                  Upload Photo
                </button>
              </div>
              <p className="text-base-content/70 text-center text-xs">
                Image size should be under 1MB and <br /> image ration needs to
                be 1:1
              </p>
            </div>
          </div>
          {/* User Info Form */}
          <form className="grid flex-1 grid-cols-2 gap-6">
            <div>
              <label className="mb-1 block text-sm font-medium">
                Full name
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="First name"
                  className="input input-bordered focus:ring-primary w-1/2 rounded-none border-0 focus:ring-2 focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Last name"
                  className="input input-bordered focus:ring-primary w-1/2 rounded-none border-0 focus:ring-2 focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Username</label>
              <input
                type="text"
                placeholder="Enter your username"
                className="input input-bordered focus:ring-primary w-full rounded-none border-0 focus:ring-2 focus:outline-none"
              />
            </div>
            <div className="col-span-2">
              <label className="mb-1 block text-sm font-medium">Email</label>
              <input
                type="email"
                placeholder="Email address"
                className="input input-bordered focus:ring-primary w-full rounded-none border-0 focus:ring-2 focus:outline-none"
              />
            </div>
            <div className="col-span-2">
              <label className="mb-1 block text-sm font-medium">Title</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Your title, profession or small biography"
                  className="input input-bordered focus:ring-primary w-full rounded-none border-0 pr-12 focus:ring-2 focus:outline-none"
                  maxLength={50}
                />
                <span className="text-neutral absolute top-1/2 right-3 -translate-y-1/2 text-xs">
                  0/50
                </span>
              </div>
            </div>
            <div className="col-span-2">
              <button
                type="button"
                className="btn btn-primary mt-2 px-6 py-2 font-medium"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Change Password */}
      <div>
        <h3 className="mb-6 text-lg font-semibold">Change password</h3>
        <form className="grid grid-cols-3 items-end gap-6">
          <div>
            <label className="mb-1 block text-sm font-medium">
              Current Password
            </label>
            <div className="relative">
              <input
                type="password"
                placeholder="Password"
                className="input input-bordered focus:ring-primary w-full rounded-none border-0 pr-10 focus:ring-2 focus:outline-none"
              />
              <span className="text-neutral absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer">
                <svg
                  width="18"
                  height="18"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </span>
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">
              New Password
            </label>
            <div className="relative">
              <input
                type="password"
                placeholder="Password"
                className="input input-bordered focus:ring-primary w-full rounded-none border-0 pr-10 focus:ring-2 focus:outline-none"
              />
              <span className="text-neutral absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer">
                <svg
                  width="18"
                  height="18"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </span>
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type="password"
                placeholder="Confirm new password"
                className="input input-bordered focus:ring-primary w-full rounded-none border-0 pr-10 focus:ring-2 focus:outline-none"
              />
              <span className="text-neutral absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer">
                <svg
                  width="18"
                  height="18"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </span>
            </div>
          </div>
          <div className="col-span-3">
            <button
              type="button"
              className="btn btn-primary mt-2 px-6 py-2 font-medium"
            >
              Change Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentSettingsPage;
