import { ModalInterface } from '~/shared/interfaces';

export default function Modal({ children, onClose }: ModalInterface) {
  return (
    <div
      className='modal-backdrop'
      role='button'
      onClick={onClose}
      onKeyUp={onClose}
      onKeyDown={onClose}
      tabIndex={0}
    >
      <dialog
        className='modal'
        open
        role='presentation'
        onClick={(event) => event.stopPropagation()}
        onKeyUp={(event) => event.stopPropagation()}
        onKeyDown={(event) => event.stopPropagation()}
      >
        {children}
      </dialog>
    </div>
  );
}
