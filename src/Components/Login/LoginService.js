export const loginUser = async (dataToSend) => {
    try {
      const response = await fetch('https://movetrack.develotion.com/login.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });
      const result = await response.json();
      return result;
    } catch (error) {
      throw new Error("Error en los datos");
    }
  };
  