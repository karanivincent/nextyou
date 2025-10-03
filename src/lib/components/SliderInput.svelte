<script lang="ts">
	interface Props {
		label?: string;
		value: number;
		min?: number;
		max?: number;
		onChange: (value: number) => void;
	}

	let { label, value = 5, min = 1, max = 10, onChange }: Props = $props();

	function handleChange(event: Event) {
		const target = event.target as HTMLInputElement;
		onChange(Number(target.value));
	}
</script>

<div class="w-full flex flex-col items-center gap-6">
	<!-- Current Value Display -->
	<div class="text-5xl font-bold text-primary">{value}</div>

	<!-- Slider -->
	<div class="w-full relative">
		<input
			type="range"
			{min}
			{max}
			{value}
			oninput={handleChange}
			class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer
                   slider-thumb"
		/>

		<!-- Min/Max Labels -->
		<div class="flex justify-between mt-2 text-sm text-gray-500">
			<span>{min}</span>
			<span>{max}</span>
		</div>
	</div>

	{#if label}
		<div class="text-gray-600 text-sm">{label}</div>
	{/if}
</div>

<style>
	/* Custom slider thumb styling */
	input[type='range']::-webkit-slider-thumb {
		appearance: none;
		width: 24px;
		height: 24px;
		border-radius: 50%;
		background: #3b82f6;
		cursor: pointer;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	input[type='range']::-moz-range-thumb {
		width: 24px;
		height: 24px;
		border-radius: 50%;
		background: #3b82f6;
		cursor: pointer;
		border: none;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	/* Track styling */
	input[type='range']::-webkit-slider-runnable-track {
		height: 8px;
		border-radius: 4px;
		background: linear-gradient(
			to right,
			#3b82f6 0%,
			#3b82f6 calc((var(--value) - var(--min)) / (var(--max) - var(--min)) * 100%),
			#e5e7eb calc((var(--value) - var(--min)) / (var(--max) - var(--min)) * 100%),
			#e5e7eb 100%
		);
	}

	input[type='range']::-moz-range-track {
		height: 8px;
		border-radius: 4px;
		background: #e5e7eb;
	}

	input[type='range']::-moz-range-progress {
		height: 8px;
		border-radius: 4px;
		background: #3b82f6;
	}
</style>
