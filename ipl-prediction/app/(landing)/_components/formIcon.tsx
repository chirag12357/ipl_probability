import { CircleCheck, CircleX } from "lucide-react";
import React from "react";

// "['L','W','W','W','W']" is input. Convert this to an array of icons

type formIconProps = {
  form: string;
};

const FormIcon = (props: formIconProps) => {
  const stringToArray = props.form.split("");
  return (
    <div className="flex space-x-1">
      {stringToArray.map((result, index) => {
        if (result === "W") {
          return (
            <CircleCheck className="text-green-600" key={index} size={20} />
          );
        } else if (result === "L") {
          return <CircleX className="text-red-600" key={index} size={20} />;
        }
      })}
    </div>
  );
};

export default FormIcon;
