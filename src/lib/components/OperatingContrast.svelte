<script>
	import { chipCount, contrast } from '$lib/contrast.js';
	import { perspective } from '$lib/perspective.svelte.js';

	const agent = $derived(perspective.mode === 'agent');
	const nodes = chipCount();

	const cx = 200;
	const cy = 200;
	const radius = 122;
	const angles = [-90, 0, 90, 180];

	function point(deg) {
		const rad = (deg * Math.PI) / 180;
		return {
			x: cx + radius * Math.cos(rad),
			y: cy + radius * Math.sin(rad)
		};
	}

	const arcs = angles.map((start, i) => {
		const end = angles[(i + 1) % 4];
		const a = point(start + 22);
		const b = point(end - 22);
		return `M ${a.x.toFixed(1)} ${a.y.toFixed(1)} A ${radius} ${radius} 0 0 1 ${b.x.toFixed(1)} ${b.y.toFixed(1)}`;
	});

	const nodeSlots = [
		'absolute top-[2%] left-1/2 w-[42%] -translate-x-1/2 text-center',
		'absolute top-1/2 right-[1%] w-[38%] -translate-y-1/2 text-right',
		'absolute bottom-[2%] left-1/2 w-[42%] -translate-x-1/2 text-center',
		'absolute top-1/2 left-[1%] w-[38%] -translate-y-1/2 text-left'
	];
</script>

<section id="contrast" class="mt-20 scroll-mt-24 md:mt-28">
	<div class="mb-10 max-w-3xl">
		<p
			class={agent
				? 'mb-3 font-mono text-[11px] tracking-[0.28em] text-phosphor uppercase'
				: 'mb-3 text-xs tracking-[0.22em] text-ink-muted uppercase'}
		>
			{contrast.eyebrow}
		</p>
		<h2
			class={agent
				? 'font-mono text-xl tracking-tight text-neutral-100 md:text-2xl'
				: 'font-serif text-3xl tracking-tight text-ink md:text-4xl'}
		>
			{contrast.headline}
		</h2>
		<p
			class={agent
				? 'mt-4 font-mono text-xs leading-5 text-neutral-400'
				: 'mt-4 text-[17px] leading-relaxed text-ink-muted'}
		>
			{contrast.lede}
		</p>
	</div>

	<div class="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-6">
		<div
			class={agent
				? 'min-h-[26rem] border-2 border-phosphor bg-terminal p-5 lg:col-span-7 lg:p-8'
				: 'min-h-[26rem] border-2 border-mark bg-mark p-5 text-paper lg:col-span-7 lg:p-8'}
		>
			<div class="mb-2 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-3">
				<h3
					class={agent
						? 'font-mono text-sm tracking-[0.22em] text-phosphor uppercase'
						: 'font-serif text-2xl text-paper'}
				>
					{agent ? contrast.loop.agentHeader : contrast.loop.title}
				</h3>
				<span class={agent ? 'font-mono text-[10px] text-phosphor-dim' : 'text-xs text-paper/70'}>
					{agent ? 'articles=4' : contrast.loop.metrics}
				</span>
			</div>

			<div class="relative mx-auto aspect-square w-full max-w-[28rem]">
				<svg class="h-full w-full" viewBox="0 0 400 400" aria-hidden="true">
					<defs>
						<marker
							id="loop-arrow"
							viewBox="0 0 10 10"
							refX="8"
							refY="5"
							markerWidth="6"
							markerHeight="6"
							orient="auto"
						>
							<path d="M 0 0 L 10 5 L 0 10 z" fill={agent ? '#7cff6b' : '#f4f0e8'} />
						</marker>
					</defs>
					<circle
						cx={cx}
						cy={cy}
						r={radius}
						fill="none"
						stroke={agent ? '#3d8a34' : 'rgba(244,240,232,0.28)'}
						stroke-width="1.5"
					/>
					{#each arcs as d}
						<path
							{d}
							fill="none"
							stroke={agent ? '#7cff6b' : '#f4f0e8'}
							stroke-width="2.5"
							marker-end="url(#loop-arrow)"
						/>
					{/each}
				</svg>

				<div
					class={agent
						? 'absolute top-1/2 left-1/2 w-[28%] -translate-x-1/2 -translate-y-1/2 text-center font-mono text-[9px] leading-4 tracking-[0.14em] text-phosphor uppercase'
						: 'absolute top-1/2 left-1/2 w-[28%] -translate-x-1/2 -translate-y-1/2 text-center font-serif text-sm tracking-wide text-paper/80 italic'}
				>
					{agent ? 'cadence continuous' : 'continuous'}
				</div>

				{#each contrast.loop.steps as step, i}
					<div class={nodeSlots[i]}>
						<p
							class={agent
								? 'font-mono text-xs tracking-wide text-phosphor uppercase sm:text-sm'
								: 'font-serif text-lg leading-tight sm:text-xl'}
						>
							{step.label}
						</p>
						<p
							class={agent
								? 'mt-0.5 font-mono text-[9px] text-neutral-500'
								: 'mt-0.5 text-[10px] leading-snug text-paper/65 sm:text-xs'}
						>
							{step.article}
						</p>
					</div>
				{/each}
			</div>

			<p
				class={agent
					? 'mt-3 text-center font-mono text-[11px] text-phosphor-dim'
					: 'mt-3 text-center font-mono text-[11px] text-paper/55'}
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
				? 'border border-dashed border-phosphor-dim bg-scan p-5 lg:col-span-5'
				: 'border border-rule bg-white/70 p-5 shadow-[0_1px_0_rgba(22,21,19,0.04)] lg:col-span-5'}
		>
			<div class="mb-4 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-3">
				<h3
					class={agent
						? 'font-mono text-xs tracking-[0.2em] text-phosphor uppercase'
						: 'font-serif text-lg text-ink'}
				>
					{agent ? contrast.tax.agentHeader : contrast.tax.title}
				</h3>
				<span class={agent ? 'font-mono text-[10px] text-neutral-500' : 'text-xs text-ink-muted'}>
					{agent ? `nodes=${nodes}` : contrast.tax.metrics}
				</span>
			</div>

			{#if agent}
				<pre class="overflow-x-auto font-mono text-[11px] leading-5 text-neutral-400 whitespace-pre-wrap">{contrast.tax.bands
						.map((band) => `${band.id}: [${band.chips.join(', ')}]`)
						.join('\n')}
cycle: blocked_on_sync
cadence: 10w
room: required</pre>
			{:else}
				<div class="space-y-3" aria-hidden="true">
					{#each contrast.tax.bands as band}
						<div>
							<p class="mb-1.5 text-[10px] tracking-[0.18em] text-ink-muted uppercase">{band.label}</p>
							<div class="flex flex-wrap gap-1">
								{#each band.chips as chip}
									<span
										class="rounded-[2px] border border-rule bg-paper px-1.5 py-[3px] font-mono text-[10px] text-ink-muted"
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
