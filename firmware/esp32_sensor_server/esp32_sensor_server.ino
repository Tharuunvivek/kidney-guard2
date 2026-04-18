#include <WiFi.h>
#include <WebServer.h>

// ---------------------------------------------------------------- //
//                       CONFIGURATION                              //
// ---------------------------------------------------------------- //
// REPLACE WITH YOUR WIFI CREDENTIALS
const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";

// ---------------------------------------------------------------- //

WebServer server(80);

// Simulated Sensor Variables
float tempC = 0.0;
float voltage = 0.0;
float corrected = 0.0;
String statusMsg = "Normal";

void setup() {
  Serial.begin(115200);
  
  // Connect to Wi-Fi
  Serial.print("Connecting to ");
  Serial.println(ssid);
  WiFi.begin(ssid, password);
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.print(".");
  }
  
  Serial.println("");
  Serial.println("WiFi connected.");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());

  // Define routes
  server.on("/data", HTTP_GET, handleData);
  server.onNotFound(handleNotFound);

  // Start server
  server.begin();
  Serial.println("HTTP server started");
}

void loop() {
  server.handleClient();
  
  // Update sensor readings (Simulated for now - replace with real sensor logic)
  updateSensorReadings();
  delay(100); // Small delay
}

void handleData() {
  // Create JSON string manually to avoid external dependencies
  String json = "{";
  json += "\"tempC\":" + String(tempC, 2) + ",";
  json += "\"voltage\":" + String(voltage, 4) + ",";
  json += "\"corrected\":" + String(corrected, 4) + ",";
  json += "\"status\":\"" + statusMsg + "\"";
  json += "}";

  // Add CORS headers so the web app can access this from a different origin (e.g., localhost)
  server.sendHeader("Access-Control-Allow-Origin", "*");
  server.sendHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  server.sendHeader("Access-Control-Allow-Headers", "*");
  
  server.send(200, "application/json", json);
}

void handleNotFound() {
  if (server.method() == HTTP_OPTIONS) {
    server.sendHeader("Access-Control-Allow-Origin", "*");
    server.send(204);
  } else {
    server.send(404, "text/plain", "Not found");
  }
}

void updateSensorReadings() {
  // --- REPLACE THIS SECTION WITH REAL SENSOR READING CODE ---
  
  // Simulating fluctuating values
  tempC = 32.0 + (random(-10, 10) / 10.0);
  voltage = 0.5 + (random(-5, 5) / 100.0);
  
  // Calculate corrected value (Mock logic from frontend)
  corrected = voltage * (1.0 - (tempC - 32.0) * 0.02);
  if (corrected < 0) corrected = 0;

  // Determine status
  if (corrected < 0.4) {
    statusMsg = "Normal";
  } else if (corrected <= 0.8) {
    statusMsg = "Mild dehydration";
  } else {
    statusMsg = "High kidney strain";
  }
  
  // Log to Serial for debugging
  Serial.print("Temp: "); Serial.print(tempC);
  Serial.print(" | Voltage: "); Serial.print(voltage);
  Serial.print(" | Status: "); Serial.println(statusMsg);
}
