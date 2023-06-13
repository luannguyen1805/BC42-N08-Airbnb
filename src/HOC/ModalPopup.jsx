import React from "react";
import { Modal } from "antd";
import { useAppDispatch, useAppSelector } from "../Hooks/HooksRedux";
import { modalPopUp } from "../redux/Reducers/openModalReducer";

const ModalPopup = () => {
  const { ComponentContent, ComponentTitle, openModalPopup } = useAppSelector(
    (state) => state.openModalReducer
  );

  const dispatch = useAppDispatch();

  return (
    <div>
      <div>
        <Modal
          className="hoc_modal"
          title={<ComponentTitle />}
          open={openModalPopup}
          width={1000}
          style={{ borderRadius: "100%" }}
          onOk={() => {
            const action = modalPopUp(false);
            dispatch(action);
          }}
          onCancel={() => {
            const action = modalPopUp(false);
            dispatch(action);
          }}
        >
          <ComponentContent />
        </Modal>

      </div>
    </div>
  );
};

export default ModalPopup;
