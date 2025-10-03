import { writable } from 'svelte/store';
import type { FormData } from '$lib/types';

// Initial state
const initialFormData: FormData = {
	age: null,
	gender: null,
	frequency: null,
	timeframe: 1, // Default to 1 month
	style: null,
	intensity: null,
	nutrition: null,
	sleep: 5,
	stress: 5,
	photo: null
};

// Create writable store
export const formData = writable<FormData>(initialFormData);

// Helper functions
export function updateField<K extends keyof FormData>(field: K, value: FormData[K]) {
	formData.update((data) => ({
		...data,
		[field]: value
	}));
}

export function resetForm() {
	formData.set(initialFormData);
}

export function isFormValid(data: FormData): boolean {
	return (
		data.age !== null &&
		data.gender !== null &&
		data.frequency !== null &&
		data.timeframe !== null &&
		data.style !== null &&
		data.intensity !== null &&
		data.nutrition !== null &&
		data.sleep >= 1 &&
		data.sleep <= 10 &&
		data.stress >= 1 &&
		data.stress <= 10 &&
		data.photo !== null
	);
}
