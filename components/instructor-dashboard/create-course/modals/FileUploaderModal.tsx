import Icon from "@/components/ui/Icon";

const FileUploaderModal = () => {
  return (
    <div className="bg-base-content/70 fixed inset-0 z-50 flex items-center justify-center">
      <div className="bg-base-100 relative w-full max-w-xl rounded-lg shadow-lg">
        <div className="border-base-300 flex flex-row items-center justify-between border-b p-4">
          <h2 className="text-lg font-semibold">Attach File</h2>
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
          <div className="border-base-300 flex flex-col items-center justify-center gap-2 border p-4">
            <p className="font-semibold">Attach File</p>
            <p className="text-base-content/70 text-xs">
              drag an drop a file or{" "}
              <label htmlFor="file" className="cursor-pointer font-semibold">
                browse file
              </label>
              <input type="file" id="file" className="hidden" />
            </p>
          </div>
          <div className="mt-6 flex flex-row items-center justify-between">
            <button className="btn btn-outline">Cancel</button>
            <button className="btn btn-primary">Attach File</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUploaderModal;
