# **Purpose:**

To explain *why* non-linear equations appear in the toy models,

*what they represent*,

and *what they explicitly do not represent*,

in a clear, rigorous, non-misleading way.

---

## **Overview**

The toy models in this project use **non-linear mathematical functions** to illustrate interaction patterns that often arise in feedback-based systems. These functions are **not derived from human psychology** and **do not represent the internal workings of AI systems**. Instead, they model **generic behaviors**—instabilities, saturation effects, thresholds, oscillations—that appear across many natural and engineered systems.

We use these behaviors as **analogical tools** to help users reason about conversation-level dynamics, not mind-level mechanisms.

The toy models therefore represent:

- **interaction-level patterns**,
- **not human cognition**,
- **not AI internal states**,
- **not emotion**,
- **not personality**,
- **not consciousness**.

This section defines the exact types of non-linearity we borrow, why they are useful, and how they are adapted safely.

---

# **Why Non-Linearity at All?**

Human–AI dialogues involve **feedback loops**:

- The user shapes the next AI output.
- The AI output shapes the next user input.

Feedback naturally creates **non-linear behavior** even when neither component is complex internally.

Because the toy models focus on *interaction* rather than *internal mechanism*, non-linear functions offer a clean, well-studied way to illustrate:

- stability
- drift
- sensitivity
- coherence
- breakdown
- runaway dynamics

These are *observable* conversation patterns,

not claims about human mental states or AI cognition.

---

# **Explicit Guardrails**

This entire section must be paired with explicit statements:

### **A.**

These patterns *do not* represent human emotions or AI cognition.

### **B.**

They illustrate interaction-level phenomena only.

### **C.**

They are toy analogies, not mechanistic models.

### **D.**

They are guided by mathematical intuition, not psychological inference.

### **E.**

No claims are made about how GPT or any AI system works internally.

### **F.**

No claims are made about user mental states, personality, emotion, or cognition.

### **G.**

The non-linear behaviors exist to help users reason about conversational *patterns*,

not human *minds* or machine *minds*.

---

# **Non-Linear Behaviors We Can Safely Borrow**

Below is the full list of dynamical-systems behaviors that are academically standard, mathematically simple, ethically safe, and appropriate for illustrating interaction patterns.

These are the ones we will draw from.

---

## **1. Saturation (Logistic Curves)**

**What it is:**

Systems have natural limits; increases taper off.

**Why it’s useful:**

Conversations also show diminishing returns — e.g., coherence can’t increase indefinitely.

**Safe adaptation:**

“More of X leads to less additional change as X grows.”

---

## **2. Threshold Effects (Step Functions, Softmax-like curves)**

[-Removed by Human in the Loop, these were discovered through collaboration with the AI to NOT apply at the interaction level, and the related toy was removed.]

---

## **3. Oscillations (Predator–Prey, Damped Oscillators)**

**What it is:**

Two variables push and pull on each other, creating cycles.

**Why it’s useful:**

Some conversations swing between modes (playful → serious → playful).

**Safe adaptation:**

“Feedback produces periodic rises and falls.”

---

## **4. Drift (Noise-Driven Instability)**

**What it is:**

In unstable regions, noise accumulates and introduces drift.

**Why it’s useful:**

Chaotic or confusing conversations drift more easily than grounded ones.

**Safe adaptation:**

“Small perturbations cause larger changes when stability is low.”

---

## **5. Coupling Strength (Interaction Coefficients)**

**What it is:**

The degree to which one variable influences another.

**Why it’s useful:**

User messages vary in how strongly they shift model responses (and vice versa).

**Safe adaptation:**

“How tightly two paths influence each other.”

---

## **6. Hysteresis / Path dependence (History-Dependence)**

-Human in the loop note: Hysteresis is not visualised in the toy models, only the path dependence component. (Purely because copilot did not generate it and I decided it was an unnecessary distraction for the visualisation.)

**What it is:**

System behavior depends on its past trajectory, not only present state.

**Why it’s useful:**

Conversation context creates inertia — recovering from a derailment takes effort.

**Safe adaptation:**

“Paths change depending on where you came from.”

---

## **7. Noise Sensitivity (Stochastic Perturbations)**

**What it is:**

Randomness interacts with stability — robust states shrug off noise; fragile ones explode.

**Why it’s useful:**

Models can illustrate why conversations sometimes stay stable and sometimes spiral.

**Safe adaptation:**

“Noise plays a larger role when stability is low.”

---

## **8. Attractors (Stable and Unstable)**

**What it is:**

Systems tend to settle into certain patterns unless heavily perturbed.

**Why it’s useful:**

Users and models fall into habitual conversational “modes.”

**Safe adaptation:**

“Some patterns are sticky.”

---

## **9. Bifurcation (Qualitative Change in Behavior)**

**What it is:**

A small parameter change causes a system to reorganize its long-term behavior.

**Why it’s useful:**

Conversation dynamics sometimes reorganize when tone, context, or user intent shifts.

**Safe adaptation:**

“Tiny changes produce qualitatively different trajectories.”

---

## **10. Stabilizing and Destabilizing Feedback**

**What it is:**

Positive feedback amplifies; negative feedback dampens.

**Why it’s useful:**

Shows why some conversations self-correct and others spiral.

**Safe adaptation:**

“Systems either rein in deviations or amplify them.”

---

# Addendum:

## **Non-Linear Behaviors We Avoid**

The toy models in this project use non-linear equations to illustrate interaction *patterns* at the conversational level.

However, some non-linear behaviors—while mathematically interesting—would be misleading in this context.

Below is a list of non-linear mechanisms **we explicitly exclude** and **why**.

These exclusions protect against overclaiming, pseudo-psychology, and incorrect assumptions about how either humans or AI systems function.

---

## **1. Chaotic Maps (e.g., logistic map in chaotic regime)**

**Why we avoid it:**

Chaotic maps imply long-term hidden states that evolve unpredictably over time.

Human–AI conversations do not involve evolving internal states inside the model—each response is freshly generated from context.

Using chaos equations would incorrectly suggest persistent, chaotic “internal dynamics.”

---

## **2. Neural Activation Functions (ReLU, sigmoid, tanh)**

**Why we avoid it:**

Activation functions are components of *neural network internals*, not conversational interactions.

Including them would imply that the toy model reflects the architecture or internal computations of GPT, which it does not.

To avoid confusion with actual model mechanics, these are excluded.

---

## **3. Emotional or Symbolic Attractors (Hopfield-like labeled states)**

**Why we avoid it:**

Hopfield networks store stable patterns that are often described as “memories.”

Labeling attractors with conversational moods (“playful,” “serious,” etc.) would imply that the AI possesses internal emotional states or persistent modes.

This would be misleading and anthropomorphic.

We instead use unlabeled, abstract attractor diagrams.

[Human in the loop note: I decided to just use 1 attractor in the visualisation, to prevent misinterpretation regarding any suggestion of steering or pulling behaviour by participants.]

---

## **4. Phase Transitions (e.g., water → ice)**

**Why we avoid it:**

Physical phase transitions imply distinct internal states separated by sharp boundaries.

Language models do not undergo internal state changes of this kind during conversation.

Using phase-transition metaphors risks suggesting metaphysical “mode shifts” inside the AI.

---

## **5. Bifurcation Cascades (deep fractal branching)**

**Why we avoid it:**

Bifurcation diagrams imply that small parameter changes permanently reorganize the system’s long-term behavior.

GPT does not accumulate internal structural change across a conversation.

To avoid implying evolving “modes” or self-reorganization, we exclude deep bifurcations.

---

## **6. Systems Requiring Memory or Recurrence (RNN-like or cellular automata)**

**Why we avoid it:**

GPT has **no persistent internal state** across turns.

Any non-linear system that depends on its own prior states would incorrectly imply:

- working memory
- emotional carryover
- internal narrative
- state evolution

We therefore avoid recurrence-based equations.

---

## **7. Optimization-Based Non-Linearity (e.g., utility gradients, policy updates)**

**Why we avoid it:**

These forms of non-linearity require an agent with goals, preferences, or reward signals.

GPT does not choose actions or maximize utility; it only predicts the next token.

To avoid implying agency, decision-making, or intention, these models are not included.

---

# **Summary**

The excluded non-linear models share one theme:

**They suggest internal states, memory, agency, or psychological structure.**

Human–AI dialogue does not contain these mechanisms on the AI side, and the toy models avoid implying otherwise.

The non-linear patterns we *do* use are limited to those that safely illustrate interaction-level feedback effects without representing internal cognition or emotion.

## **Linear Behaviors We Avoid**

Linear models make it look like ‘more input = proportionally more effect.’

Conversational patterns don’t work like that.
 
Feedback, thresholds, saturation, and drift mean we need non-linear behavior to illustrate the dynamics accurately — even in toy form.

## **1. Pure Proportional Change (y = kx)**

**Why we avoid it:**

This implies every increase in input has the same effect everywhere.

Conversations show thresholds, collapses, turbulence — not proportionality.

---

## **2. Constant Drift (y = mx + c)**

**Why we avoid it:**

Would imply that conversations “wander” at a predictable rate.

Real dynamics: sometimes stable for ages, sometimes derail instantly.

---

## **3. Independent Variables Only (no feedback terms)**

**Why we avoid it:**

Without feedback, the model can’t demonstrate core interaction patterns.

Conversation is *feedback-driven* by nature.

---

## **4. No Saturation (infinite growth)**

**Why we avoid it:**

Linear models have no ceiling.

But real conversations:

- cannot become infinitely coherent
- do not infinitely destabilize
- don’t infinitely escalate

There are always limits.

---

## **5. No Stability Regions (everything always changes)**

**Why we avoid it:**

Linear models lack attractors.

But conversation clearly has:

- stable modes
- habitual patterns
- return-to-level baselines

This is observable, not psychological.

---

## **6. Predictable Futures (straight-line trajectories)**

**Why we avoid it:**

Linear models imply predictability.

But interaction dynamics are famously sensitive to:

- sequence
- context
- interpretation
- prior turns

Non-equilibrium behavior requires non-linear math.