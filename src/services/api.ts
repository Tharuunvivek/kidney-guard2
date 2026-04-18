export interface SensorData {
  tempC: number;
  voltage: number;
  corrected: number;
  status: "Normal" | "Mild dehydration" | "High kidney strain";
}

export const fetchSensorData = async (): Promise<SensorData> => {
  // Use timestamp to prevent caching
  const url = `http://localhost:5000/api/data?t=${Date.now()}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching sensor data:", error);
    throw error;
  }
};
