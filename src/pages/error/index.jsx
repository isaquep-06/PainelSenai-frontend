
import { usePageTitle } from "../../styles/pageName.jsx";

function PageError() {
  usePageTitle("Pagina nao encontrada");

  return (
    <h1>404 NOT FOUND (ERROR)</h1>
  )
}

export default PageError;
