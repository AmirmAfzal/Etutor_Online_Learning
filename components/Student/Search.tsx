import Form from "next/form";

import Icon from "../ui/Icon";

const Search = ({ action }: { action: string }) => {
  return (
    <Form
      className="flex w-full max-w-md flex-col items-start gap-2"
      action={action}
    >
      <label htmlFor="search" className="text-base-content/60 text-xs">
        Search:
      </label>
      <div className="border-base-content/10 bg-base-100 focus-within:border-primary focus-within:ring-primary/20 flex w-full items-center border p-1 focus-within:ring-1">
        <button type="submit">
          <Icon
            icon="ph:magnifying-glass-bold"
            className="text-base-content/40 ml-3 text-xl"
          />
        </button>
        <input
          id="search"
          name="query"
          type="text"
          placeholder="Search in your courses..."
          className="placeholder:text-base-content/40 w-full bg-transparent py-2 pr-4 pl-2 text-base focus:ring-0 focus:outline-none"
        />
      </div>
    </Form>
  );
};

export default Search;
