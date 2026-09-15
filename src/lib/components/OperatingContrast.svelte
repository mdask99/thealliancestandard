<script>
	import { chipCount, contrast } from '$lib/contrast.js';
	import { perspective } from '$lib/perspective.svelte.js';

	const agent = $derived(perspective.mode === 'agent');
	const nodes = chipCount();

	const nodeCenters = [
		{ x: 50, y: 16 },
		{ x: 84, y: 50 },
		{ x: 50, y: 84 },
		{ x: 16, y: 50 }
	];
	const nodeRadius = 14.2;
	const arrowInset = 0.8;

	const arrows = nodeCenters.map((from, i) => {
		const to = nodeCenters[(i + 1) % 4];
		const dx = to.x - from.x;
		const dy = to.y - from.y;
		const len = Math.hypot(dx, dy);
		const ux = dx / len;
		const uy = dy / len;
		const startR = nodeRadius + arrowInset;
		const endR = nodeRadius + 2.2;
		return {
			x1: from.x + ux * startR,
			y1: from.y + uy * startR,
			x2: to.x - ux * endR,
			y2: to.y - uy * endR
		};
	});

	const nodeSlots = [
		'absolute top-0 left-1/2 w-[28%] -translate-x-1/2 sm:w-[30%]',
		'absolute top-1/2 right-0 w-[28%] -translate-y-1/2 sm:w-[30%]',
		'absolute bottom-0 left-1/2 w-[28%] -translate-x-1/2 sm:w-[30%]',
		'absolute top-1/2 left-0 w-[28%] -translate-y-1/2 sm:w-[30%]'
	];

	const ice = '#8eb8e4';
</script>

<section id="contrast" class="mt-20 scroll-mt-24 md:mt-28">
	<div class="mb-10 max-w-3xl">
		<p
			class={agent
				? 'mb-3 font-mono text-[11px] tracking-[0.28em] text-ink-muted uppercase'
				: 'mb-3 text-xs tracking-[0.22em] text-signal-dim uppercase'}
		>
			{contrast.eyebrow}
		</p>
		<h2
			class={agent
				? 'font-mono text-xl tracking-tight text-ink md:text-2xl'
				: 'font-serif text-3xl tracking-tight text-slate-100 md:text-4xl'}
		>
			{contrast.headline}
		</h2>
		<p
			class={agent
				? 'mt-4 font-mono text-xs leading-5 text-ink-muted'
				: 'mt-4 text-[17px] leading-relaxed text-slate-300'}
		>
			{contrast.lede}
		</p>
	</div>

	<div class="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-6">
		<div
			class="max-sm:px-3 max-sm:py-5 bg-navy p-5 text-white lg:col-span-7 lg:p-8 {agent
				? 'border-2 border-navy'
				: 'border-2 border-signal'}"
		>
			<header class="mb-2 text-center">
				<h3
					class={agent
						? 'font-mono text-sm tracking-[0.22em] text-signal uppercase sm:text-base'
						: 'font-sans text-2xl font-semibold tracking-tight text-white sm:text-3xl'}
				>
					{agent ? contrast.loop.agentHeader : contrast.loop.title}
				</h3>
				<p
					class={agent
						? 'mt-1 font-mono text-[10px] tracking-widest text-signal-dim uppercase'
						: 'mt-1 text-sm text-signal sm:text-base'}
				>
					{agent ? contrast.loop.agentSubtitle : contrast.loop.subtitle}
				</p>
			</header>

			<div class="@container relative mx-auto aspect-square w-full max-w-lg">
				<svg class="absolute inset-0 h-full w-full" viewBox="0 0 100 100" aria-hidden="true">
					<defs>
						<marker
							id="loop-arrow"
							viewBox="0 0 10 10"
							refX="8"
							refY="5"
							markerWidth="5"
							markerHeight="5"
							orient="auto"
						>
							<path d="M 0 0 L 10 5 L 0 10 z" fill={ice} />
						</marker>
					</defs>
					{#each arrows as arrow}
						<line
							x1={arrow.x1}
							y1={arrow.y1}
							x2={arrow.x2}
							y2={arrow.y2}
							stroke={ice}
							stroke-width="1.1"
							stroke-linecap="round"
							marker-end="url(#loop-arrow)"
						/>
					{/each}
				</svg>

				<p
					class={agent
						? 'absolute top-1/2 left-1/2 w-[24%] -translate-x-1/2 -translate-y-1/2 text-center font-mono text-[clamp(0.45rem,3.2cqi,0.7rem)] tracking-wide text-signal uppercase'
						: 'absolute top-1/2 left-1/2 w-[28%] -translate-x-1/2 -translate-y-1/2 text-center font-serif text-[clamp(0.7rem,4.5cqi,1.15rem)] tracking-wide text-slate-300 italic'}
				>
					continuous
				</p>

				{#each contrast.loop.steps as step, i}
					<div
						class="{nodeSlots[i]} flex aspect-square min-h-[72px] flex-col items-center justify-center rounded-full border-[1.5px] border-signal bg-navy px-[6%] text-center"
					>
						<p
							class={agent
								? 'font-mono text-[clamp(0.55rem,3.8cqi,0.95rem)] leading-tight tracking-wide text-signal uppercase'
								: 'font-sans text-[clamp(0.7rem,4.6cqi,1.2rem)] leading-tight font-semibold text-white'}
						>
							{step.label}
						</p>
						<p class="mt-[0.15em] text-[clamp(0.42rem,2.6cqi,0.7rem)] leading-snug text-slate-400">
							{step.article}
						</p>
					</div>
				{/each}
			</div>

			<p
				class="mx-auto mt-4 max-w-md rounded-full border border-signal/50 px-3 py-2 text-center font-mono text-[clamp(0.6rem,2.4cqi,0.8rem)] leading-5 text-slate-200"
			>
				LOOP: intent → generate → verify → ship → intent
			</p>

			<ol class="sr-only">
				{#each contrast.loop.steps as step}
					<li>{step.label}: {step.article}</li>
				{/each}
			</ol>
		</div>

		<div
			class={agent
				? 'border border-dashed border-rule bg-white p-5 lg:col-span-5'
				: 'border border-gridline bg-scan p-5 lg:col-span-5'}
		>
			<div class="mb-4 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-3">
				<h3
					class={agent
						? 'font-mono text-xs tracking-[0.2em] text-ink uppercase'
						: 'font-serif text-lg text-slate-100'}
				>
					{agent ? contrast.tax.agentHeader : contrast.tax.title}
				</h3>
				<span class={agent ? 'font-mono text-[10px] text-ink-muted' : 'text-xs text-signal-dim'}>
					{agent ? `nodes=${nodes}` : contrast.tax.metrics}
				</span>
			</div>

			{#if agent}
				<pre class="overflow-x-auto font-mono text-[11px] leading-5 text-ink-muted whitespace-pre-wrap">{contrast.tax.bands
						.map((band) => `${band.id}: [${band.chips.join(', ')}]`)
						.join('\n')}
cycle: blocked_on_sync
cadence: 10w
room: required</pre>
			{:else}
				<div class="space-y-3" aria-hidden="true">
					{#each contrast.tax.bands as band}
						<div>
							<p class="mb-1.5 text-[10px] tracking-[0.18em] text-signal-dim uppercase">{band.label}</p>
							<div class="flex flex-wrap gap-1">
								{#each band.chips as chip}
									<span
										class="rounded-[2px] border border-gridline bg-navy px-1.5 py-[3px] font-mono text-[10px] text-slate-400"
									>
										{chip}
									</span>
								{/each}
							</div>
						</div>
					{/each}
				</div>
				<p class="sr-only">
					A dense stack of generic coordination activities across rooms, cadences, syncs, and roles.
				</p>
			{/if}
		</div>
	</div>
</section>
