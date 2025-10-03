<script lang="ts">
	import { onMount } from 'svelte';
	import { formData } from '$lib/stores/formData';
	import PrimaryButton from '$lib/components/PrimaryButton.svelte';
	import { goto } from '$app/navigation';

	let data = $state($formData);
	let generatedImage = $state<string | null>(null);

	onMount(() => {
		// Get generated image from sessionStorage
		if (typeof window !== 'undefined') {
			const storedImage = sessionStorage.getItem('generatedImage');
			if (storedImage) {
				generatedImage = storedImage;
			}
		}
	});

	function handleTryAgain() {
		if (typeof window !== 'undefined') {
			sessionStorage.removeItem('generatedImage');
		}
		goto('/');
	}

	function handleDownload() {
		if (!generatedImage) return;

		// Create download link
		const link = document.createElement('a');
		link.href = generatedImage;
		link.download = 'nextyou-transformation.png';
		link.click();
	}
</script>

<div class="min-h-screen bg-white p-6">
	<div class="max-w-2xl mx-auto">
		<!-- Header -->
		<div class="text-center mb-8">
			<h1 class="text-3xl font-bold text-gray-900 mb-2">Your Transformation</h1>
			<p class="text-gray-600">
				{#if generatedImage}
					Here's your AI-generated fitness projection
				{:else}
					No transformation generated yet
				{/if}
			</p>
		</div>

		{#if generatedImage}
			<!-- Generated Image -->
			<div class="bg-gray-50 rounded-2xl p-4 mb-6">
				<div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
					<!-- Original Photo -->
					{#if data.photo}
						<div>
							<p class="text-sm font-medium text-gray-700 mb-2">Before</p>
							<img
								src={data.photo}
								alt="Before"
								class="w-full rounded-xl object-cover aspect-square"
							/>
						</div>
					{/if}

					<!-- Generated Photo -->
					<div>
						<p class="text-sm font-medium text-gray-700 mb-2">
							After {data.timeframe} {data.timeframe === 1 ? 'month' : 'months'}
						</p>
						<img
							src={generatedImage}
							alt="After"
							class="w-full rounded-xl object-cover aspect-square"
						/>
					</div>
				</div>

				<!-- User Data Summary -->
				<div class="bg-white rounded-xl p-4 space-y-2 text-sm text-gray-600">
					<p><strong>Training:</strong> {data.frequency}x/week, {data.style}, {data.intensity}</p>
					<p><strong>Nutrition:</strong> {data.nutrition}</p>
					<p><strong>Recovery:</strong> Sleep {data.sleep}/10, Stress {data.stress}/10</p>
				</div>
			</div>

			<!-- Action Buttons -->
			<div class="space-y-3">
				<PrimaryButton label="Download Image" onClick={handleDownload} />
				<button onclick={handleTryAgain} class="w-full py-3 text-primary font-medium text-lg">
					Try Again
				</button>
			</div>
		{:else}
			<!-- No Image State -->
			<div class="bg-gray-50 rounded-2xl p-12 mb-6 text-center">
				<svg
					class="w-20 h-20 mx-auto text-gray-400 mb-4"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
					></path>
				</svg>
				<p class="text-gray-600 mb-4">No transformation available</p>
			</div>

			<PrimaryButton label="Start New Transformation" onClick={handleTryAgain} />
		{/if}
	</div>
</div>
