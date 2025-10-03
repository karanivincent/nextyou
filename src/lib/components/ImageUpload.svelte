<script lang="ts">
	interface Props {
		onImageSelect: (base64: string) => void;
		maxSizeMB?: number;
		acceptedFormats?: string[];
	}

	let {
		onImageSelect,
		maxSizeMB = 5,
		acceptedFormats = ['image/jpeg', 'image/png', 'image/webp']
	}: Props = $props();

	let preview = $state<string | null>(null);
	let error = $state<string | null>(null);
	let fileInput: HTMLInputElement;

	function handleFileSelect(event: Event) {
		const target = event.target as HTMLInputElement;
		const file = target.files?.[0];

		if (!file) return;

		// Validate file type
		if (!acceptedFormats.includes(file.type)) {
			error = 'Please upload a JPG, PNG, or WebP image';
			return;
		}

		// Validate file size
		if (file.size > maxSizeMB * 1024 * 1024) {
			error = `Image must be less than ${maxSizeMB}MB`;
			return;
		}

		error = null;

		// Convert to base64
		const reader = new FileReader();
		reader.onload = (e) => {
			const base64 = e.target?.result as string;
			preview = base64;
			onImageSelect(base64);
		};
		reader.readAsDataURL(file);
	}

	function triggerFileInput() {
		fileInput?.click();
	}
</script>

<div class="w-full">
	<!-- Hidden file input -->
	<input
		bind:this={fileInput}
		type="file"
		accept="image/*"
		capture="environment"
		onchange={handleFileSelect}
		class="hidden"
	/>

	<!-- Upload Area -->
	<button
		type="button"
		onclick={triggerFileInput}
		class="w-full aspect-square rounded-2xl border-2 border-dashed border-gray-300
               hover:border-primary transition-colors duration-200
               flex flex-col items-center justify-center gap-4
               {preview ? 'p-0' : 'p-8'}"
	>
		{#if preview}
			<!-- Image Preview -->
			<img src={preview} alt="Preview" class="w-full h-full object-cover rounded-2xl" />
		{:else}
			<!-- Upload Icon -->
			<svg
				class="w-16 h-16 text-gray-400"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
				></path>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
				></path>
			</svg>

			<!-- Upload Text -->
			<div class="text-center">
				<p class="text-gray-600 font-medium">Tap to upload photo</p>
				<p class="text-gray-400 text-sm mt-1">JPG, PNG or WebP (max {maxSizeMB}MB)</p>
			</div>
		{/if}
	</button>

	<!-- Error Message -->
	{#if error}
		<p class="text-red-500 text-sm mt-2 text-center">{error}</p>
	{/if}

	<!-- Change Photo Button (when preview exists) -->
	{#if preview}
		<button
			type="button"
			onclick={triggerFileInput}
			class="w-full mt-4 py-2 text-primary font-medium text-sm"
		>
			Change Photo
		</button>
	{/if}
</div>
