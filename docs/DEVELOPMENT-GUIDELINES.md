# Development Guidelines

## Technical Stack
- **Svelte** for UI components
- **D3.js** for charts, vector fields, potential surfaces, and interactive visuals
- **TypeScript** recommended for type clarity

## Architectural Principles

### 1. Separation of Concerns
- Mathematical model logic resides in `/src/models/`
- Visualization logic (D3) in `/src/visualizations/`
- Svelte components in `/src/components/`
- Shared utilities in `/src/lib/`

### 2. No Neural Network Constructs
Avoid functions, terminology, or diagrams associated with:
- activations (sigmoid, tanh, ReLU, GELU, softmax)
- hidden layers
- backpropagation
- attention mechanisms
- embeddings
- memory cells or recurrence motifs

### 3. No Psychological or Cognitive Interpretation
Do not introduce variables, labels, or descriptions implying:
- emotion
- personality
- intentionality
- memory
- cognition
- belief or desire

### 4. Model Variables Must Be Abstract
All variables must be scalars with defined, mathematical meaning only.

### 5. Documentation Requirements
Each toy model must include:
- concise equation
- slider mapping with min/max/default
- description of visualization
- list of modeled behaviors
- explicit non-implication list
- limitations section

### 6. Visualization Constraints
All visualizations must:
- avoid shapes or color gradients that imply emotion or psychological meaning
- avoid node-link diagrams resembling neural network graphs
- avoid anthropomorphic symbols

### 7. Safety and Guardrails
Ensure:
- clear disclaimers in component headers
- no inference about real human behavior
- no claims about AI internal mechanisms
- no metaphors or narrative explanations

## Allowed Mathematical Forms
- linear recurrence: `x[t+1] = a*x[t] + b`
- polynomial expressions
- piecewise thresholds
- basic damping: `x[t+1] = r * x[t]`
- additive noise: `+ N(0, σ)`
- potential fields: `U(x) = k*(x - c)^2`
- simple oscillators: `x'' + d*x' + k*x = 0`

## Prohibited Forms
- sigmoids
- tanh
- ReLU/GELU
- Hopfield energy functions
- Lorenz systems
- logistic map in chaotic regimes
- any equation resembling a perceptron or RNN

## Coding Conventions
- Prefer pure functions for model updates.
- Use explicit typing for all parameters.
- Use consistent naming: `state`, `params`, `update()`.
- Keep visualizations stateless; drive them from Svelte stores or props.
- Minimize global state.

## Repository Naming Conventions
- Models: `model-{name}.ts`
- Visualizations: `viz-{name}.ts`
- Components: `Toy{name}.svelte`
- Shared types: `types.ts`

## Testing
- Unit tests for mathematical correctness
- Static checks for type errors
- Manual verification for visualization correctness