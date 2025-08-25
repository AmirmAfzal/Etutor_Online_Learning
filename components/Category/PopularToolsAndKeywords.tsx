import Icon from "@/components/ui/Icon";

type Tool = {
  name: string;
  courses: number;
};

type PopularToolsAndKeywordsProps = {
  tools: Tool[];
  keywords: string[];
};

const PopularToolsAndKeywords = ({
  tools,
  keywords,
}: PopularToolsAndKeywordsProps) => {
  return (
    <div className="my-12 mb-20 flex w-full max-w-6xl flex-col gap-6">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <h2 className="text-2xl font-semibold sm:text-3xl lg:text-4xl">
          Popular tools
        </h2>
        <div className="flex flex-row items-center justify-center gap-2">
          <Icon
            icon="ph:arrow-left"
            className="btn btn-primary btn-soft text-2xl sm:text-3xl"
          />
          <Icon
            icon="ph:arrow-right"
            className="btn btn-primary btn-soft text-2xl sm:text-3xl"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:justify-center sm:gap-4">
        {tools.map((tool) => (
          <button
            key={tool.name}
            className="border-base-300 hover:text-primary bg-base-100 border px-5 py-2.5 text-sm font-medium transition-all duration-300 hover:border-none hover:shadow-lg sm:px-7 sm:py-3 sm:text-base"
          >
            <div>{tool.name}</div>
            <div className="text-base-content/60 mt-1 text-xs sm:mt-2 sm:text-sm">
              {tool.courses.toLocaleString()} Courses
            </div>
          </button>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3 text-sm sm:text-base">
        <span className="font-semibold">Popular keyword:</span>
        {keywords.map((keyword) => (
          <button
            key={keyword}
            className="hover:bg-primary bg-base-200 text-base-content/70 hover:text-base-100 px-4 py-2 text-xs transition sm:text-sm"
          >
            {keyword}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PopularToolsAndKeywords;
