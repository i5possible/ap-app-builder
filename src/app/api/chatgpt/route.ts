import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const { question } = await request.json();
    const apiKey = process.env.OPENAI_API_KEY;
    console.log(`API Key: ${apiKey}`);
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                { role: "user", content: question }
            ],
        }),
    });

    const data = await response.json();
    console.log(data.choices[0].message.content);
    const content = data.choices[0].message.content;
    return NextResponse.json({ data: content });
}
