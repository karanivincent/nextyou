// Form input types
export type AgeRange = 'young' | 'adult' | 'midage' | 'older';
export type Gender = 'man' | 'woman' | 'divers';
export type TrainingStyle = 'cardio' | 'strength' | 'hybrid';
export type Intensity = 'light' | 'moderate' | 'intense';
export type NutritionGoal = 'loss' | 'maint' | 'gain';

// Form data structure
export interface FormData {
	age: AgeRange | null;
	gender: Gender | null;
	frequency: number | null; // 1-7
	timeframe: number | null; // target weeks
	style: TrainingStyle | null;
	intensity: Intensity | null;
	nutrition: NutritionGoal | null;
	sleep: number; // 1-10
	stress: number; // 1-10
	photo: string | null; // base64
}

// API request/response types
export interface GenerateRequest {
	age: AgeRange;
	gender: Gender;
	frequency: number;
	timeframe: number;
	style: TrainingStyle;
	intensity: Intensity;
	nutrition: NutritionGoal;
	sleep: number;
	stress: number;
	photo: string;
}

export interface GenerateResponse {
	generatedImageUrl?: string;
	generatedImageBase64?: string;
	error?: string;
}
