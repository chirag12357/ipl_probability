import { CircleCheck, CircleX } from "lucide-react";
import React from "react";

// ['L','W','W','W','W'] is the type of input props for the FormIcon component

type formIconProps = {
  form: string[];
};

const FormIcon = (props: string[]) => {
  return (
    <div className="flex space-x-1">
      {props.map((result, index) => {
        if (result === "W") {
          return <CircleCheck key={index} size={20} />;
        } else {
          return <CircleX key={index} size={20} />;
        }
      })}
    </div>
  );
};

export default FormIcon;
