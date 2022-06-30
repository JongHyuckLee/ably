import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useAtom } from "jotai";
import { modalStateAtom } from "../../../store/modal/atoms";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const CommonModal = () => {
  const [modal, setModal] = useAtom(modalStateAtom);
  return (
    <Modal
      open={modal.open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      onClose={() => setModal((prev) => ({ ...prev, open: false }))}
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {modal.title}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {modal.message}
        </Typography>
      </Box>
    </Modal>
  );
};
export default CommonModal;
