export async function generatePDF(travelPlan) {
  try {
    const res = await fetch("https://aitravelplanner-yrsl.onrender.com/generate-pdf", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ travelPlan }),
    });

    if (!res.ok) {
      throw new Error("PDF generation failed");
    }

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "Travel_Plan.pdf";
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);

  } catch (error) {
    console.error("PDF download error:", error);
  }
}
