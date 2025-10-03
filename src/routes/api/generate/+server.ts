import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { GenerateRequest, GenerateResponse } from '$lib/types';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const body: GenerateRequest = await request.json();

		// Validate required fields
		if (
			!body.age ||
			!body.gender ||
			!body.frequency ||
			!body.timeframe ||
			!body.style ||
			!body.intensity ||
			!body.nutrition ||
			!body.photo
		) {
			return json(
				{
					error: 'Missing required fields'
				} as GenerateResponse,
				{ status: 400 }
			);
		}

		// Get Gemini API key from environment
		const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

		if (!GEMINI_API_KEY) {
			throw new Error('GEMINI_API_KEY not configured');
		}

		// Build transformation prompt based on user inputs
		const prompt = `Transform this fitness photo to show realistic changes after ${body.timeframe} ${body.timeframe === 1 ? 'month' : 'months'} of consistent training.

Training parameters:
- Age group: ${body.age}
- Gender: ${body.gender}
- Training frequency: ${body.frequency} sessions per week
- Training style: ${body.style}
- Workout intensity: ${body.intensity}
- Nutrition goal: ${body.nutrition}
- Sleep quality: ${body.sleep}/10
- Stress level: ${body.stress}/10

Generate a realistic transformation showing:
- Muscle development appropriate for ${body.style} training at ${body.intensity} intensity
- Body composition changes based on ${body.nutrition} nutrition goal
- Natural, achievable results for ${body.timeframe} ${body.timeframe === 1 ? 'month' : 'months'} timeframe
- Same lighting, pose, and background as the original photo
- Maintain the person's identity and facial features
- Realistic body fat percentage changes
- Natural skin texture and muscle definition

IMPORTANT: Keep the transformation realistic and achievable for the given timeframe. Do not create exaggerated or unrealistic changes.`;

		// Remove data URL prefix from base64 image
		const imageData = body.photo.replace(/^data:image\/\w+;base64,/, '');

		// Gemini 2.5 Flash Image API endpoint
		const GEMINI_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent';

		// Call Gemini API
		const response = await fetch(GEMINI_ENDPOINT, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'x-goog-api-key': GEMINI_API_KEY
			},
			body: JSON.stringify({
				contents: [
					{
						parts: [
							{
								inline_data: {
									mime_type: 'image/jpeg',
									data: imageData
								}
							},
							{
								text: prompt
							}
						]
					}
				],
				generationConfig: {
					responseModalities: ['Image']
				}
			})
		});

		if (!response.ok) {
			const errorText = await response.text();
			throw new Error(`Gemini API error (${response.status}): ${errorText}`);
		}

		const data = await response.json();

		// Extract generated image from response
		const candidates = data.candidates;
		if (!candidates || candidates.length === 0) {
			throw new Error('No image generated in response');
		}

		const parts = candidates[0].content.parts;
		let generatedImageBase64 = null;

		for (const part of parts) {
			if (part.inline_data) {
				generatedImageBase64 = part.inline_data.data;
				break;
			}
		}

		if (!generatedImageBase64) {
			throw new Error('No image data found in response');
		}

		// Return as data URL for easy display
		return json({
			generatedImageBase64: `data:image/png;base64,${generatedImageBase64}`
		} as GenerateResponse);
	} catch (error) {
		console.error('Gemini API Error:', error);
		return json(
			{
				error: error instanceof Error ? error.message : 'Failed to generate transformation'
			} as GenerateResponse,
			{ status: 500 }
		);
	}
};
