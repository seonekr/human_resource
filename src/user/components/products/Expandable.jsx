import React, { useState } from "react";

const Expandable = ({ children, maxChars = 50 }) => {
  const [expanded, setExpandad] = useState(true);
  if (children.length <= maxChars) return <p>{children}</p>;

  const text = expanded ? children.substring(0, maxChars) : children;

  return (
    <>
      <p>
        {text}...
        <button onClick={() => setExpandad(!expanded)} className="btn_read_more">
          {expanded ? "Read more" : "Read less"}
        </button>
      </p>
    </>
  );
};

export default Expandable;
