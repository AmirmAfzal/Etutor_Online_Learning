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
                  src="/images/student-dashboard/profile-student.jpg"
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
                <button
                  className="bg-base-content/70 text-base-100 absolute bottom-0 left-0 flex w-full cursor-pointer items-center justify-center gap-2 py-2 text-sm font-medium"
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
              <label
                htmlFor="firstName"
                className="mb-1 block text-sm font-medium"
              >
                Full name
              </label>
              <div className="flex gap-2">
                <input
                  id="firstName"
                  type="text"
                  placeholder="First name"
                  className="input focus:ring-primary border-base-content/10 w-1/2 border focus:ring-2 focus:outline-none"
                />
                <input
                  id="lastName"
                  type="text"
                  placeholder="Last name"
                  className="input focus:ring-primary border-base-content/10 w-1/2 border focus:ring-2 focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="username"
                className="mb-1 block text-sm font-medium"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                placeholder="Enter your username"
                className="input focus:ring-primary border-base-content/10 w-full border focus:ring-2 focus:outline-none"
              />
            </div>
            <div className="col-span-2">
              <label htmlFor="email" className="mb-1 block text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Email address"
                className="input focus:ring-primary border-base-content/10 w-full border focus:ring-2 focus:outline-none"
              />
            </div>
            <div className="col-span-2">
              <label htmlFor="title" className="mb-1 block text-sm font-medium">
                Title
              </label>
              <div className="relative">
                <input
                  id="title"
                  type="text"
                  placeholder="Your title, profession or small biography"
                  className="input focus:ring-primary border-base-content/10 w-full border pr-12 focus:ring-2 focus:outline-none"
                  maxLength={50}
                />
                <span className="text-base-content/80 absolute top-1/2 right-3 -translate-y-1/2 text-xs">
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
      <div className="border-base-content/10 flex flex-col gap-6 border-t pt-4">
        <h3 className="mb-6 text-lg font-semibold">Change password</h3>
        <form className="flex flex-col items-start gap-6">
          <div className="w-1/2">
            <label
              htmlFor="currentPassword"
              className="mb-1 block text-sm font-medium"
            >
              Current Password
            </label>
            <div className="relative">
              <input
                id="currentPassword"
                type="password"
                placeholder="Password"
                className="input focus:ring-primary border-base-content/10 w-full border pr-10 focus:ring-2 focus:outline-none"
              />
              <span className="text-base-content/80 absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer">
                <Icon icon="ph:eye" width={16} height={16} />
              </span>
            </div>
          </div>
          <div className="w-1/2">
            <label
              htmlFor="newPassword"
              className="mb-1 block text-sm font-medium"
            >
              New Password
            </label>
            <div className="relative">
              <input
                id="newPassword"
                type="password"
                placeholder="Password"
                className="input focus:ring-primary border-base-content/10 w-full border pr-10 focus:ring-2 focus:outline-none"
              />
              <span className="text-base-content/80 absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer">
                <Icon icon="ph:eye" width={16} height={16} />
              </span>
            </div>
          </div>
          <div className="w-1/2">
            <label
              htmlFor="confirmPassword"
              className="mb-1 block text-sm font-medium"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type="password"
                placeholder="Confirm new password"
                className="input focus:ring-primary border-base-content/10 w-full border pr-10 focus:ring-2 focus:outline-none"
              />
              <span className="text-base-content/80 absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer">
                <Icon icon="ph:eye" width={16} height={16} />
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
