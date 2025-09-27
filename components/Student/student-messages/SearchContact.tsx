import { Icon } from "@iconify/react";

const SearchContact = () => {
  return (
    <div className="mt-2 w-full max-w-xs">
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Search"
          className="border-base-300 text-base-content focus:ring-primary placeholder-base-content/70 w-full border py-2 pr-4 pl-10 focus:ring-2 focus:outline-none"
        />
        <Icon
          icon="mdi:magnify"
          className="text-base-content/60 absolute top-1/2 left-3 -translate-y-1/2 transform"
        />
      </div>
    </div>
  );
};

export default SearchContact;
