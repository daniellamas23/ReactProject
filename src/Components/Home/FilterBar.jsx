import React from 'react';
import { Card, Form } from 'react-bootstrap';

const FilterBar = ({ filter, setFilter }) => {
  return (
    <Card className="mb-4">
      <Card.Body>
        <h3>Filtrar Actividades</h3>
        <Form.Control as="select" value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">Todo el Histórico</option>
          <option value="week">Última Semana</option>
          <option value="month">Último Mes</option>
        </Form.Control>
      </Card.Body>
    </Card>
  );
};

export default FilterBar;
