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
              <th>Espaço de aula</th>
              <th>Turmas</th>
            </tr>
          </Thead>

          <Tbody>
            {data.map((d) => (
              <tr key={d.turma}>
                <th>{d.sala.trim().toUpperCase()}</th>
                <td>{d.turma}</td>
              </tr>
            ))}
          </Tbody>
        </Table>
      </TableWrapper>
    </DivTudo>
  );
}

export default TableDashboard;