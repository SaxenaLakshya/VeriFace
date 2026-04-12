import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const reviewData = await request.json();

        const response = await fetch("http://localhost:5000/review", {
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