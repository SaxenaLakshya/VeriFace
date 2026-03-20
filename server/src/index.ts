import app from "./server";

const PORT: string | number = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("Server is running on port 5000");
});