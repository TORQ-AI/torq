# Strava Activity Image Generator

## OpenSpec Instructions

These instructions are for AI assistants working in this project.

Always open `@/openspec/AGENTS.md` when the request:
- Mentions planning or proposals (words like proposal, spec, change, plan)
- Introduces new capabilities, breaking changes, architecture shifts, or big performance/security work
- Sounds ambiguous and you need the authoritative spec before coding

Use `@/openspec/AGENTS.md` to learn:
- How to create and apply change proposals
- Spec format and conventions
- Project structure and guidelines

Keep this managed block so 'openspec update' can refresh the instructions.

## System Purpose

This system is an **AI-powered image generator for Strava activities** that creates personalized, artistic visualizations based on activity data. The system transforms structured Strava activity metadata into safe, deterministic, and aesthetically pleasing images that capture the essence of athletic achievements.

## Core Functionality

The system operates as a **rule-based, deterministic pipeline** that:

1. **Ingests Strava activity data** via the [Strava API](https://developers.strava.com/).
2. **Extracts semantic signals** from activity metadata (type, distance, heart rate, elevation, tags, etc.).
3. **Generates text prompts** following strict safety and content guardrails
4. **Creates artistic images** using AI image generation models.
5. **Validates outputs** to ensure compliance with all system constraints.

## Key Design Principles

### Determinism and Predictability

- Given identical inputs, the system **MUST** produce identical classification and style decisions.
- Randomness is bounded and controlled.
- Behavior is predictable and reproducible.

### Safety First

- All content **MUST** pass through multiple layers of guardrails.
- User-provided text is never copied verbatim into prompts.
- Forbidden content (real persons, political symbols, violence, etc.) is strictly prohibited.
- Fallback mechanisms ensure the system always produces valid, safe outputs.

### Semantic Signal Processing

- User text (activity names, descriptions, tags) undergoes semantic extraction.
- Only normalized, safe signals influence image generation.
- Brand names may be used contextually when originating from gear metadata.

### Multi-Level Specification Architecture

The system follows a strict hierarchical specification structure:
- _Level 0:_: Meta-specifications defining the system architecture.
- _Level 1:_: Global guardrails ensuring safety and consistency.
- _Level 2:_: Domain specifications (e.g., for the prompt generation logic).
- _Level 3:_: Integration specifications.
- _Level 4:_: Implementation notes (optional).

## Supported Activity Types

The system supports all Strava activity types including but not limited to:
- **Running**: Run, Trail Run, Virtual Run.
- **Cycling**: Ride, Virtual Ride, E-Bike Ride.
- **Water**: Swim, Surfing, Canoeing, Kayaking.
- **Winter**: Alpine Ski, Backcountry Ski, Nordic Ski, Snowboard.
- **Fitness**: Workout, Yoga, Weight Training, CrossFit.
- **Walking**: Walk, Hike.
- **Other**: Rock Climbing, Golf, Soccer, Tennis, and more.

## Visual Styles

The system generates images in four allowed artistic styles:
- **Cartoon**: Colorful, friendly illustrations.
- **Minimal**: Simple, clean designs.
- **Abstract**: Artistic, non-literal representations.
- **Illustrated**: Detailed, artistic renderings.

Photorealistic and hyper-detailed styles are explicitly forbidden to maintain artistic consistency and avoid uncanny valley effects.

## Image Characteristics

Generated images feature:
- **Aspect ratios**: `1:1` or `16:9`.
- **Subjects**: 1-3 primary visual elements.
- **No text elements**: Pure visual representation.
- **Neutral backgrounds**: Non-distracting, activity-focused.
- **Safe content**: Family-friendly, inclusive imagery.

## Activity Signal Processing

The system processes multiple data points to create contextually appropriate images.

### Intensity Classification

- **Low**: Recovery, easy, relaxed activities.
- **Medium**: Steady, focused, moderate efforts. 
- **High**: Intense, demanding, race-level activities.

### Environmental Context

- **Elevation**: Flat, rolling, or mountainous terrain.
- **Time of day**: Morning freshness, daylight brightness, evening warmth, and night drama.
- **Weather**: When available, influences atmosphere and mood.
- **Location**: Country/region for appropriate scenery.

### Semantic Tags

Strava tags influence mood and scene composition:
- `recovery` → Calm, gentle atmosphere.
- `race` → Competitive, intense energy.
- `with kid` → Playful, family-friendly scenes.
- `long run` → Endurance-focused imagery.
- `commute` → Urban, routine settings.

## Prompt Generation Pipeline

1. **Input Validation**: Ensure required fields are present.
2. **Signal Extraction**: Process user text safely.
3. **Classification**: Determine activity type, intensity, environment, and other characteristics.
4. **Style Selection**: Choose appropriate visual style deterministically.
5. **Mood Mapping**: Align emotional tone with activity characteristics.
6. **Scene Composition**: Build environment and atmosphere.
7. **Prompt Assembly**: Construct text prompt (≤400 characters).
8. **Validation**: Ensure compliance with all guardrails.
9. **Fallback**: Use safe defaults if validation fails.

## Error Handling and Resilience

The system implements multiple layers of resilience:
- **Retry logic**: Maximum 2 retries with prompt simplification.
- **Fallback prompts**: Safe, minimal defaults when generation fails.
- **Graceful degradation**: Prefer partial success over complete failure.
- **Silent failures**: User-facing errors are handled gracefully.
- **Always valid output**: System never returns empty or corrupted results.

## Compliance and Governance

All system components **MUST** comply with:
- The Zero Specification (highest authority).
- _Level 1_ Guardrails (safety and content constraints).
- Domain specifications for their respective areas.
- Validation checklists for specification compliance.

## Future Extensibility

The specification architecture allows for controlled evolution:
- New activity types can be added with appropriate classification rules.
- Additional visual styles may be introduced after guardrail review.
- Integration specifications (_Level 3_) define component interactions.
- Implementation details remain separate from behavioral rules.

## Summary

This AI image generator transforms Strava activities into artistic visualizations through a **deterministic, safe, and extensible pipeline**. By combining strict guardrails with semantic signal processing, the system creates personalized images that celebrate athletic achievements while maintaining predictable behavior and content safety.

The multi-level specification architecture ensures that the system can evolve while preserving its core principles of safety, determinism, and artistic quality.
