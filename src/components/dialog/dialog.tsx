import React, { type ReactNode, useEffect, useRef } from "react";

export function Dialog({
  isOpen,
  setIsOpen,
  children,
}: {
  isOpen: boolean;
  setIsOpen: (value: ((prevState: boolean) => boolean) | boolean) => void;
  children: ReactNode;
}) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isOpen]);

  function handleDialogClose() {
    setIsOpen(false);
  }
  useEffect(() => {
    dialogRef.current?.addEventListener("close", handleDialogClose);
    return () =>
      dialogRef.current?.removeEventListener("close", handleDialogClose);
  }, []);

  return <dialog ref={dialogRef}>{children}</dialog>;
}
