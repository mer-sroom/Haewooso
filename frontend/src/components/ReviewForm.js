import React, { useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Button = styled.button`
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
`;

const CloseButton = ({ onClick, className }) => {
  return (
    <Button onClick={onClick} className={className}>
      &times;
    </Button>
  );
};

CloseButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
};

function Modal({
  className,
  onClose,
  maskClosable = true,
  closable = true,
  visible = false,
  children,
}) {
  const onMaskClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose(e);
    }
  };

  const close = (e) => {
    if (onClose) {
      onClose(e);
    }
  };

  useEffect(() => {
    if (visible) {
      // Calculate scrollbar width
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;

      // Lock scroll and add padding to prevent content shift
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      // Reset styles when modal is not visible
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }

    // Clean up when component is unmounted or when visibility changes
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [visible]); // Run effect only when `visible` changes

  return (
    <div className="modal-root">
      <ModalOverlay $visible={visible} />
      <ModalWrapper
        className={className}
        onClick={maskClosable ? onMaskClick : null}
        tabIndex={-1}
        $visible={visible}
      >
        <ModalInner tabIndex={0} className="modal-inner">
          {closable && <CloseButton className="modal-close" onClick={close} />}
          <ModalHeader>
            <h2>리뷰 작성하기</h2>
          </ModalHeader>
          <ModalContent>{children}</ModalContent>
        </ModalInner>
      </ModalWrapper>
    </div>
  );
}

Modal.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  maskClosable: PropTypes.bool,
  closable: PropTypes.bool,
  visible: PropTypes.bool,
  children: PropTypes.node,
};

const ModalWrapper = styled.div`
  box-sizing: border-box;
  display: ${(props) => (props.$visible ? "block" : "none")};
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  overflow: auto;
  outline: 0;
`;

const ModalOverlay = styled.div`
  box-sizing: border-box;
  display: ${(props) => (props.$visible ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999;
`;

const ModalInner = styled.div`
  box-sizing: border-box;
  position: relative;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
  background-color: #fff;
  border-radius: 10px;
  width: 360px;
  max-width: 480px;
  top: 50%;
  transform: translateY(-50%);
  margin: 0 auto;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  h2 {
    margin: 0;
    font-size: 1.5rem;
  }
`;

const ModalContent = styled.div`
  padding: 20px;
  border: none;
  border-radius: 5px;
  flex: 1; // Allow content area to grow and take available space
  margin-bottom: 20px; // Space between content and button
`;

export default Modal;
