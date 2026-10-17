# CatAllergyGuide Canonical Facts Sheet & Consistency Standard

This document establishes the single source of truth for recurring scientific facts, metrics, and technical standards across all guides, reviews, and interactive tools on **CatAllergyGuide.com**. All future editorial and technical content must strictly adhere to these canonical values.

---

## 1. Canonical Facts Reference Table

| Fact / Metric | Canonical Value | Primary Scientific Reference / Standard | Notes & Application Guidelines |
| :--- | :--- | :--- | :--- |
| **Fel d 1 Particle Size** | **2 to 10 microns in diameter** (with sub-5-micron particles penetrating deep pulmonary bronchioles) | Luczynska et al. (1990); Custovic et al. (1998); AAAAI Position Statements | Standardize away from erratic ranges like "0.1–10 μm" or "smaller than 2.5 μm". Fine particles under 5 μm stay airborne for hours. |
| **Fel d 1 Share of Feline Allergies** | **Up to 95%** | Bonnet et al. (2018), *Allergy, Asthma & Clinical Immunology* | Primary driver of human IgE sensitization among eight feline allergens (Fel d 1 to Fel d 8). |
| **Fel d 1 Molecular Structure & Weight** | **35 kDa tetrameric secretoglobin glycoprotein** | Kaiser et al. (2003); Bonnet et al. (2018) | Synthesized primarily in salivary glands, sebaceous skin glands, and lacrimal glands. |
| **Allergen Persistence in Vacated Homes** | **Up to 20 to 24 weeks (up to 6 months)** | Wood et al. (1992); Custovic et al. (1998) | Takes up to 6 months without aggressive deep cleaning and HEPA filtration for reservoirs to match pet-free baselines. |
| **Allergen-Reducing Diet Efficacy (Purina LiveClear)** | **Average 47% reduction** (active Fel d 1 on hair & dander) starting by the **3rd week of daily feeding** | Satyaraj et al. (2019), *Journal of Feline Medicine and Surgery* | Egg-derived anti-Fel d 1 IgY antibodies bind salivary allergens in the mouth. Does not affect baseline cat biology. |
| **True HEPA Filtration Mechanical Standard** | **Captures ≥ 99.97% of airborne particles down to 0.3 microns** | US Department of Energy (DOE) Standard; ASME AG-1 | Mechanical baseline for residential True HEPA purifiers. Brownie motion traps even smaller sub-micron particles. |
| **Cat Allergy Human Population Prevalence** | **10% to 20% of the adult population worldwide** | AAAAI & ACAAI Epidemiology Reports | Feline allergies are approximately twice as common as canine allergies in human populations. |
| **Bedding / Fabric Laundry Water Temperature** | **At least 130°F (54°C) or higher** | ACAAI Environmental Control Guidelines | Denatures protein bonds and dissolves water-soluble secretoglobins from textiles and bedding. |
| **Hypoallergenic Cat Breed Status** | **No cat breed is 100% hypoallergenic** | AAAAI Clinical Guidance; Sinke et al. (2016) | All cats produce Fel d 1. "Hypoallergenic" breeds rely either on limited genetic salivary reduction (Siberian) or mechanical coat traits (Devon Rex, Russian Blue, Sphynx). |
| **Gender & Hormonal Impact on Fel d 1** | **Intact males produce the highest levels; neutering significantly reduces output; females produce lowest baseline** | Zielonka et al. (1994); Jalil-Colome et al. (1996) | Testosterone drives sebaceous secretoglobin production; neutering lowers active skin secretion levels. |

---

## 2. Detailed Technical Explanations

### Fel d 1 Aerodynamic Size & Mechanics
- **Physical Size:** Intact secretoglobin dimers measure roughly 2 to 10 microns in airborne aerodynamic diameter once bound to dried saliva flakes and desquamated epithelial cells (dander).
- **Lower Airway Penetration:** Particles smaller than 5 microns remain suspended indefinitely in stagnant indoor air currents and bypass upper nasal ciliated filtration, reaching pulmonary bronchioles and triggering acute asthmatic bronchospasms.

### Dietary Neutralization (IgY Antibodies)
- **Mechanism:** Specialized kibble coated with avian egg yolk antibodies (IgY) targeted specifically to feline Fel d 1 binds to active epitope sites in the cat’s mouth during mastication.
- **Measurable Result:** Reduces active allergen concentration on shed hair and dander by an average of 47% (with statistically significant decreases documented beginning in week 3 of continuous daily consumption).

### Environmental Persistence
- **Decay Profile:** Because secretoglobins possess a high surface-binding affinity (stickiness) and microscopic mass, residual deposits in carpets, drywall, mattresses, and HVAC ducts persist for 20 to 24 weeks (up to 6 months) post-feline habitation unless neutralized through wet extraction and sealed HEPA filtration.

---

## 3. Audit of Consistency Changes Applied Across the Site

The following exact text updates were implemented across repository files to bring all content and tools into strict alignment with this Canonical Facts Sheet:

| File | Location | Prior Text | Updated Canonical Text | Rationale |
| :--- | :--- | :--- | :--- | :--- |
| `content/product-reviews/best-air-purifiers-for-cat-allergies.mdx` | Line 43 | `"typically measuring between 0.1 and 10 microns in diameter"` | `"typically measuring between 2 and 10 microns in diameter (with fine dander particles under 5 microns remaining airborne for hours)"` | Aligned with canonical particle range; removed erratic 0.1 μm lower bound. |
| `content/allergy-guide/how-long-do-cat-allergy-symptoms-last.mdx` | Line 59 | `"aerodynamically tiny (often smaller than 2.5 microns)... take up to 20 to 30 weeks (5 to 7 months)"` | `"aerodynamically tiny (measuring 2 to 10 microns, with fine particles under 5 microns remaining airborne for hours)... take up to 20 to 24 weeks (up to 6 months)"` | Aligned particle size range and home persistence timeline with 6-month benchmark. |
| `content/allergy-guide/how-long-do-cat-allergy-symptoms-last.mdx` | Line 80 | `"reduce the active Fel d 1 in their saliva by nearly 50%"` | `"reduce the active Fel d 1 in their saliva by an average of 47%"` | Standardized to exact published clinical trial mean (47%). |
| `content/allergy-guide/reduce-cat-allergens-at-home.mdx` | Line 61 | `"Microscopic cat dander particles measure between 1 and 10 microns"` | `"Microscopic cat dander particles typically measure between 2 and 10 microns (with fine particles under 5 microns remaining airborne for hours)"` | Aligned lower bound from 1 μm to canonical 2 μm and noted sub-5-micron behavior. |
| `content/allergy-guide/what-causes-cat-allergies.mdx` | Line 84 | `"Over 3 to 10 weeks of continuous feeding, this can lower active salivary allergens by up to 47%"` | `"Beginning by the third week of continuous daily feeding, this lowers active Fel d 1 on hair and dander by an average of 47%"` | Standardized onset timeline to 3 weeks and specified hair/dander reduction metric. |
| `content/allergy-guide/can-i-keep-my-cat-if-im-allergic.mdx` | Line 46 | `"reducing the potency of dried dander by up to 47%"` | `"reducing active Fel d 1 on hair and dander by an average of 47% starting in the third week of daily feeding"` | Aligned LiveClear description with canonical 3-week onset and 47% average reduction. |
| `src/app/tools/allergy-quiz/page.js` | Line 32 | `"summed into three clinically informed tiers"` | `"summed into three structured sensitivity tiers (Mild, Moderate, or High sensitivity) based on manufacturer specs and published ratings"` | Reworded unbacked clinical claims while maintaining diagnostic logic. |
| `src/data/allergy-quiz-data.json` | Line 390 | `"You should only consider lab-tested low-Fel d 1 cats"` | `"You should only consider lower-Fel d 1 cats based on breeder lineage testing and published ratings"` | Reworded generic "lab-tested" assertion to factual specification. |
| `content/product-reviews/best-air-purifiers-for-cat-allergies.mdx` | Line 3, 58, 164 | `"clinical efficacy", "independent laboratory tests", "clinical performance"` | Reworded to `"based on manufacturer specs and published ratings"` and `"tested performance"` | Removed unbacked lab/clinical claims on consumer air purifier hardware. |
| `content/allergy-guide/how-long-do-cat-allergy-symptoms-last.mdx` | Line 74 | `"find units clinically proven to handle fine pet dander"` | `"find top-rated units based on manufacturer specs and published ratings"` | Removed unbacked clinical efficacy claim for air purifiers. |
| `src/app/tools/page.js` | Lines 161, 164 | `"Clinical Science Behind Cat Allergies", "discover clinical strategies"` | `"Science Behind Cat Allergies", "discover evidence-based strategies"` | Reworded loose clinical claims in educational marketing copy. |
