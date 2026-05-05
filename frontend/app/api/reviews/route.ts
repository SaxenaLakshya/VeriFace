import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const serverUrl = process.env.SERVER_URL || "http://localhost:5000";
    try {
        const reviewData = await request.json();

        const response = await fetch(`${serverUrl}/review`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(reviewData),
        });
        if (response.status != 201) {
            throw new Error("Failed to send data to backend");
        }

        return NextResponse.json({ message: "Review submitted successfully" });
    } catch (error) {
        console.error("Error submitting review:", error);
        return NextResponse.json(
            { error: "Failed to submit review" },
            { status: 500 }
        );
    }
}