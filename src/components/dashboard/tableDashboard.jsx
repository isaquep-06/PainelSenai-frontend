import {
  TableWrapper,
  Table,
  Thead,
  Tbody,
  DivTudo
} from "./style.js";

function TableDashboard({ data = [] }) {
  if (!Array.isArray(data)) return null;

  return (
    <DivTudo>
      <TableWrapper>
        <Table>
          <Thead>
            <tr>
              <th>Turmas</th>
              <th>Espaço de aula</th>
            </tr>
          </Thead>

          <Tbody>
            {data.map((d) => (
              <tr key={d.id}>
                <td className="td-turma">{d.turma?.trim().toUpperCase()}</td>
                <td>{d.sala?.trim().toUpperCase()}</td>
              </tr>
            ))}
          </Tbody>
        </Table>
      </TableWrapper>
    </DivTudo>
  );
}

export default TableDashboard;