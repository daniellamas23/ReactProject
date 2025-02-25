import React from 'react';
import { Card } from 'react-bootstrap';
import styles from '../styles/Welcome/Welcome.module.css';

const Welcome = () => {
  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <Card.Body>
          <h2 className={styles.title}>Bienvenidos a ActividApp</h2>
          <p className={styles.subtitle}>Tu aplicación deportiva</p>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Welcome;
