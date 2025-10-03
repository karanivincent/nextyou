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

		// TODO: Get actual API endpoint from team
		// For now, using placeholder endpoint
		const AI_API_ENDPOINT = process.env.AI_API_ENDPOINT || 'https://placeholder-api.example.com/generate';

		// Call team's AI API
		const response = await fetch(AI_API_ENDPOINT, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				// Add API key if needed
				// 'Authorization': `Bearer ${process.env.AI_API_KEY}`
			},
			body: JSON.stringify({
				age: body.age,
				gender: body.gender,
				frequency: body.frequency,
				timeframe: body.timeframe,
				style: body.style,
				intensity: body.intensity,
				nutrition: body.nutrition,
				sleep: body.sleep,
				stress: body.stress,
				photo: body.photo
			})
		});

		if (!response.ok) {
			throw new Error(`AI API responded with status: ${response.status}`);
		}

		const aiResponse = await response.json();

		// Return the AI-generated image
		return json({
			generatedImageUrl: aiResponse.generatedImageUrl,
			generatedImageBase64: aiResponse.generatedImageBase64
		} as GenerateResponse);
	} catch (error) {
		console.error('API Error:', error);
		return json(
			{
				error: error instanceof Error ? error.message : 'Failed to generate transformation'
			} as GenerateResponse,
			{ status: 500 }
		);
	}
};
