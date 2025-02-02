// import { db } from "../../../services/db";

import { ChevronLeftIcon } from "@heroicons/react/outline";
import { Link, useNavigate } from "@remix-run/react";
import { useState } from "react";
import {
  ActionButton,
  LoginButton,
  ActionModal,
  Modal,
} from "../../../components";

export const MainHeader = ({ changeHeader }) => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  return (
    <nav className="flex flex-row justify-between px-2 py-2 col-start-1 col-end-13 rounded-b-2xl bg-white shadow-md  sticky top-0 right-0 left-0 mb-8 z-50">
      <button
        onClick={goBack}
        className="flex flex-row items-center space-x-1 "
      >
        <div>
          {/* <img
            src={require("../../utils/images/logo.png")}
            className="h-6 w-5"
          /> */}
          {changeHeader ? (
            <div className="flex flex-row">
              <ChevronLeftIcon className="w-5 h-5" />
              <p>back</p>
            </div>
          ) : (
            <label className="text-xl">avoqado</label>
          )}
        </div>
      </button>
      <ActionButton onClick={() => setShowModal(true)} />
      <LoginButton />
      {/* C-START: ActionModal */}
      {showModal && (
        <Modal onClose={() => setShowModal(false)} modalClassName={true}>
          <ActionModal onClick={() => setShowModal(false)} />
        </Modal>
      )}
    </nav>
  );
};
