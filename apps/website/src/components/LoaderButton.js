import React from "react";
import { Button } from 'grommet';
import { Update } from 'grommet-icons';
import "./LoaderButton.css";

export default function LoaderButton({
  isLoading,
  className = "",
  disabled = false,
  ...props
}) {
  return (
    <Button
      {...props}
      className={`LoaderButton ${className}`}
      disabled={disabled || isLoading}
      reverse
      icon={ isLoading && <Update className="spinning"/>}
    />
  );
}
