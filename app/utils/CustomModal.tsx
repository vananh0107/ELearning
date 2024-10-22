import React from 'react';
import { Modal, Box } from '@mui/material';
type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: any;
  component: any;
  setRoute?: (route: string) => void;
};
const CustomModal: FC<Props> = ({
  open,
  setOpen,
  setRoute,
  component: Component,
}) => {
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-describedby="modal-modal-description"
      aria-labelledby="modal-modal-title"
    >
      <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 -w-[450px] bg-white dark:bg-slate-900 rounded-[8px] shadow outline-none  p-5">
        <Component setOpen={setOpen} setRoute={setRoute}></Component>
      </Box>
    </Modal>
  );
};

export default CustomModal;
