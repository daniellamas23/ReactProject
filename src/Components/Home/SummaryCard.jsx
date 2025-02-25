import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

const SummaryCard = ({ totalTime, dailyTime }) => {
  return (
    <Card className="mt-4">
      <Card.Body>
        <Row>
          <Col md={6}>
            <h4>Total de Tiempo Ejercitado: {totalTime} minutos</h4>
          </Col>
          <Col md={6}>
            <h4>Tiempo Ejercitado Hoy: {dailyTime} minutos</h4>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default SummaryCard;
