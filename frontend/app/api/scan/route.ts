import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const serverUrl: string = process.env.SERVER_URL || "http://localhost:5000";
  try {
    // 1. Get form data from frontend
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // 2. Create new FormData to send to Flask (localhost:5000)
    const backendFormData = new FormData();
    backendFormData.append("file", file);

    // 3. Send to backend
    const response = await fetch(`${serverUrl}/upload`, {
      method: "POST",
      body: backendFormData,
    });

    const data = await response.json();

    // 4. Log response (for now)
    // console.log("Response from backend:", data);

    // 5. Pre-processing the API Data before sending to frontend
    const responseData = {
        imageUrl: data.url,
        result: (data.class === "real") ? "REAL" : "AI-GENERATED",
        confidence: data.confidence * 100,
    };

    // 6. Send response back to frontend (optional but useful)
    return NextResponse.json(responseData);

  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}