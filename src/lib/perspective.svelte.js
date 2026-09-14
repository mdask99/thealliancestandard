export const perspective = $state({
	mode: 'human'
});

export function togglePerspective() {
	perspective.mode = perspective.mode === 'human' ? 'agent' : 'human';
}
