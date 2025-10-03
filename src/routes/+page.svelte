<script lang="ts">
	import { goto } from '$app/navigation';
	import StepLayout from '$lib/components/StepLayout.svelte';
	import SelectionButton from '$lib/components/SelectionButton.svelte';
	import SliderInput from '$lib/components/SliderInput.svelte';
	import ImageUpload from '$lib/components/ImageUpload.svelte';
	import { formData, updateField } from '$lib/stores/formData';
	import type { AgeRange, Gender, TrainingStyle, Intensity, NutritionGoal } from '$lib/types';

	let currentStep = $state(1);
	const totalSteps = 11;

	let data = $state($formData);
	let isSubmitting = $state(false);
	let submitError = $state<string | null>(null);

	// Subscribe to store changes
	$effect(() => {
		data = $formData;
	});

	// Auto-submit when reaching step 11
	$effect(() => {
		if (currentStep === 11 && !isSubmitting && !submitError) {
			handleSubmit();
		}
	});

	async function handleSubmit() {
		isSubmitting = true;
		submitError = null;

		try {
			const response = await fetch('/api/generate', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					age: data.age,
					gender: data.gender,
					frequency: data.frequency,
					timeframe: data.timeframe,
					style: data.style,
					intensity: data.intensity,
					nutrition: data.nutrition,
					sleep: data.sleep,
					stress: data.stress,
					photo: data.photo
				})
			});

			const result = await response.json();

			if (!response.ok) {
				throw new Error(result.error || 'Failed to generate transformation');
			}

			// Store the result and navigate
			if (typeof window !== 'undefined') {
				sessionStorage.setItem('generatedImage', result.generatedImageUrl || result.generatedImageBase64);
			}

			goto('/results');
		} catch (error) {
			submitError = error instanceof Error ? error.message : 'Something went wrong';
			isSubmitting = false;
		}
	}

	function handleNext() {
		if (currentStep < totalSteps) {
			currentStep++;
		} else {
			// Will be handled by auto-submit in $effect
		}
	}

	function isStepValid(step: number): boolean {
		switch (step) {
			case 1:
				return data.age !== null;
			case 2:
				return data.gender !== null;
			case 3:
				return data.frequency !== null;
			case 4:
				return data.timeframe !== null;
			case 5:
				return data.style !== null;
			case 6:
				return data.intensity !== null;
			case 7:
				return data.nutrition !== null;
			case 8:
				return data.sleep >= 1 && data.sleep <= 10;
			case 9:
				return data.stress >= 1 && data.stress <= 10;
			case 10:
				return data.photo !== null;
			default:
				return true;
		}
	}
</script>

{#if currentStep === 1}
	<!-- Step 1: Age -->
	<StepLayout
		{currentStep}
		{totalSteps}
		title="Age"
		subtitle="How old are you? Age helps us personalize your fitness projection."
		onNext={handleNext}
		nextDisabled={!isStepValid(1)}
	>
		<div class="flex flex-col gap-3">
			<SelectionButton
				label="18 - 25"
				value="young"
				selected={data.age === 'young'}
				onClick={(val) => updateField('age', val as AgeRange)}
			/>
			<SelectionButton
				label="26 - 40"
				value="adult"
				selected={data.age === 'adult'}
				onClick={(val) => updateField('age', val as AgeRange)}
			/>
			<SelectionButton
				label="41 - 55"
				value="midage"
				selected={data.age === 'midage'}
				onClick={(val) => updateField('age', val as AgeRange)}
			/>
			<SelectionButton
				label="56+"
				value="older"
				selected={data.age === 'older'}
				onClick={(val) => updateField('age', val as AgeRange)}
			/>
		</div>
	</StepLayout>
{:else if currentStep === 2}
	<!-- Step 2: Gender -->
	<StepLayout
		{currentStep}
		{totalSteps}
		title="Gender"
		subtitle="We use this to understand your body composition and muscle development potential."
		onNext={handleNext}
		nextDisabled={!isStepValid(2)}
	>
		<div class="flex flex-col gap-3">
			<SelectionButton
				label="Male"
				value="man"
				selected={data.gender === 'man'}
				onClick={(val) => updateField('gender', val as Gender)}
			/>
			<SelectionButton
				label="Female"
				value="woman"
				selected={data.gender === 'woman'}
				onClick={(val) => updateField('gender', val as Gender)}
			/>
			<SelectionButton
				label="Other"
				value="divers"
				selected={data.gender === 'divers'}
				onClick={(val) => updateField('gender', val as Gender)}
			/>
		</div>
	</StepLayout>
{:else if currentStep === 3}
	<!-- Step 3: Training Frequency -->
	<StepLayout
		{currentStep}
		{totalSteps}
		title="Training Frequency"
		subtitle="How many times per week do you plan to work out?"
		onNext={handleNext}
		nextDisabled={!isStepValid(3)}
	>
		<div class="flex flex-col gap-3">
			<SelectionButton
				label="1 - 2"
				value="1"
				selected={data.frequency === 1}
				onClick={() => updateField('frequency', 1)}
			/>
			<SelectionButton
				label="3"
				value="3"
				selected={data.frequency === 3}
				onClick={() => updateField('frequency', 3)}
			/>
			<SelectionButton
				label="4 - 5"
				value="4"
				selected={data.frequency === 4}
				onClick={() => updateField('frequency', 4)}
			/>
			<SelectionButton
				label="6+"
				value="6"
				selected={data.frequency === 6}
				onClick={() => updateField('frequency', 6)}
			/>
		</div>
	</StepLayout>
{:else if currentStep === 4}
	<!-- Step 4: Set your timeframe -->
	<StepLayout
		{currentStep}
		{totalSteps}
		title="Set your timeframe"
		subtitle="How many weeks until you want to see results?"
		onNext={handleNext}
		nextDisabled={!isStepValid(4)}
	>
		<div class="flex flex-col gap-3">
			<SelectionButton
				label="4 weeks"
				value="4"
				selected={data.timeframe === 4}
				onClick={() => updateField('timeframe', 4)}
			/>
			<SelectionButton
				label="8 weeks"
				value="8"
				selected={data.timeframe === 8}
				onClick={() => updateField('timeframe', 8)}
			/>
			<SelectionButton
				label="12 weeks"
				value="12"
				selected={data.timeframe === 12}
				onClick={() => updateField('timeframe', 12)}
			/>
			<SelectionButton
				label="16 weeks"
				value="16"
				selected={data.timeframe === 16}
				onClick={() => updateField('timeframe', 16)}
			/>
		</div>
	</StepLayout>
{:else if currentStep === 5}
	<!-- Step 5: Training Style -->
	<StepLayout
		{currentStep}
		{totalSteps}
		title="Training style"
		subtitle="What type of training do you prefer?"
		onNext={handleNext}
		nextDisabled={!isStepValid(5)}
	>
		<div class="flex flex-col gap-3">
			<SelectionButton
				label="Cardio"
				value="cardio"
				selected={data.style === 'cardio'}
				onClick={(val) => updateField('style', val as TrainingStyle)}
			/>
			<SelectionButton
				label="Strength"
				value="strength"
				selected={data.style === 'strength'}
				onClick={(val) => updateField('style', val as TrainingStyle)}
			/>
			<SelectionButton
				label="Hybrid"
				value="hybrid"
				selected={data.style === 'hybrid'}
				onClick={(val) => updateField('style', val as TrainingStyle)}
			/>
		</div>
	</StepLayout>
{:else if currentStep === 6}
	<!-- Step 6: Workout Intensity -->
	<StepLayout
		{currentStep}
		{totalSteps}
		title="Workout Intensity"
		subtitle="How hard do you plan to push yourself?"
		onNext={handleNext}
		nextDisabled={!isStepValid(6)}
	>
		<div class="flex flex-col gap-3">
			<SelectionButton
				label="Light"
				value="light"
				selected={data.intensity === 'light'}
				onClick={(val) => updateField('intensity', val as Intensity)}
			/>
			<SelectionButton
				label="Moderate"
				value="moderate"
				selected={data.intensity === 'moderate'}
				onClick={(val) => updateField('intensity', val as Intensity)}
			/>
			<SelectionButton
				label="Intense"
				value="intense"
				selected={data.intensity === 'intense'}
				onClick={(val) => updateField('intensity', val as Intensity)}
			/>
		</div>
	</StepLayout>
{:else if currentStep === 7}
	<!-- Step 7: Nutrition Goal -->
	<StepLayout
		{currentStep}
		{totalSteps}
		title="Nutrition goal"
		subtitle="What's your primary nutrition objective?"
		onNext={handleNext}
		nextDisabled={!isStepValid(7)}
	>
		<div class="flex flex-col gap-3">
			<SelectionButton
				label="Fat loss"
				value="loss"
				selected={data.nutrition === 'loss'}
				onClick={(val) => updateField('nutrition', val as NutritionGoal)}
			/>
			<SelectionButton
				label="Maintenance"
				value="maint"
				selected={data.nutrition === 'maint'}
				onClick={(val) => updateField('nutrition', val as NutritionGoal)}
			/>
			<SelectionButton
				label="Muscle gain"
				value="gain"
				selected={data.nutrition === 'gain'}
				onClick={(val) => updateField('nutrition', val as NutritionGoal)}
			/>
		</div>
	</StepLayout>
{:else if currentStep === 8}
	<!-- Step 8: Sleep Quality -->
	<StepLayout
		{currentStep}
		{totalSteps}
		title="Sleep quality"
		subtitle="How would you rate your average sleep quality?"
		onNext={handleNext}
		nextDisabled={!isStepValid(8)}
	>
		<SliderInput value={data.sleep} min={1} max={10} onChange={(val) => updateField('sleep', val)} />
	</StepLayout>
{:else if currentStep === 9}
	<!-- Step 9: Stress Level -->
	<StepLayout
		{currentStep}
		{totalSteps}
		title="Stress level"
		subtitle="How stressed do you feel on a daily basis?"
		onNext={handleNext}
		nextDisabled={!isStepValid(9)}
	>
		<SliderInput
			value={data.stress}
			min={1}
			max={10}
			onChange={(val) => updateField('stress', val)}
		/>
	</StepLayout>
{:else if currentStep === 10}
	<!-- Step 10: Upload Photo -->
	<StepLayout
		{currentStep}
		{totalSteps}
		title="Upload photo"
		subtitle="Upload a current full-body photo for the best results."
		onNext={handleNext}
		nextDisabled={!isStepValid(10)}
	>
		<ImageUpload onImageSelect={(base64) => updateField('photo', base64)} />
	</StepLayout>
{:else if currentStep === 11}
	<!-- Step 11: Processing -->
	<StepLayout
		{currentStep}
		{totalSteps}
		title={submitError ? 'Error' : 'Generating your transformation...'}
		subtitle={submitError ? submitError : 'This may take a few moments. Please wait.'}
		onNext={() => submitError ? handleSubmit() : handleNext()}
		loading={isSubmitting}
		nextDisabled={isSubmitting}
		nextLabel={submitError ? 'Retry' : 'View Results'}
	>
		<div class="flex flex-col items-center justify-center gap-6 py-12">
			{#if submitError}
				<!-- Error State -->
				<svg
					class="h-20 w-20 text-red-500"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
					></path>
				</svg>
				<p class="text-red-600 text-center font-medium">{submitError}</p>
			{:else}
				<!-- Loading State -->
				<svg
					class="animate-spin h-20 w-20 text-primary"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
				>
					<circle
						class="opacity-25"
						cx="12"
						cy="12"
						r="10"
						stroke="currentColor"
						stroke-width="4"
					></circle>
					<path
						class="opacity-75"
						fill="currentColor"
						d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
					></path>
				</svg>
				<p class="text-gray-600 text-center">Creating your AI-powered fitness projection...</p>
			{/if}
		</div>
	</StepLayout>
{/if}
