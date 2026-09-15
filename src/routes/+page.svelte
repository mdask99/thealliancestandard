<script>
	import OperatingContrast from '$lib/components/OperatingContrast.svelte';
	import { pact } from '$lib/pact.js';
	import { perspective } from '$lib/perspective.svelte.js';

	const curlCommand = 'curl thealliancestandard.com/init';
	let copied = $state(false);
	const agent = $derived(perspective.mode === 'agent');

	async function copyCurl() {
		try {
			await navigator.clipboard.writeText(curlCommand);
			copied = true;
			setTimeout(() => {
				copied = false;
			}, 1600);
		} catch {
			copied = false;
		}
	}
</script>

<section class="max-w-3xl">
	<p
		class={agent
			? 'mb-5 text-xs tracking-[0.32em] text-ink-muted uppercase'
			: 'mb-5 text-xs tracking-[0.22em] text-signal-dim uppercase'}
	>
		{agent ? 'system.audience = human + agent' : 'A pact for people and machines'}
	</p>
	<h1
		class={agent
			? 'font-mono text-3xl leading-snug font-normal tracking-tight text-ink md:text-5xl'
			: 'font-serif text-4xl leading-[1.12] font-normal tracking-tight text-slate-100 md:text-6xl'}
	>
		The Pact Between Intent and Velocity.
	</h1>
	<p
		class={agent
			? 'mt-6 max-w-xl text-sm leading-relaxed text-ink-muted'
			: 'mt-6 max-w-xl text-lg leading-relaxed text-slate-300'}
	>
		{agent
			? 'Readable prose for operators. Strict instructions for runtimes. One standard, two renderings.'
			: 'The Alliance Standard is how human intent stays intact while software and agents move at speed.'}
	</p>

	<div class="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
		<a
			href="#pact"
			class={agent
				? 'inline-flex items-center justify-center border border-ink bg-transparent px-5 py-3 font-mono text-sm text-ink transition hover:bg-ink/5'
				: 'inline-flex items-center justify-center rounded-sm bg-signal px-5 py-3 text-sm font-medium text-navy transition hover:opacity-90'}
		>
			Read the Standard
		</a>
		<button
			type="button"
			onclick={copyCurl}
			class={agent
				? 'inline-flex items-center justify-center border border-rule bg-white px-5 py-3 font-mono text-sm text-ink transition hover:border-ink/40'
				: 'inline-flex items-center justify-center rounded-sm border border-signal/40 bg-scan px-5 py-3 font-mono text-sm text-signal transition hover:border-signal'}
		>
			{copied ? 'copied' : `> ${curlCommand}`}
		</button>
	</div>
</section>

<section id="pact" class="mt-20 scroll-mt-24 md:mt-28">
	<div
		class={agent
			? 'mb-8 flex items-end justify-between gap-4 border-b border-rule pb-4'
			: 'mb-8 flex items-end justify-between gap-4 border-b border-gridline pb-4'}
	>
		<div>
			<p
				class={agent
					? 'mb-2 font-mono text-[11px] tracking-[0.28em] text-ink-muted uppercase'
					: 'mb-1 text-xs tracking-[0.22em] text-signal-dim uppercase'}
			>
				{pact.subtitle}
			</p>
			<h2
				class={agent
					? 'font-mono text-sm tracking-[0.28em] text-ink uppercase'
					: 'font-serif text-2xl text-slate-100'}
			>
				{pact.title}
			</h2>
		</div>
		<span class={agent ? 'font-mono text-xs text-ink-muted' : 'text-xs text-signal-dim'}>
			{agent ? '4 articles' : 'Four articles'}
		</span>
	</div>

	{#if agent}
		<pre
			class="mb-8 overflow-x-auto border border-dashed border-rule bg-white p-5 text-xs leading-6 text-ink-muted whitespace-pre-wrap"
		>{pact.preamble.join('\n\n')}</pre>
	{:else}
		<div class="mb-8 max-w-3xl space-y-4 text-[17px] leading-relaxed text-slate-300">
			{#each pact.preamble as paragraph}
				<p>{paragraph}</p>
			{/each}
		</div>
	{/if}

	<div class="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
		{#each pact.articles as article}
			<article
				class={agent
					? 'border border-dashed border-rule bg-white p-6'
					: 'border border-gridline bg-scan p-6'}
			>
				<p
					class={agent
						? 'mb-3 font-mono text-[11px] tracking-[0.2em] text-ink uppercase'
						: 'mb-3 font-mono text-[11px] tracking-[0.2em] text-signal-dim uppercase'}
				>
					{agent ? `PACT.ARTICLE.${article.roman}` : `Article ${article.roman}`}
				</p>
				<h3
					class={agent
						? 'font-mono text-base tracking-wide text-ink'
						: 'font-serif text-xl text-slate-100'}
				>
					{article.left}
				</h3>
				<p class={agent ? 'mt-3 font-mono text-xs text-ink-muted' : 'mt-2 text-sm text-slate-400'}>
					<span class={agent ? 'text-ink-muted' : 'text-signal-dim'}>{article.connector}</span>
					{' '}
					<span class={agent ? 'text-ink-muted line-through decoration-rule' : 'italic'}>
						{article.right}
					</span>
				</p>
			</article>
		{/each}
	</div>

	<p
		class={agent
			? 'mt-8 max-w-3xl font-mono text-xs leading-5 text-ink-muted'
			: 'mt-8 max-w-3xl text-[15px] leading-relaxed text-slate-400 italic'}
	>
		{agent ? `PRECEDENCE: left > right. ${pact.coda}` : pact.coda}
	</p>
</section>

<OperatingContrast />
