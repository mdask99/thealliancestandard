<script>
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { perspective, togglePerspective } from '$lib/perspective.svelte.js';

	let { children } = $props();

	$effect(() => {
		document.documentElement.dataset.perspective = perspective.mode;
	});

	const agent = $derived(perspective.mode === 'agent');
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>The Alliance Standard</title>
</svelte:head>

<div
	class={agent
		? 'min-h-dvh bg-paper font-mono text-ink antialiased transition-colors duration-300'
		: 'min-h-dvh bg-navy font-sans text-slate-200 antialiased transition-colors duration-300'}
>
	<header
		class={agent
			? 'sticky top-0 z-20 border-b border-rule/80 bg-paper/90 backdrop-blur-md'
			: 'sticky top-0 z-20 border-b border-gridline bg-navy/90 backdrop-blur-md'}
	>
		<nav
			class="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-4 md:px-8"
			aria-label="Primary"
		>
			<a
				href="/"
				class={agent
					? 'text-[11px] font-medium tracking-[0.16em] text-ink uppercase sm:text-sm'
					: 'text-[11px] font-medium tracking-[0.22em] text-signal uppercase sm:text-sm'}
			>
				Alliance Standard
			</a>

			<button
				type="button"
				role="switch"
				aria-checked={agent}
				aria-label="Toggle perspective"
				onclick={togglePerspective}
				class="flex shrink-0 items-center gap-2 text-[10px] tracking-widest uppercase select-none sm:gap-3 sm:text-[11px]"
			>
				<span class={agent ? 'text-ink-muted' : 'text-signal'}>Human</span>
				<span
					class={agent
						? 'relative h-6 w-11 rounded-full border border-rule bg-white'
						: 'relative h-6 w-11 rounded-full border border-signal-dim bg-scan'}
				>
					<span
						class={agent
							? 'absolute top-0.5 left-0.5 h-5 w-5 translate-x-5 rounded-full bg-navy'
							: 'absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-signal'}
					></span>
				</span>
				<span class={agent ? 'text-ink' : 'text-slate-500'}>Agent</span>
			</button>
		</nav>
	</header>

	<main class="mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-16">
		{@render children()}
	</main>
</div>
