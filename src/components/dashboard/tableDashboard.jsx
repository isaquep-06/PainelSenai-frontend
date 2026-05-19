import {
  TableWrapper,
  Table,
  Thead,
  Tbody,
  DivTudo,
} from "./style.js";

function TableDashboard({
  data = [],
  showActions = false,
  onSelectRow,
}) {
  if (!Array.isArray(data)) return null;

  const rowCount = data.length || 1;
  const compactScale =
    rowCount > 18 ? "dense" : rowCount > 12 ? "compact" : "normal";

  return (
    <DivTudo data-density={compactScale}>
      <TableWrapper data-density={compactScale}>
        <Table data-has-actions={showActions}>
          <Thead>
            <tr>
              <th>Turmas</th>
              <th>Espaco de aula</th>
              {showActions && (
                <th className="th-action">
                  Acesso
                </th>
              )}
            </tr>
          </Thead>

          <Tbody>
            {data.map((d, index) => (
              <tr
                key={`${d.turma}-${d.sala}-${index}`}
              >
                <td className="td-turma">
                  {d.turma}
                </td>
                <td>
                  {d.sala
                    ?.trim()
                    .toUpperCase()}
                </td>
                {showActions && (
                  <td className="td-action">
                    <button
                      type="button"
                      className="action-button"
                      onClick={() =>
                        onSelectRow?.(d)
                      }
                    >
                      ➔
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </Tbody>
        </Table>
      </TableWrapper>
    </DivTudo>
  );
}

export default TableDashboard;
