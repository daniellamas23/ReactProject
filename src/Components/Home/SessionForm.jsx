import React from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

const SessionForm = ({ idActividad, setIdActividad, time, setTime, date, setDate, activities, handleAddSession }) => {

  const handleSubmit = (e) => {
    e.preventDefault();
    const todayStr = new Date().toISOString().split('T')[0];
    if (date > todayStr) {
      toast.error("No se puede ingresar una fecha futura");
      return;
    }
    handleAddSession();
  };

  return (
    <Card className="mb-4">
      <Card.Body>
        <h3>Registrar Actividad</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Actividad</Form.Label>
            <Form.Control
              as="select"
              value={idActividad}
              onChange={(e) => setIdActividad(e.target.value)}
              required
            >
              <option value="">Seleccione una actividad</option>
              {activities?.length > 0 ? (
                activities.map((actividad) => (
                  <option key={actividad.id} value={actividad.id}>
                    {actividad.nombre}
                  </option>
                ))
              ) : (
                <option value="">Cargando actividades...</option>
              )}
            </Form.Control>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Tiempo (minutos)</Form.Label>
            <Form.Control
              type="number"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              min="1"
              placeholder="Duración en minutos"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Fecha</Form.Label>
            <Form.Control
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              max={new Date().toISOString().split('T')[0]}
            />
          </Form.Group>

          <Button variant="primary" type="submit" disabled={!idActividad || !time || !date}>
            Agregar Sesión
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default SessionForm;
