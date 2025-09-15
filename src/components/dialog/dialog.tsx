import React, {
  type MouseEvent,
  type ReactNode,
  useEffect,
  useRef,
} from "react";

export function Dialog({
  isDialogOpen,
  setIsDialogOpen,
  children,
}: {
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
  children: ReactNode;
}) {
  function handleClickBackdrop(e: MouseEvent) {
    if (e.target === e.currentTarget) setClosed();
  }
  function setClosed() {
    setIsDialogOpen(false);
  }
  useEffect(() => {
    dialogRef.current?.addEventListener("close", setClosed);
    return () => dialogRef.current?.removeEventListener("close", setClosed);
  }, []);
  useEffect(() => {
    if (isDialogOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isDialogOpen]);
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  return (
    <dialog ref={dialogRef} onClick={handleClickBackdrop}>
      {children}
    </dialog>
  );
}
