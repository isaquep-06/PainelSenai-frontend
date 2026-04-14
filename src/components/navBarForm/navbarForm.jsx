export default function NavBarForm({ mode, setMode }) {

  return (
    <nav>
      <ul>
        <li onClick={() => setMode('create')}>Criar</li>
        <li onClick={() => setMode('update')}>Atualizar</li>
        <li onClick={() => setMode('delete')}>Deletar</li>

        <h1>{mode}</h1>
      </ul>
    </nav>
  )
} 