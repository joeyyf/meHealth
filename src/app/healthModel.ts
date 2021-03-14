export interface HealthModel {
  date: Date;
  timestamp: number;
  deviceId: number;
  userId: number;
  rawIntensity: number;
  steps: number;
  rawKind: number;
  heartRate: number;
}
