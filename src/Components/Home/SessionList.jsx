import React from 'react';
import { ListGroup, Row, Col, Button, Card } from 'react-bootstrap';

const SessionList = ({ sessions, handleRemoveSession, activities }) => {
  const iconBaseUrl = "https://movetrack.develotion.com/imgs/";

  return (
    <Card className="mb-4">
      <Card.Body>
        <h3>Listado de Actividades</h3>
        <ListGroup>
          {sessions.length > 0 ? (
            sessions.map((session, index) => {
              const act = activities.find(a => a.id === Number(session.idActividad));
              const iconUrl = act ? `${iconBaseUrl}${act.imagen}.png` : 'https://via.placeholder.com/20';
              const activityName = act ? act.nombre : 'Actividad desconocida';
              return (
                <ListGroup.Item key={`session-${session.id || index}`}>
                  <Row>
                    <Col md={8}>
                      <img src={iconUrl} alt={activityName} style={{ width: '20px', marginRight: '10px' }} />
                      {activityName} - {session.tiempo} minutos - {session.fecha}
                    </Col>
                    <Col md={4} className="text-end">
                      <Button variant="danger" size="sm" onClick={() => handleRemoveSession(session.id)}>
                        Eliminar
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              );
            })
          ) : (
            <p>No hay actividades registradas.</p>
          )}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default SessionList;
