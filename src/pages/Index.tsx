import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { fetchSensorData } from "@/services/api";
import { MetricCard } from "@/components/MetricCard";
import { StatusIndicator } from "@/components/StatusIndicator";
import { FeatureCard } from "@/components/FeatureCard";
import {
  Activity,
  Thermometer,
  Zap,
  Droplets,
  ChevronDown,
  Cpu,
  Waves,
  Gauge,
  Shield,
  Smartphone,
  Cloud,
  Brain,
  Sparkles,
  Users,
  Github,
  Settings
} from "lucide-react";
import heroImage from "@/assets/kidney-wearable-hero.jpg";

const Index = () => {
  const { data: sensorData, isLoading, error } = useQuery({
    queryKey: ["sensorData"],
    queryFn: fetchSensorData,
    refetchInterval: 3000, // Poll every 3 seconds
    retry: false,
  });

  const scrollToDashboard = () => {
    document.getElementById("dashboard")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-background to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary)/0.1),transparent_50%)]" />

        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm text-primary font-medium">Biomedical Innovation</span>
              </div>

              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                Non-Invasive
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-medical-blue-light">
                  {" "}Kidney Health{" "}
                </span>
                Monitoring
              </h1>

              <p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
                Track kidney stress, hydration status, and sweat electrolytes in real-time with our advanced wearable biosensor technology.
              </p>

              <div className="flex flex-wrap gap-4">
                <Button
                  onClick={scrollToDashboard}
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/30"
                >
                  View Live Dashboard
                  <Activity className="ml-2 w-5 h-5" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-border hover:bg-card"
                >
                  <Github className="mr-2 w-5 h-5" />
                  Documentation
                </Button>
              </div>
            </div>

            <div className="relative animate-slide-up">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-medical-blue-light/20 rounded-3xl blur-3xl" />
              <img
                src={heroImage}
                alt="Kidney Health Wearable Device"
                className="relative rounded-3xl shadow-2xl border border-primary/20"
              />
            </div>
          </div>
        </div>

        <button
          onClick={scrollToDashboard}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-primary"
        >
          <ChevronDown className="w-8 h-8" />
        </button>
      </section>

      {/* Dashboard Section */}
      <section id="dashboard" className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl lg:text-5xl font-bold flex items-center justify-center gap-4">
              Live Sensor Dashboard
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Real-time biometric monitoring with temperature-compensated TDS analysis
            </p>
            <p className="text-sm text-muted-foreground">
              Updated: {new Date().toLocaleTimeString()}
            </p>
          </div>

          <div className="max-w-6xl mx-auto space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <MetricCard
                icon={<Thermometer className="w-6 h-6" />}
                label="Skin Temperature"
                value={sensorData?.tempC?.toString() || "--"}
                unit="°C"
                trend="stable"
              />
              <MetricCard
                icon={<Zap className="w-6 h-6" />}
                label="Raw Voltage"
                value={sensorData?.voltage?.toString() || "--"}
                unit="V"
                trend="up"
              />
              <MetricCard
                icon={<Droplets className="w-6 h-6" />}
                label="Corrected TDS"
                value={sensorData?.corrected?.toString() || "--"}
                unit="V"
                trend={sensorData?.corrected < 0.4 ? "down" : "up"}
              />
            </div>

            <StatusIndicator
              status={sensorData?.status || "Normal"}
              description="Higher conductivity suggests dehydration and possible kidney stress. This non-invasive measurement tracks sweat electrolyte concentration as an early warning indicator."
            />
            {error && (
              <div className="text-center text-destructive mt-4">
                Error connecting to backend. Is the server running?
              </div>
            )}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl lg:text-5xl font-bold">How It Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Advanced biosensing technology for continuous kidney health monitoring
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            <FeatureCard
              icon={<Waves className="w-12 h-12" />}
              title="Sweat Collection"
              description="Cotton wicking layer collects sweat through skin contact for continuous sampling"
            />
            <FeatureCard
              icon={<Activity className="w-12 h-12" />}
              title="Conductivity Sensing"
              description="TDS sensor measures electrical conductivity of sweat electrolytes"
            />
            <FeatureCard
              icon={<Thermometer className="w-12 h-12" />}
              title="Temperature Correction"
              description="DS18B20 sensor compensates for temperature variations in readings"
            />
            <FeatureCard
              icon={<Gauge className="w-12 h-12" />}
              title="Health Analysis"
              description="Algorithm calculates hydration and kidney load status instantly"
            />
          </div>
        </div>
      </section>

      {/* Why It Matters Section */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-4xl lg:text-5xl font-bold">Why It Matters</h2>
              <p className="text-xl text-muted-foreground">
                Early detection through non-invasive monitoring
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Kidney Function</h3>
                    <p className="text-muted-foreground">
                      Kidneys regulate electrolyte balance in the body. Changes in sweat conductivity can indicate early kidney stress.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Droplets className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Dehydration Detection</h3>
                    <p className="text-muted-foreground">
                      Early dehydration increases sweat salt concentration, providing a non-invasive early warning signal.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Activity className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Athletic Performance</h3>
                    <p className="text-muted-foreground">
                      Perfect for athletes to monitor hydration status and electrolyte balance during training and competition.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Healthcare Monitoring</h3>
                    <p className="text-muted-foreground">
                      Suitable for hospital monitoring, elderly care, and patients with kidney conditions requiring continuous tracking.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Components Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl lg:text-5xl font-bold">System Components</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Medical-grade hardware for accurate biosensing
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <FeatureCard
              icon={<Cpu className="w-12 h-12" />}
              title="ESP32 Board"
              description="Powerful microcontroller with Wi-Fi connectivity for real-time data processing and transmission"
            />
            <FeatureCard
              icon={<Waves className="w-12 h-12" />}
              title="TDS Sensor"
              description="Analog conductivity sensor for measuring dissolved solids in sweat samples"
            />
            <FeatureCard
              icon={<Thermometer className="w-12 h-12" />}
              title="DS18B20 Temperature"
              description="High-precision digital temperature sensor for accurate thermal compensation"
            />
            <FeatureCard
              icon={<Activity className="w-12 h-12" />}
              title="Electrode Patch"
              description="Medical-grade TENS pads for safe, comfortable skin contact"
            />
            <FeatureCard
              icon={<Droplets className="w-12 h-12" />}
              title="Wicking Layer"
              description="Cotton microfluidic layer for passive sweat collection"
            />
            <FeatureCard
              icon={<Zap className="w-12 h-12" />}
              title="Power System"
              description="USB rechargeable battery for continuous operation"
            />
          </div>
        </div>
      </section>

      {/* Data Interpretation Section */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-4xl lg:text-5xl font-bold">Data Interpretation</h2>
              <p className="text-xl text-muted-foreground">
                Understanding your kidney health readings
              </p>
            </div>

            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-4 px-4 text-foreground">Corrected Value</th>
                      <th className="text-left py-4 px-4 text-foreground">Interpretation</th>
                      <th className="text-left py-4 px-4 text-foreground">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border/50">
                      <td className="py-4 px-4 text-muted-foreground">&lt; 0.4 V</td>
                      <td className="py-4 px-4 text-muted-foreground">Normal hydration and kidney function</td>
                      <td className="py-4 px-4">
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-status-normal/10 text-status-normal text-sm">
                          <div className="w-2 h-2 rounded-full bg-status-normal" />
                          Normal
                        </span>
                      </td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-4 px-4 text-muted-foreground">0.4 – 0.8 V</td>
                      <td className="py-4 px-4 text-muted-foreground">Mild dehydration detected</td>
                      <td className="py-4 px-4">
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-status-warning/10 text-status-warning text-sm">
                          <div className="w-2 h-2 rounded-full bg-status-warning" />
                          Warning
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-4 px-4 text-muted-foreground">&gt; 0.8 V</td>
                      <td className="py-4 px-4 text-muted-foreground">High kidney stress indicated</td>
                      <td className="py-4 px-4">
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-status-danger/10 text-status-danger text-sm">
                          <div className="w-2 h-2 rounded-full bg-status-danger" />
                          Alert
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Future Improvements Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl lg:text-5xl font-bold">Future Roadmap</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Next-generation features in development
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <FeatureCard
              icon={<Brain className="w-12 h-12" />}
              title="Urea-Specific Sensing"
              description="Advanced enzymatic sensors for direct kidney function biomarker detection"
            />
            <FeatureCard
              icon={<Smartphone className="w-12 h-12" />}
              title="Mobile App"
              description="Bluetooth Low Energy connectivity with iOS and Android companion apps"
            />
            <FeatureCard
              icon={<Cloud className="w-12 h-12" />}
              title="Cloud Analytics"
              description="Long-term health tracking with AI-powered trend analysis and insights"
            />
            <FeatureCard
              icon={<Activity className="w-12 h-12" />}
              title="AI Prediction"
              description="Machine learning models for early kidney stress prediction and alerts"
            />
            <FeatureCard
              icon={<Waves className="w-12 h-12" />}
              title="Microfluidic Patches"
              description="Custom-designed patches for improved sweat collection efficiency"
            />
            <FeatureCard
              icon={<Shield className="w-12 h-12" />}
              title="Medical Certification"
              description="Clinical trials and regulatory approval for medical-grade deployment"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-12 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-primary to-medical-blue-light">
                Kidney Health Wearable
              </h3>
              <p className="text-sm text-muted-foreground">
                Biomedical Wearable Prototype – Academic Research Project
              </p>
            </div>
            <Button
              variant="outline"
              className="border-border hover:bg-card"
            >
              Contact Team
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
