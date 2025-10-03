<script lang="ts">
	import PrimaryButton from './PrimaryButton.svelte';

	interface Props {
		currentStep: number;
		totalSteps: number;
		title: string;
		subtitle?: string;
		onNext: () => void;
		nextDisabled?: boolean;
		nextLabel?: string;
		loading?: boolean;
		children?: any;
	}

	let {
		currentStep,
		totalSteps,
		title,
		subtitle,
		onNext,
		nextDisabled = false,
		nextLabel = 'Next',
		loading = false,
		children
	}: Props = $props();

	const progressPercentage = $derived((currentStep / totalSteps) * 100);
</script>

<div class="min-h-screen flex flex-col bg-white">
	<!-- Progress Bar -->
	<div class="w-full bg-gray-100 h-1">
		<div class="bg-primary h-full transition-all duration-300" style="width: {progressPercentage}%">
		</div>
	</div>

	<!-- Progress Text -->
	<div class="px-6 py-3">
		<p class="text-sm text-gray-500 text-center">{currentStep} / {totalSteps}</p>
	</div>

	<!-- Content Area -->
	<div class="flex-1 flex flex-col px-6 py-4">
		<!-- Header -->
		<div class="mb-8">
			<h1 class="text-2xl font-bold text-gray-900 mb-2">{title}</h1>
			{#if subtitle}
				<p class="text-gray-600 text-base">{subtitle}</p>
			{/if}
		</div>

		<!-- Content Slot -->
		<div class="flex-1 flex flex-col justify-center">
			{@render children?.()}
		</div>
	</div>

	<!-- Bottom Button (Fixed) -->
	<div class="p-6 pb-8">
		<PrimaryButton label={nextLabel} onClick={onNext} disabled={nextDisabled} {loading} />
	</div>
</div>
