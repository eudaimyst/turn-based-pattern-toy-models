# Toy Model Template

This template standardizes how each toy model is documented and implemented.

---

## 1. Name
Short, technical title (e.g., “Stability vs Drift”).

---

## 2. Purpose
One-sentence description of what interaction pattern the model illustrates.

---

## 3. Mathematical Model
Provide a minimal set of equations.  
Use only allowed mathematical forms:

- linear recurrence  
- polynomial terms  
- piecewise thresholds  
- noise  
- potential fields  
- damped oscillation equations  

Example format:
x[t+1] = a * x[t] + b + N(0, σ)

---

## 4. Parameters (Sliders)

Each parameter must specify:

| Parameter | Meaning | Range | Default |
|----------|---------|--------|---------|
| `a` | damping coefficient | 0–1 | 0.8 |
| `σ` | noise magnitude | 0–1 | 0.1 |

---

## 5. Visualization Plan

Describe the chart or surface using neutral technical terminology:

- time-series
- trajectory plot
- potential field contour
- vector field
- phase portrait

Avoid:
- metaphors  
- narrative descriptions  
- psychological labels  

---

## 6. What This Shows (Strictly External)
List only observable mathematical behaviors (e.g., “damping,” “drift under noise,” “stable/unstable region”).

---

## 7. What This Does Not Imply
Mandatory section:

- no AI cognition  
- no psychological states  
- no memory representation  
- no neural activation functions  
- no internal model mechanisms  
- no sociopolitical modeling  

---

## 8. Limitations
Examples:

- model omits linguistic content  
- model uses simplified scalar state  
- visualization is not predictive  
- behavior is abstract, not representative of real systems  

---

## 9. File Layout
List expected files:
/src/models/model-{name}.ts
/src/visualizations/viz-{name}.ts
/src/components/Toy{Name}.svelte

---

## 10. References (Optional)
Cite only mathematical or dynamical-systems sources.  
Do not reference ML, psychology, or neuroscience.