import { useState } from "react";

// Forms
import CreateForm from "../../components/forms/turma/createForm";
import UpdateForm from "../../components/forms/turma/updateForm";
import DeleteForm from "../../components/forms/turma/deleteForm";

// Navbar
import NavBarForm from "../../components/navBarForm/navbarForm";

function AtualizarDados() {
  const [mode, setMode] = useState("create");

  return (
    <div>

      {/* 🔥 Navbar controla o modo */}
      <NavBarForm mode={mode} setMode={setMode} />

      {/* 🔥 Renderização dinâmica */}
      {mode === "create" && <CreateForm />}
      {mode === "update" && <UpdateForm />}
      {mode === "delete" && <DeleteForm />}

    </div>
  );
}

export default AtualizarDados;