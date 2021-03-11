export interface HealthModel {
  timestamp: number;
  date: Date;
  deviceId: number;
  userId: number;
  rawIntensity: number;
  steps: number;
  rawKind: number;
  heartRate: number;
}
