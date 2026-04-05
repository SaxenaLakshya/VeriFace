import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({
        message: "The API is working properly."
    });
}

export async function POST(request: Request) {
    try {
        const { name, profession, place, review }: any = await request.json();
        console.log(name, profession, place, review);
        return NextResponse.json({
            message: "Review submitted successfully"
        });
    } catch (error) {
        console.error("Error submitting review:", error);
        return NextResponse.json({ error: "Failed to submit review" }, { status: 500 });
    }
}