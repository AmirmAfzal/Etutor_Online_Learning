import { Checkbox } from "@/components/ui/checkbox";

const Notifications = () => {
  const checkBoxs = [
    { name: "buy-course", label: "I want to know who buy my course." },
    {
      name: "write-course",
      label: "I want to know who write a review on my course.",
    },
    { name: "lecture", label: "I want to know who commented on my lecture." },
    {
      name: "lecture-notes",
      label: "I want to know who download my lecture notes.",
    },
    { name: "comment", label: "I want to know who replied on my comment." },
    {
      name: "profile",
      label: "I want to know daily how many people visited my profile.",
    },
    {
      name: "lecture-file",
      label: "I want to know who download my lecture attach file.",
    },
  ];

  return (
    <section className="bg-base-100 space-y-4 p-6">
      <h3 className="text-2xl font-bold">Notifications</h3>
      <div className="space-y-2">
        {checkBoxs.map((item, index) => (
          <div key={index} className="flex flex-row items-center gap-4">
            <Checkbox
              id={item.name}
              className="data-[state=checked]:bg-primary data-[state=checked]:border-primary rounded-none"
            />
            <label htmlFor={item.name}> {item.label} </label>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-6 md:flex-row md:items-center">
        <button type="submit" className="btn btn-primary">
          Save Changes
        </button>
      </div>
    </section>
  );
};

export default Notifications;
