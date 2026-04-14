export default function ButtonForm({ mode, isLoading }) {
  return (
    <button type="submit" disabled={isLoading}>
      {mode === 'create' && 'Criar'}
      {mode === 'update' && 'Atualizar'}
      {mode === 'delete' && 'Deletar'}
    </button>
  );
}