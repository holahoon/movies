import React from "react";
import Modal from "react-modal";
import YouTube from "react-youtube";

// To properly hide the application from screenreaders and other assistive technologies while the modal is open.
Modal.setAppElement("#root");

const PopupVideo = props => {
  // For Youtube video
  const video_options = {
    height: "500px",
    width: "800px"
  };

  return (
    <div>
      <button
        onClick={() => {
          props.trailer(props.movieId);
          props.toggleModal();
        }}
        className="modal-open-button"
      >
        <i className="fas fa-play" style={{ marginRight: "8px" }} />
        play trailer
      </button>
      <Modal isOpen={props.modalStatus} className="modal-custom">
        <button onClick={props.toggleModal()} className="modal-close-button">
          <i className="far fa-times-circle" />
        </button>
        <YouTube videoId={props.play} opts={video_options} />
      </Modal>
    </div>
  );
};

export default PopupVideo;
