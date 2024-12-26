import React from "react";
const DeclinedModal = ({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) => {
  return (
    <div className={`modal-container ${open ? "open" : ""}`}>
      <div onClick={handleClose} className="modal-backdrop"></div>
      <div className="modal">
        <h1>Oops...</h1>
        <p className="par">
          Lucky but you have no sufficient{" "}
          <span className="with-ton">to make 2X!</span> Deposit some to make it
          happen 😉
        </p>
      </div>
    </div>
  );
};

export default DeclinedModal;
