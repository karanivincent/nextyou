import type { FormData } from '$lib/types';

interface FDIResult {
	fdi: number;
	bi: number;
	ti: number;
	ri: number;
}

/**
 * Calculates the Final Development Index (FDI) based on user form data
 * FDI = (0.35 × BI) + (0.40 × TI) + (0.25 × RI)
 */
export function calculateFDI(data: FormData): FDIResult {
	// ===== BIOLOGICAL INDEX (BI) =====
	const ageFactor = {
		young: 1.15, // 18-25: Optimal hormonal response
		adult: 1.0, // 26-40: Stable response
		midage: 0.88, // 41-55: Declining hormones
		older: 0.75 // 56+: Reduced capacity
	}[data.age!];

	const genderFactor = {
		man: 1.1, // Higher testosterone
		woman: 1.0, // Baseline
		divers: 1.0 // Baseline
	}[data.gender!];

	const bi = ageFactor * genderFactor;

	// ===== TRAINING INDEX (TI) =====
	const freqScore = {
		1: 0.6, // < 2 sessions: Minimal stimulus
		2: 0.9, // 2-3 sessions: Moderate stimulus
		4: 1.1, // 4-5 sessions: Optimal stimulus
		6: 1.3 // > 6 sessions: High stimulus
	}[data.frequency!];

	const trainingTypeComposite = {
		cardio: 0.85, // Fat loss, minimal hypertrophy
		strength: 1.15, // Maximum hypertrophy
		hybrid: 1.0 // Balanced approach
	}[data.style!];

	const intensityMultiplier = {
		light: 0.8, // 50-65% 1RM
		moderate: 1.0, // 65-80% 1RM
		intense: 1.2 // 80-95% 1RM
	}[data.intensity!];

	// Duration multiplier based on timeframe (months)
	const durationMultiplier = 1 + (data.timeframe! - 1) * 0.15;

	const ti = freqScore * intensityMultiplier * trainingTypeComposite * durationMultiplier;

	// ===== RECOVERY INDEX (RI) =====
	const sleepMultiplier = data.sleep / 10; // Convert 1-10 scale to 0.1-1.0

	const stressMultiplier = 1.0 - (data.stress - 1) / 9 * 0.4; // Inverse: lower stress = higher multiplier

	const energyBalance = {
		loss: 0.85, // Caloric deficit: -15% recovery
		maint: 1.0, // Maintenance: Optimal recovery
		gain: 1.1 // Caloric surplus: +10% recovery
	}[data.nutrition!];

	const ri = sleepMultiplier * stressMultiplier * energyBalance;

	// ===== FINAL FDI =====
	const fdi = 0.35 * bi + 0.4 * ti + 0.25 * ri;

	return {
		fdi: Number(fdi.toFixed(3)),
		bi: Number(bi.toFixed(3)),
		ti: Number(ti.toFixed(3)),
		ri: Number(ri.toFixed(3))
	};
}

/**
 * Generates the enhanced Gemini prompt with FDI integration
 */
export function generatePrompt(data: FormData, fdiResult: FDIResult): string {
	const { fdi } = fdiResult;

	return `You are an expert sports medicine physician and body transformation specialist with deep understanding of exercise physiology, biomechanics, and realistic human body adaptation timelines.

TASK: Generate a scientifically accurate fitness transformation photo showing realistic results after ${data.timeframe} ${data.timeframe === 1 ? 'month' : 'months'} of consistent training.

CLIENT PROFILE:
- Age: ${data.age === 'young' ? '18-25' : data.age === 'adult' ? '26-40' : data.age === 'midage' ? '41-55' : '56+'}
- Gender: ${data.gender === 'man' ? 'Male' : data.gender === 'woman' ? 'Female' : 'Other'}
- Training frequency: ${data.frequency === 1 ? '<2' : data.frequency === 2 ? '2-3' : data.frequency === 4 ? '4-5' : '>6'} sessions per week
- Training style: ${data.style}
- Workout intensity: ${data.intensity}
- Nutrition strategy: ${data.nutrition === 'loss' ? 'Fat loss (caloric deficit)' : data.nutrition === 'maint' ? 'Maintenance (maintenance calories)' : 'Muscle gain (caloric surplus)'}
- Sleep quality: ${data.sleep}/10
- Stress level: ${data.stress}/10

CALCULATED FDI (Final Development Index): ${fdi}
(Range: 0.349 = minimal change, 1.921 = maximal natural change for timeframe)

CRITICAL TRANSFORMATION REQUIREMENTS:

1. SCIENTIFIC REALISM - Base ALL changes on FDI value ${fdi}:
   ${fdi < 0.6 ? '- Very minimal visible changes (FDI <0.6)' : ''}
   ${fdi >= 0.6 && fdi < 0.9 ? '- Subtle but noticeable improvements (FDI 0.6-0.9)' : ''}
   ${fdi >= 0.9 && fdi < 1.2 ? '- Moderate, realistic progress (FDI 0.9-1.2)' : ''}
   ${fdi >= 1.2 && fdi < 1.5 ? '- Strong, well-earned results (FDI 1.2-1.5)' : ''}
   ${fdi >= 1.5 ? '- Impressive but still naturally achievable (FDI 1.5+)' : ''}

2. BODY COMPOSITION CHANGES (${data.nutrition} protocol):
   ${data.nutrition === 'loss' ? `- Gradual fat loss: Estimate ${Math.min(data.timeframe! * 2, 12)}% body fat reduction
   - Preserve muscle mass (slight definition increase from fat loss)
   - No dramatic muscle growth due to caloric deficit` : ''}
   ${data.nutrition === 'maint' ? `- Minor recomposition: Small fat loss + small muscle gain
   - Improved muscle definition from better conditioning
   - Maintain overall body weight` : ''}
   ${data.nutrition === 'gain' ? `- Muscle hypertrophy: Estimate ${Math.min(data.timeframe! * 0.5, 6)}kg lean mass gain
   - Some fat gain is natural (80/20 muscle/fat ratio in surplus)
   - Fuller muscle bellies, especially in trained areas` : ''}

3. MUSCLE DEVELOPMENT (${data.style} training, ${data.intensity} intensity):
   ${data.style === 'strength' ? `- Focus on compound lift areas: chest, back, shoulders, legs
   - Dense, hard muscle appearance (low glycogen look)
   - Visible strength gains in posture and muscle thickness` : ''}
   ${data.style === 'cardio' ? `- Lean, athletic physique with minimal bulk
   - Enhanced vascularity and muscle separation
   - Reduced subcutaneous fat, especially around core` : ''}
   ${data.style === 'hybrid' ? `- Balanced development: size + definition
   - Moderate hypertrophy with good conditioning
   - Athletic, functional appearance` : ''}

4. TIMEFRAME-SPECIFIC EXPECTATIONS (${data.timeframe} ${data.timeframe === 1 ? 'month' : 'months'}):
   ${data.timeframe! <= 3 ? `- Early-stage "newbie gains" if applicable
   - Initial muscle pumps and glycogen retention
   - Posture improvements and core engagement
   - DO NOT show dramatic size increases` : ''}
   ${data.timeframe! > 3 && data.timeframe! <= 6 ? `- Noticeable progress in primary muscle groups
   - Clear definition improvements
   - Visible strength adaptations
   - Still conservative changes (no Instagram transformations)` : ''}
   ${data.timeframe! > 6 ? `- Significant natural progress
   - Well-developed muscle groups
   - Lean, athletic physique if in deficit
   - Maintain natural look (no steroid-like mass)` : ''}

5. RECOVERY & LIFESTYLE FACTORS:
   - Sleep quality (${data.sleep}/10): ${data.sleep >= 7 ? 'Optimal recovery - better results' : data.sleep >= 4 ? 'Moderate recovery - average results' : 'Poor recovery - limited results'}
   - Stress level (${data.stress}/10): ${data.stress <= 4 ? 'Low stress - optimal hormonal environment' : data.stress <= 7 ? 'Moderate stress - slightly impaired recovery' : 'High stress - significantly reduced progress'}

6. PHOTOGRAPHY & PRESENTATION:
   - Modern gym environment (clean, well-lit)
   - Subject wearing black athletic shorts (no shirt for clear comparison)
   - Same lighting, angle, and pose as original photo
   - Neutral, determined facial expression
   - Maintain exact same person identity and facial features
   - Natural skin texture (no airbrushing or fake tan)
   - Realistic muscle striations and vascularity for body fat level

AVOID THESE COMMON AI TRANSFORMATION ERRORS:
❌ DO NOT create exaggerated "social media transformation" results
❌ DO NOT add 20kg of muscle in 8 weeks (biologically impossible)
❌ DO NOT show sub-8% body fat unless timeframe and deficit support it
❌ DO NOT add fake vascularity or unnatural muscle definition
❌ DO NOT change the person's face, bone structure, or identifying features
❌ DO NOT create "Instagram filter" smooth skin or fake lighting
❌ DO NOT ignore the calculated FDI value (${fdi})

VERIFICATION CHECKLIST:
✓ Transformation aligns with FDI value ${fdi}
✓ Changes are achievable in ${data.timeframe} ${data.timeframe === 1 ? 'month' : 'months'}
✓ Body fat percentage change is realistic for ${data.nutrition} protocol
✓ Muscle gain matches training style (${data.style}) and intensity (${data.intensity})
✓ Recovery factors (sleep ${data.sleep}/10, stress ${data.stress}/10) are reflected
✓ Same person, same pose, same environment
✓ Professional sports medicine accuracy maintained

Generate the transformation image now, strictly following these evidence-based guidelines.`;
}
