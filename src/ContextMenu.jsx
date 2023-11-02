import "./ContextMenu.css";

const ContextMenu = function ({
  posY,
  posX,
  commentActive,
  bookCommentState,
  selectedBook,
  options
}) {
  return (
    <div id="context-menu" style={{ top: `${posY}px`, left: `${posX}px` }}>
      {Object.entries(options).map(([key, onClickFunction], index) => (
        <div key={index} className="item" onClick={() => onClickFunction()}>
          {key}
        </div>
      ))}
    </div>
  );
};

export default ContextMenu;
