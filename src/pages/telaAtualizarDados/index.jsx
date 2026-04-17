import { useState } from "react";

// Forms
import CreateForm from "../../components/forms/turma/createForm";
import UpdateForm from "../../components/forms/turma/updateForm";
import DeleteForm from "../../components/forms/turma/deleteForm";

import CreateFormSala from "../../components/forms/sala/createForm";
// Navbar
import NavBarForm from "../../components/navBarForm/navbarForm";
import UpdateFormSala from "../../components/forms/sala/updateForm";
import DeleteFormSala from "../../components/forms/sala/deleteForm";

function AtualizarDados() {
  const [mode, setMode] = useState("create");

  return (
    <>
      <UpdateFormSala />
    </>
  );
}

export default AtualizarDados;