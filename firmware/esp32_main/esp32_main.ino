#include <DallasTemperature.h>
#include <HTTPClient.h>
#include <OneWire.h>
#include <WiFi.h>


// ==========================================
// CONFIGURATION - EDIT THESE
// ==========================================
const char *ssid = "Tharuun.V.";
const char *password = "Tharuun123";
// REPLACE WITH YOUR PC'S IP ADDRESS (e.g., 192.168.1.5)
const char *serverUrl = "http://10.224.92.218:5000/api/data";
// ==========================================

#define TDS_PIN 34
#define ONE_WIRE_BUS 4
#define NUM_SAMPLES 16

OneWire oneWire(ONE_WIRE_BUS);
DallasTemperature sensors(&oneWire);

long readAvgADC(int pin) {
  long sum = 0;
  for (int i = 0; i < NUM_SAMPLES; ++i) {
    sum += analogRead(pin);
    delay(10);
  }
  return sum / NUM_SAMPLES;
}

void setup() {
  Serial.begin(115200);

  // Start Sensors
  sensors.begin();
  pinMode(TDS_PIN, INPUT);

  // Connect to WiFi
  WiFi.begin(ssid, password);
  Serial.println("Connecting to WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Connected to WiFi network with IP Address: ");
  Serial.println(WiFi.localIP());

  Serial.println("Combined TDS + Temperature System Started");
}

void loop() {
  // 1. Read Temperature
  sensors.requestTemperatures();
  float tempC = sensors.getTempCByIndex(0);
  if (tempC == -127.00)
    tempC = 25.0; // Fallback

  // 2. Read TDS Voltage (User's Logic)
  long avg = readAvgADC(TDS_PIN);
  float voltage = (avg / 4095.0) * 3.3;

  // 3. Apply Temperature Compensation
  float compensation = 1.0 + 0.02 * (tempC - 25.0);
  float correctedVoltage = voltage / compensation;

  // 4. Convert to TDS (ppm)
  float tds_ppm = correctedVoltage * 500.0;

  // 5. Status Logic (Mapped to Frontend Requirements)
  String statusForWeb;
  String statusForSerial;

  if (tds_ppm < 200) {
    statusForWeb = "Normal";
    statusForSerial = "NORMAL ✅";
  } else if (tds_ppm < 400) {
    statusForWeb = "Mild dehydration";
    statusForSerial = "ELEVATED ⚠️";
  } else {
    statusForWeb = "High kidney strain";
    statusForSerial = "HIGH 🚨";
  }

  // 6. Print to Serial (User's Format)
  Serial.print("Temp: ");
  Serial.print(tempC);
  Serial.print(" °C  |  Raw V: ");
  Serial.print(voltage, 4);
  Serial.print(" V  |  Corrected V: ");
  Serial.print(correctedVoltage, 4);
  Serial.print(" V  |  TDS: ");
  Serial.print(tds_ppm, 1);
  Serial.print(" ppm  |  STATUS: ");
  Serial.println(statusForSerial);

  // 7. Send to Backend
  if (WiFi.status() == WL_CONNECTED) {
    WiFiClient client;
    HTTPClient http;
    
    // IMPORTANT: Use modern HTTPClient begin with WiFiClient to prevent -1 connection refused errors
    http.setTimeout(5000);
    http.begin(client, serverUrl);
    http.addHeader("Content-Type", "application/json");
c:\Users\THARUUN.V\Desktop\kidney-guard-main\kidney-guard-main
    // Create JSON string
    // We send 'correctedVoltage' as 'corrected' because the frontend expects
    // Volts.
    String jsonPayload = "{";
    jsonPayload += "\"tempC\": " + String(tempC) + ",";
    jsonPayload += "\"voltage\": " + String(voltage) + ",";
    jsonPayload += "\"corrected\": " + String(correctedVoltage) + ",";
    jsonPayload += "\"status\": \"" + statusForWeb + "\"";
    jsonPayload += "}";

    // Uncomment to debug JSON payload
    Serial.println("Sending: " + jsonPayload);

    int httpResponseCode = http.POST(jsonPayload);

    if (httpResponseCode > 0) {
      Serial.print("Success! Backend received data. Code: ");
      Serial.println(httpResponseCode);
    } else {
      Serial.print("Error on sending POST: ");
      Serial.print(httpResponseCode);
      Serial.print(" -> ");
      Serial.println(http.errorToString(httpResponseCode).c_str());
    }
    http.end();
  } else {
    Serial.println("WiFi Disconnected");
  }

  delay(3000);
}
