<script lang="ts">
	import { formData } from '$lib/stores/formData';
	import PrimaryButton from '$lib/components/PrimaryButton.svelte';
	import { goto } from '$app/navigation';

	let data = $state($formData);

	function handleTryAgain() {
		goto('/');
	}
</script>

<div class="min-h-screen bg-white p-6">
	<div class="max-w-2xl mx-auto">
		<!-- Header -->
		<div class="text-center mb-8">
			<h1 class="text-3xl font-bold text-gray-900 mb-2">Your Transformation</h1>
			<p class="text-gray-600">Here's your AI-generated fitness projection</p>
		</div>

		<!-- Placeholder for Results -->
		<div class="bg-gray-50 rounded-2xl p-8 mb-6">
			<div class="aspect-video bg-gray-200 rounded-xl flex items-center justify-center mb-4">
				<p class="text-gray-500">Generated image will appear here</p>
			</div>

			<!-- User Data Summary -->
			<div class="space-y-2 text-sm text-gray-600">
				<p><strong>Age:</strong> {data.age || 'N/A'}</p>
				<p><strong>Gender:</strong> {data.gender || 'N/A'}</p>
				<p><strong>Frequency:</strong> {data.frequency || 'N/A'}x per week</p>
				<p><strong>Timeframe:</strong> {data.timeframe || 'N/A'} weeks</p>
				<p><strong>Style:</strong> {data.style || 'N/A'}</p>
				<p><strong>Intensity:</strong> {data.intensity || 'N/A'}</p>
				<p><strong>Nutrition:</strong> {data.nutrition || 'N/A'}</p>
				<p><strong>Sleep:</strong> {data.sleep}/10</p>
				<p><strong>Stress:</strong> {data.stress}/10</p>
			</div>
		</div>

		<!-- Action Buttons -->
		<div class="space-y-3">
			<PrimaryButton label="Try Again" onClick={handleTryAgain} />
		</div>
	</div>
</div>
