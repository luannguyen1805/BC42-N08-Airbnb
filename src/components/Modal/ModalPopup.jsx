import React from "react";
import { Modal } from "antd";
import { useAppDispatch, useAppSelector } from "../../Hooks/HooksRedux";
import { modalPopUp } from "../../redux/Reducers/openModalReducer";

const ModalPopup = () => {
  const { ComponentContent, openModalPopup } = useAppSelector(
    (state) => state.openModalReducer
  );

  const dispatch = useAppDispatch();

  const handleOk = () => {
    dispatch(modalPopUp(false));
  };

  const handleCancel = () => {
    dispatch(modalPopUp(false));
  };

  return (
    <div>
      <div>
        <Modal
          className="hoc_modal"
          title={<h2 className="text-2xl text-center">Thông tin chi tiết</h2>}
          open={openModalPopup}
          width={1000}
          style={{ borderRadius: "100%" }}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <ComponentContent />
        </Modal>

      </div>
    </div>
  );
};

export default ModalPopup;
