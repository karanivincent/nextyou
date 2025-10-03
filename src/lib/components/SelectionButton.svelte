<script lang="ts">
	interface Props {
		label: string;
		value: string;
		selected: boolean;
		onClick: (value: string) => void;
	}

	let { label, value, selected, onClick }: Props = $props();

	function handleClick() {
		onClick(value);
	}
</script>

<button
	type="button"
	onclick={handleClick}
	class="w-full min-h-14 py-4 px-6 rounded-2xl font-medium text-base transition-all duration-200
         {selected
		? 'bg-primary text-white'
		: 'bg-white text-gray-700 border-2 border-gray-300 hover:border-primary'}"
>
	{label}
</button>
