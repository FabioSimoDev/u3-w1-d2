import React from "react";

const SelectGenre = function ({ onSelectGenre }) {
  const handleClick = (e) => {
    const selected = e.target.textContent.toLowerCase();
    onSelectGenre(selected);
  };
  return (
    <div className="d-flex gap-3 mb-3">
      <span onClick={handleClick} className="text-primary" role="button">
        History
      </span>
      <span onClick={handleClick} className="text-primary" role="button">
        Fantasy
      </span>
      <span onClick={handleClick} className="text-primary" role="button">
        Scifi
      </span>
      <span onClick={handleClick} className="text-primary" role="button">
        Horror
      </span>
    </div>
  );
};

export default SelectGenre;
