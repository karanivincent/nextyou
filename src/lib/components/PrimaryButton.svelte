<script lang="ts">
	interface Props {
		label: string;
		onClick?: () => void;
		disabled?: boolean;
		loading?: boolean;
		type?: 'button' | 'submit';
	}

	let { label, onClick, disabled = false, loading = false, type = 'button' }: Props = $props();

	function handleClick() {
		if (!disabled && !loading && onClick) {
			onClick();
		}
	}
</script>

<button
	{type}
	onclick={handleClick}
	disabled={disabled || loading}
	class="w-full min-h-14 bg-primary text-white font-semibold text-lg rounded-full py-4 px-8
         disabled:opacity-50 disabled:cursor-not-allowed
         active:scale-95 transition-transform duration-100
         flex items-center justify-center gap-2"
>
	{#if loading}
		<svg
			class="animate-spin h-5 w-5 text-white"
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
	{/if}
	<span>{label}</span>
</button>
