import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const { question } = await request.json();
    const response = await fetch('http://localhost:11434/api/chat', {
        method: 'POST',
        body: JSON.stringify({
            model: "llama2",
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                { role: "user", content: question }
            ],
            stream: false
        }),
    });

    const data = await response.json();
    console.log(data);
    const content = data.message.content;
    return NextResponse.json({ data: content });
}
