export const contrast = {
	eyebrow: 'Why the Pact is short',
	headline: 'Velocity does not need a map of the factory.',
	lede: 'Frameworks such as SAFe grew to coordinate many humans in the same rooms, on the same calendar. Agents do not need that theater. Four articles replace the lattice.',
	tax: {
		title: 'The coordination tax',
		metrics: 'dozens of motions · fixed cadence · a room required',
		agentHeader: 'COORDINATION_GRAPH',
		bands: [
			{
				id: 'rooms',
				label: 'Rooms',
				chips: [
					'steering',
					'intake',
					'ranking',
					'forecast',
					'staffing',
					'budget',
					'roadmap',
					'gate',
					'charter',
					'commit'
				]
			},
			{
				id: 'cadences',
				label: 'Cadences',
				chips: [
					'kickoff',
					'checkpoint',
					'midpoint',
					'freeze',
					'demo-day',
					'retro',
					'reset',
					'planning-offsite',
					'readout',
					'capacity-lock'
				]
			},
			{
				id: 'syncs',
				label: 'Syncs',
				chips: [
					'stand-up',
					'groom',
					'align',
					'depend',
					'escalate',
					'handoff',
					'unblock',
					'status',
					'review-board',
					'rollout-gate'
				]
			},
			{
				id: 'roles',
				label: 'Roles',
				chips: [
					'owner',
					'proxy',
					'facilitator',
					'coordinator',
					'approver',
					'liaison',
					'scribe',
					'observer'
				]
			}
		]
	},
	loop: {
		title: 'The Alliance Loop',
		subtitle: 'Development Lifecycle',
		agentHeader: 'ALLIANCE_LOOP',
		agentSubtitle: 'lifecycle=dev',
		steps: [
			{ id: 'intent', label: 'Intent', article: 'Sovereignty of Intent' },
			{ id: 'generate', label: 'Generate', article: 'Continuous Synthesis' },
			{ id: 'verify', label: 'Verify', article: 'Cryptographic Trust' },
			{ id: 'ship', label: 'Ship', article: 'Asynchronous Momentum' }
		]
	}
};

export function chipCount() {
	return contrast.tax.bands.reduce((sum, band) => sum + band.chips.length, 0);
}
