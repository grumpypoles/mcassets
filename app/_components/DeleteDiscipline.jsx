"use client";
import { TrashIcon } from "@heroicons/react/24/solid";

import { useTransition } from "react";
import SpinnerMini from "@/app/_components/SpinnerMini";
// import { deleteDiscipline } from "@/app/_lib/actions_masts";

function DeleteDiscipline({ rowId, onDelete }) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    if (confirm("Are you sure you want to delete this record?"))
      startTransition(() => deleteDiscipline(rowId));
    
  }

  return (
    <button
      onClick={handleDelete}
      className="flex items-center flex-grow gap-2 px-3 text-xs font-bold uppercase transition-colors group text-primary-300"
    >
      {!isPending ? (
        <>
          <TrashIcon className="w-5 h-5 mt-2 transition-colors text-primary-600 group-hover:text-primary-100" />
        </>
      ) : (
        <span className="mx-auto">
          <SpinnerMini />
        </span>
      )}
    </button>
  );
}

export default DeleteDiscipline;
