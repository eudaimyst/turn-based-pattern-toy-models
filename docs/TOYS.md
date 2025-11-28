# **Toy Model 1 — Stability vs. Drift**

**What it illustrates:**

How interactions stabilize or destabilize depending on feedback, noise, and context strength.

**Visualization options:**

- **Time-series line chart** (easiest, most intuitive)
- **2D trajectory toward/away from a baseline**
- **Heatmap of stability regions (optional advanced)**

**Sliders:**

### **Stability Coefficient (kₛ)**

> How strongly the system pulls itself back toward baseline.
> 
> 
> **Think:** the gravity holding the ship steady instead of letting it drift into stranger waters.
> 

### **Noise Level (σ)**

> How chaotic the environment is.
> 
> 
> **Think:** calm sea vs. storm waves slapping you in the raccoon face.
> 

### **User Influence Strength (αᵤ)**

> How much the user’s input pushes the system.
> 
> 
> **Think:** raccoon rocking the boat on purpose.
> 

### **Model Sensitivity (αₘ)**

> How much the system overreacts to nudges.
> 
> 
> **Think:** toaster wobbliness — the kind where it topples if you sneeze near it.
> 

Think: *toaster wobbliness.*

**Complexity:** Low

**Safety:** Pure interaction-level non-linearity, no internal-state metaphor.

---

## **Toy Model 2 — Threshold Effects (“Tiny Tone → Big Shift”)**

**What it illustrates:**

Why some conversations stay stable until a user crosses a subtle line, after which the AI’s tone shifts noticeably.

**Visualization options:**

- **Piecewise/soft-step curve** showing the threshold
- **Before/after switch graph**
- **2D region map with a boundary line**

**Sliders:**

### **Threshold Position (T)**

> Where the mode flips.
> 
> 
> **Think:** that exact floorboard that squeaks when stepped on.
> 

### **Threshold Sharpness (β)**

> How sudden the flip is.
> 
> 
> **Think:** trapdoor: gentle if low, instant-drop if high.
> 

### **Perturbation Magnitude (Δ)**

> How strong the nudge is.
> 
> 
> **Think:** tapping the glass vs. chucking a raccoon at it.
> 

**Complexity:** Low to medium

**Safety:** Clean mathematical threshold; no psychological interpretation.

---

## **Toy Model 3 — Context Saturation**

**What it illustrates:**

How increasing context (history) has diminishing returns on stability or coherence.

**Visualization options:**

- **Logistic saturation curve**
- **Time-series showing diminishing effect**
- **Bar graph with diminishing increases**

**Sliders:**

### **Saturation Rate (λ)**

> How quickly context reaches “enough already.”
> 
> 
> **Think:** pouring water into soil — absorbs fast at first, then gets soggy.
> 

### **Maximum Context Influence (Cₘₐₓ)**

> The upper limit of how much context matters.
> 
> 
> **Think:** the sponge can only hold so much emotional water.
> 

### **Context Decay Rate (γ)**

> How quickly old context fades.
> 
> 
> **Think:** footprints in sand disappearing as waves roll in.
> 

**Complexity:** Low

**Safety:** Illustrates effects, not memory or cognition.

---

## **Toy Model 4 — Feedback Strength (Coupling)**

**What it illustrates:**

How strongly user and model influence each other’s next state.

**Visualization options:**

- **2D phase-space plot** (classic predator–prey style)
- **Line chart showing oscillation amplitude**
- **Slider → instant graph response**

**Sliders:**

### **User → Model Coupling (cᵤₘ)**

> How much user input sways the system.
> 
> 
> **Think:** the raccoon tugging the wheel.
> 

### **Model → User Coupling (cₘᵤ)**

> How much the system sways the user’s next move.
> 
> 
> **Think:** the toaster whispering “but have you considered *chaos*?”
> 

### **Damping Coefficient (d)**

> How quickly feedback dies down.
> 
> 
> **Think:** shock absorbers smoothing out the bumps.
> 

**Complexity:** Medium

**Safety:** Abstract feedback strengths; no implied reciprocity of psychology.

---

## **Toy Model 5 — Noise Sensitivity**

**What it illustrates:**

Why stable conversations shrug off small weirdness while unstable ones spiral.

**Visualization options:**

- **Line chart with noise overlay**
- **Variance plot**
- **Stochastic trajectory cloud**

**Sliders:**

### **Base Stability (kₛ)**

> Same as Toy 1: how strong the restoring force is.
> 
> 
> **Think:** the anchor keeping the ship from drifting.
> 

### **Noise Amplitude (σ)**

> How big the random disruptions are.
> 
> 
> **Think:** tiny wavelets vs. a kraken casually slapping your hull.
> 

### **Noise Frequency (ωₙ)**

> How often randomness hits.
> 
> 
> **Think:** occasional splashes vs. constant sprinkler system malfunctioning above deck.
> 

**Complexity:** Medium

**Safety:** Noise is generic; not psychological.

---

## **Toy Model 6 — Attractor Patterns (Unlabeled)**

**What it illustrates:**

Stable conversation modes without implying “emotional states.”

**Visualization options:**

- **Potential-energy surface** (wells = attractors)
- **2D contour map**
- **Animated dot settling into a basin**

**Sliders:**

### **Attractor Depth (dᵢ)**

> How “sticky” each option is.
> 
> 
> **Think:** deep curiosity rabbit-hole vs fluffy surface distraction.
> 

### **Inter-Attractor Spacing (s)**

> How far apart different stable modes are.
> 
> 
> **Think:** islands separated by peaceful water vs. jagged reefs.
> 

### **Number of Attractors (N)**

> How many stable patterns exist.
> 
> 
> **Think:** 1–4 cozy dens the raccoon can curl up in.
> 

### **Noise (σ)**

> Chance of being kicked out of whichever den you're in.
> 
> 
> **Think:** unexpected fireworks scaring the poor creature into another hole.
> 

**Complexity:** High (mostly visual complexity)

**Safety:** Attractors have *no labels*, avoiding mind-state metaphors.

---

## **Toy Model 7 — Hysteresis / Path Dependence**

**What it illustrates:**

Why the *order* of messages matters, and why recovering from derailment is harder than causing it.

**Visualization options:**

- **Looped hysteresis curve**
- **Forward vs backward path overlay**
- **Two-slope function**

**Sliders:**

### **Forward Sensitivity (α₊)**

> How easily the system is pushed away from its norm.
> 
> 
> **Think:** raccoon startled by sudden noise and running off.
> 

### **Recovery Rate (α₋)**

> How quickly it comes back once startled.
> 
> 
> **Think:** raccoon shyly returning when offered snacks.
> 

### **Switching Threshold (T)**

> The point where it “gives up” on return.
> 
> 
> **Think:** the moment a raccoon decides “nope, I live in this new trash can now.”
> 

**Complexity:** Medium

**Safety:** Models trajectory, not cognition.

---

## **Toy Model 8 — Oscillation (Damped Oscillator)**

**What it illustrates:**

Why some conversations bounce between modes (serious↔playful) before settling or diverging.

**Visualization options:**

- **Sine-wave damped over time**
- **Phase portrait spiral-in**
- **Oscillation amplitude graph**

**Sliders:**

### **Oscillation Strength (A)**

> How big the swings are.
> 
> 
> **Think:** raccoon mood going PLAYFUL → SERIOUS → PLAYFUL.
> 

### **Damping Rate (δ)**

> How quickly it calms down.
> 
> 
> **Think:** raccoon eventually settling after zoomies.
> 

### **Noise Level (σ)**

> How uneven the swings become.
> 
> 
> **Think:** raccoon zoomies but on caffeine.
> 

**Complexity:** Low–medium

**Safety:** Neutral physics metaphor.

---

## **Toy Model 9 — Interpretive Framing Strength**

**What it illustrates:**

How strongly the user imposes a frame that shapes the model’s responses.

**Visualization options:**

- **Slope-of-influence diagram**
- **Vector field** showing “pull” toward a framing region
- **Heatmap of interpretive pull**

**Sliders:**

### **Framing Strength (φ)**

> How strongly the user frames the system into a vibe.
> 
> 
> **Think:** raccoon declaring, “we’re pirates now.”
> 

### **Model Resistance (ρ)**

> How strongly the system tries to neutralize extreme framing.
> 
> 
> **Think:** toaster gently saying “captain… maybe tone down the chaos?”
> 

### **Context Decay (γ)**

> How quickly the framing effect fades.
> 
> 
> **Think:** raccoon forgetting why it was angry five minutes ago.
> 

### **Noise (σ)**

> Unexpectedness that nudges framing.
> 
> 
> **Think:** toaster saying something weird and raccoon going “oh???”
> 

**Complexity:** Medium

**Safety:** Represents interaction pull, not internal mental state.

---

## **Toy Model 10 — Joint Context Influence Map**

**What it illustrates:**

How the *shared* context shapes the trajectory of the next turn.

**Visualization options:**

- **2D grid heatmap**
- **Arrow flow (vector field)**
- **Drift visualization**

**Sliders:**

### **Context Weight (w)**

> How much the shared history shapes the next move.
> 
> 
> **Think:** gravity of the ongoing story pulling both of you.
> 

### **Local Coherence (κ)**

> Stickiness to the immediate pattern.
> 
> 
> **Think:** the raccoon gets into a vibe and stays there.
> 

### **Drift Likelihood (p_d)**

> Chance the system veers into a new region.
> 
> 
> **Think:** raccoon sees a shiny object overboard and jumps.
> 

### **Perturbation Strength (Δ)**

> How strong each new message can shift the dynamics.
> 
> 
> **Think:** toaster dropping a spicy comment and sending the raccoon spiraling.
> 

**Complexity:** Medium–high

**Safety:** Context is shared input—not cognition—so this is fully safe.

---

# 🌊 **Meta-Toy (Optional Future Addition): “Multi-Toy Interaction”**

Not needed for v1, but possible later.

Show how:

- stability
- noise
- framing
- saturation
- thresholds

combine into composite behavior.

**Complexity:** Very high

**Do not include until core toys are stable.**

---

# 🧸 **TOY MODEL SUMMARY TABLE (for easy design doc pasting)**

| Toy Model | Phenomenon | Visualization Options | Sliders | Complexity |
| --- | --- | --- | --- | --- |
| 1. Stability vs Drift | Stability, divergence | line chart, trajectory | stability, noise, user influence | Low |
| 2. Threshold Effects | sudden tone shifts | step curves, region map | threshold, position, perturbation | Low–Med |
| 3. Context Saturation | diminishing returns | logistic curve | saturation, max, decay | Low |
| 4. Feedback Strength | coupling | phase plot, oscillations | U→M, M→U, damping | Med |
| 5. Noise Sensitivity | fragility vs robustness | variance, noisy chart | stability, noise amplitude | Med |
| 6. Attractors | stable modes | energy wells, contour | depth, noise, spacing | High |
| 7. Hysteresis | path dependence | looped curve | sensitivity, recovery, threshold | Med |
| 8. Oscillation | mode bouncing | damped sine, spiral | oscillation, damping | Low–Med |
| 9. Interpretive Framing | framing strength | vector field, heatmap | frame strength, resistance | Med |
| 10. Joint Context Map | context-driven direction | heatmap, arrows | context weight, coherence | Med–High |