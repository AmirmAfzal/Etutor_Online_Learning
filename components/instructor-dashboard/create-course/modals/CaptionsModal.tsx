import Icon from "@/components/ui/Icon";
import { Textarea } from "@/components/ui/textarea";

const CaptionsModal = () => {
  return (
    <div className="bg-base-content/70 fixed inset-0 z-50 flex items-center justify-center">
      <div className="bg-base-100 relative w-full max-w-xl rounded-lg shadow-lg">
        <div className="border-base-300 flex flex-row items-center justify-between border-b p-4">
          <h2 className="text-lg font-semibold">Add Lecture Captions</h2>
          <button>
            <Icon
              icon="ph:x"
              className="text-base-content/70 hover:text-base-content cursor-pointer"
              width="20"
              height="20"
            />
          </button>
        </div>
        <div className="p-4">
          <p className="text-base-content/70 mb-2 text-sm">Caption</p>
          <Textarea
            className="mb-4 min-h-32 w-full rounded border px-3 py-2"
            placeholder="Write your lecture caption here..."
          />
          <div className="mt-6 flex flex-row items-center justify-between">
            <button className="btn btn-outline">Cancel</button>
            <button className="btn btn-primary">Add Caption</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaptionsModal;
