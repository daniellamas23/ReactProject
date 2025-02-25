import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addSession, removeSession, setSessions } from '../../redux/features/exerciseSlice';
import { toast } from 'react-toastify';
import SessionForm from './SessionForm';
import SessionList from './SessionList';
import SessionChart from './SessionChart';
import FilterBar from './FilterBar';
import SummaryCard from './SummaryCard';
import MinuteChart from './MinuteChart';
import MotivationalMessage from './MotivationalMessage';

const Home = () => {
  const [idActividad, setIdActividad] = useState('');
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [activities, setActivities] = useState([]);
  const [filter, setFilter] = useState('all');

  const dispatch = useDispatch();
  const sessions = useSelector((state) => state.exercise.sessions);

  // Efecto para cargar actividades desde la API
  useEffect(() => {
    const storedIduser = localStorage.getItem("id");
    const storedApikey = localStorage.getItem("apikey");

    if (!storedIduser || !storedApikey) {
      console.error("No se encontró el id de usuario o la apiKey en el localStorage.");
      return;
    }

    const fetchActivities = async () => {
      try {
        const response = await fetch('https://movetrack.develotion.com/actividades.php', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'apikey': storedApikey,
            'iduser': storedIduser
          }
        });

        const data = await response.json();
        if (data.codigo === 200) {
          setActivities(data.actividades);
        } else {
          toast.error('Error al obtener actividades: ' + data.mensaje);
        }
      } catch (error) {
        console.error("Error al cargar actividades:", error);
        toast.error("Hubo un error al obtener actividades.");
      }
    };

    fetchActivities();
  }, []);

  // Efecto para cargar sesiones desde la API y actualizar el estado global
  useEffect(() => {
    const storedIduser = localStorage.getItem("id");
    const storedApikey = localStorage.getItem("apikey");

    if (!storedIduser || !storedApikey) {
      console.error("No se encontró el id de usuario o la apiKey en el localStorage.");
      return;
    }

    const fetchSessions = async () => {
      try {
        const response = await fetch(`https://movetrack.develotion.com/registros.php?idUsuario=${storedIduser}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'apikey': storedApikey,
            'iduser': storedIduser
          }
        });
        const data = await response.json();
        if (data.codigo === 200) {
          // La API devuelve los registros en data.registros
          dispatch(setSessions(data.registros));
        } else {
          toast.error("Error al cargar sesiones: " + data.mensaje);
        }
      } catch (error) {
        console.error("Error al cargar sesiones:", error);
        toast.error("Error al cargar sesiones.");
      }
    };

    fetchSessions();
  }, [dispatch]);

  // Filtra las sesiones según el filtro (all, week, month)
  const filterSessions = (sessions) => {
    if (!sessions) return [];
    if (filter === 'all') return sessions;

    const cutoff = new Date();
    if (filter === 'week') {
      cutoff.setDate(cutoff.getDate() - 7);
    } else if (filter === 'month') {
      cutoff.setMonth(cutoff.getMonth() - 1);
    }

    return sessions.filter((session) => new Date(session.fecha) >= cutoff);
  };

  const handleAddSession = async () => {
    if (!idActividad || !time || !date) {
      toast.error('Por favor complete todos los campos');
      return;
    }

    const parsedTime = parseInt(time, 10);
    if (isNaN(parsedTime) || parsedTime <= 0) {
      toast.error('El tiempo debe ser un número válido mayor a 0');
      return;
    }

    const storedIduser = localStorage.getItem("id");
    const storedApikey = localStorage.getItem("apikey");

    const payload = {
      idActividad: parseInt(idActividad),
      idUsuario: parseInt(storedIduser),
      tiempo: parsedTime,
      fecha: date
    };

    try {
      const response = await fetch('https://movetrack.develotion.com/registros.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': storedApikey,
          'iduser': storedIduser
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      if (result.codigo === 200) {
        toast.success("Actividad agregada correctamente.");
        // Despachamos la acción; el slice estandarizará el objeto usando idRegistro
        dispatch(addSession({ ...payload, idRegistro: result.idRegistro }));
        setIdActividad('');
        setTime('');
        setDate('');
      } else {
        toast.error("Error: " + result.mensaje);
      }
    } catch (error) {
      console.error("Error al agregar sesión:", error);
      toast.error("No se pudo agregar la sesión.");
    }
  };

  const handleRemoveSession = async (idRegistro) => {
    const storedIduser = localStorage.getItem("id");
    const storedApikey = localStorage.getItem("apikey");

    if (!storedIduser || !storedApikey) {
      toast.error("No se encontró la sesión del usuario.");
      return;
    }

    try {
      const response = await fetch(`https://movetrack.develotion.com/registros.php?idRegistro=${idRegistro}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'apikey': storedApikey,
          'iduser': storedIduser
        }
      });

      const result = await response.json();
      if (result.codigo === 200) {
        toast.success("Sesión eliminada correctamente.");
        dispatch(removeSession(idRegistro));
      } else if (result.codigo === 404) {
        toast.error("El id del registro proporcionado no existe o no corresponde al usuario.");
      } else {
        toast.error("Error al eliminar sesión: " + result.mensaje);
      }
    } catch (error) {
      console.error("Error al eliminar sesión:", error);
      toast.error("No se pudo eliminar la sesión.");
    }
  };

  // Cálculos para gráficos y resúmenes
  const sessionCount = activities.map(activity => {
    const count = sessions.filter(session => session.idActividad === activity.id).length;
    return { name: activity.nombre, count };
  }).filter(item => item.count > 0);

  const chartData = {
    labels: sessionCount.map(item => item.name),
    datasets: [{
      label: 'Sesiones por Actividad',
      data: sessionCount.map(item => item.count),
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false
  };

  // Gráfico de minutos ejercitados en los últimos 7 días
  const today = new Date();
  const lastSevenDays = Array.from({ length: 7 }, (_, i) => {
    const day = new Date();
    day.setDate(today.getDate() - i);
    return day.toISOString().split('T')[0];
  }).reverse();

  const minutesPerDay = lastSevenDays.map(day => {
    const totalMinutes = sessions
      .filter(session => session.fecha === day)
      .reduce((sum, session) => sum + Number(session.tiempo), 0);
    return totalMinutes;
  });

  const dataMin = {
    labels: lastSevenDays,
    datasets: [{
      label: 'Minutos Ejercitados',
      data: minutesPerDay,
      backgroundColor: 'rgba(247, 22, 18, 0.2)',
      borderColor: 'rgb(244, 45, 14)',
      borderWidth: 1,
    }]
  };

  const optionsMin = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  const TodayStr = new Date().toISOString().split('T')[0];
  const yesterday = new Date();
  yesterday.setDate(new Date().getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];

  const tiempoHoy = sessions
    .filter((session) => session.fecha === TodayStr)
    .reduce((sum, session) => sum + Number(session.tiempo), 0);

  const tiempoAyer = sessions
    .filter((session) => session.fecha === yesterdayStr)
    .reduce((sum, session) => sum + Number(session.tiempo), 0);

  return (
    <div className="container mt-4">
      <SessionForm
        idActividad={idActividad}
        setIdActividad={setIdActividad}
        time={time}
        setTime={setTime}
        date={date}
        setDate={setDate}
        activities={activities}
        handleAddSession={handleAddSession}
      />
      <FilterBar filter={filter} setFilter={setFilter} />
      <SessionList
        sessions={filterSessions(sessions)}
        activities={activities}
        handleRemoveSession={handleRemoveSession}
      />
      <SummaryCard 
        totalTime={sessions.reduce((acc, session) => acc + (Number(session.tiempo) || 0), 0)} 
        dailyTime={sessions
          .filter((s) => s.fecha === TodayStr)
          .reduce((acc, session) => acc + (Number(session.tiempo) || 0), 0)} 
      />
      <SessionChart data={chartData} options={chartOptions} />
      <MinuteChart data={dataMin} options={optionsMin} />
      <MotivationalMessage tiempoHoy={tiempoHoy} tiempoAyer={tiempoAyer} />
    </div>
  );
};

export default Home;
