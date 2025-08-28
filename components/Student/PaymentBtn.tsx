"use client";
import CoursesLoading from "@/app/courses/loading";
import { addToCheckout } from "@/lib/actions/student/addToCheckout";
import Form from "next/form";
import { useActionState } from "react";

interface Props {
  courseIds?: string[];
}

const PaymentBtn = ({ courseIds }: Props) => {
  const [state, action, pending] = useActionState(addToCheckout, {
    message: "",
    errors: [] as string[],
  });

  return (
    <Form action={action} className="w-full">
      {courseIds?.map((id) => (
        <input key={id} type="hidden" name="courseId" value={id} />
      ))}
      <button
        type="submit"
        className="btn btn-primary text-md mt-6 w-full py-3 font-semibold tracking-wide transition-all"
        disabled={pending}
      >
        {pending ? <CoursesLoading /> : "Complete Payment"}
      </button>
    </Form>
  );
};

export default PaymentBtn;
