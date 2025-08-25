import React from "react";

interface Props {
  title: string;
  errors: string[];
}

const ErrorMessage = ({ title, errors }: Props) => {
  return (
    <div className="bg-error/10 text-error mt-4 rounded-md p-4">
      <p>{title}</p>
      <ul className="ml-4 list-disc">
        {errors.map((error, index) => (
          <li key={index}>{error}</li>
        ))}
      </ul>
    </div>
  );
};

export default ErrorMessage;
