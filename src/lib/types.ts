// Shared types placeholder for haii-dynamics
// Add shared interfaces and types here for reuse across models and components.

// Stability vs Drift toy shared types
export type Params = {
	a: number; // stability coefficient (0..1)
	b: number; // constant drift term
	sigma: number; // noise magnitude (stddev)
};

export type State = {
	x: number;
};

// Add additional shared types below as needed.
