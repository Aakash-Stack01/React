import { useState } from "react";

export default function Player({
  playerName,
  playerSymbol,
  isActive,
  handlePlayerNameChange,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(playerName);
  let playerNameHTML = <span className="player-name"> {name}</span>;
  let btnCaption = "Edit";
  if (isEditing) {
    playerNameHTML = (
      <input type="text" value={name} required onChange={updateName}></input>
    );
    btnCaption = "Save";
  }
  function updateName(event) {
    setName(event.target.value);
  }

  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {playerNameHTML}
        <span className="player-symbol"> {playerSymbol}</span>
      </span>
      <button
        onClick={() => {
          setIsEditing((prev) => !prev);
          if (isEditing) {
            handlePlayerNameChange(playerSymbol, name);
          }
        }}
      >
        {btnCaption}
      </button>
    </li>
  );
}
