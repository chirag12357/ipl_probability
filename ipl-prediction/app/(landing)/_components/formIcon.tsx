import { CircleCheck, CircleX } from "lucide-react";
import React from "react";
type Props = {
  form: string[];
};
const FormIcon = (props: Props) => {
  return (
    <div className="flex">
      {props.form.map((form, idx) => (
        <span key={idx}>
          {form === "W" ? (
            <CircleCheck className="text-green-500 " />
          ) : (
            <CircleX className="text-red-500 " />
          )}
        </span>
      ))}
    </div>
  );
};

export default FormIcon;
