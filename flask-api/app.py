from flask import Flask, request, send_file, jsonify
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from reportlab.lib.utils import ImageReader
from reportlab.lib import colors
import io
import requests
from flask_cors import CORS

app = Flask(__name__)
# CORS(app, resources={r"/generate-pdf": {"origins": "http://localhost:5173"}})
CORS(app, resources={r"/generate-pdf": {"origins": "https://ai-travel-planner-gilt.vercel.app"}})

def download_image(url):
    try:
        response = requests.get(url)
        if response.status_code == 200:
            return ImageReader(io.BytesIO(response.content))
    except:
        pass
    return None

@app.route("/generate-pdf", methods=["POST"])
def generate_pdf():
    data = request.get_json()

    if not data or "travelPlan" not in data:
        return jsonify({"error": "Invalid input"}), 400

    # outer = data["travelPlan"]
    # itinerary_data = outer.get("itinerary", {})
    # travel_info = itinerary_data.get("travelPlan", {})
    # itinerary_list = itinerary_data.get("itinerary", [])
    # hotels = travel_info.get("hotels", [])

    outer = data["travelPlan"]
    itinerary_data = outer.get("itinerary", {})

    # Now access the real travel plan inside
    travel_info = itinerary_data.get("travelPlan", {})
    itinerary_list = travel_info.get("itinerary", [])
    hotels = travel_info.get("hotels", [])


    buffer = io.BytesIO()
    pdf = canvas.Canvas(buffer, pagesize=letter)
    width, height = letter
    margin = 40
    y = height - margin

    def new_page():
        nonlocal y
        pdf.showPage()
        pdf.setFont("Helvetica", 11)
        y = height - margin

    # Header
    pdf.setFont("Helvetica-Bold", 18)
    destination = travel_info.get('location', '').encode("ascii", "ignore").decode()
    pdf.setFillColor(colors.darkblue)
    pdf.drawString(margin, y, f"✈️ Travel Plan to {destination}")
    y -= 30
    pdf.setFillColor(colors.black)

    # Summary Info
    pdf.setFont("Helvetica", 12)
    for label, key in [("Duration", "duration"), ("Budget", "budget"), ("Travelers", "travelers")]:
        value = travel_info.get(key, "").encode("ascii", "ignore").decode()
        pdf.drawString(margin, y, f"{label}: {value}")
        y -= 18

    y -= 20

    # Hotels Section
    if hotels:
        pdf.setFont("Helvetica-Bold", 14)
        pdf.drawString(margin, y, "Recommended Hotels:")
        y -= 20
        pdf.setFont("Helvetica", 11)

        for hotel in hotels:
            name = hotel.get("hotelName", "")
            address = hotel.get("hotelAddress", "")
            price = hotel.get("price", "")
            rating = hotel.get("rating", "")
            desc = hotel.get("description", "")
            img_url = hotel.get("hotelImageUrl", "")

            pdf.setFont("Helvetica-Bold", 12)
            pdf.drawString(margin, y, name)
            y -= 15
            pdf.setFont("Helvetica", 11)
            pdf.drawString(margin, y, f"{address}")
            y -= 15
            pdf.drawString(margin, y, f"Price: {price} | Rating: {rating}")
            y -= 15
            pdf.drawString(margin, y, f"{desc}")
            y -= 40

            # Draw image if available
            # img = download_image(img_url)
            # if img:
            #     try:
            #         img_height = 60
            #         img_width = 100
            #         pdf.drawImage(img, margin, y - img_height, width=img_width, height=img_height)
            #         y -= (img_height + 20)
            #     except:
            #         pass

            # if y < 120:
            #     new_page()

            # Draw image if available
            img = download_image(img_url)
            if img:
                try:
                    img_width = 140
                    img_height = 100

                    # Check if space is available, else create a new page
                    if y - img_height < 60:
                        new_page()

                    pdf.drawImage(img, margin, y - img_height, width=img_width, height=img_height)

                    # Optional: Caption below image
                    pdf.setFont("Helvetica-Oblique", 10)
                    pdf.drawString(margin, y - img_height - 12, " Image Preview")

                    y -= img_height + 30  # Additional spacing
                except Exception as e:
                    print(f"Image error: {e}")
                    y -= 10
            else:
                y -= 10



    # Itinerary Section
    pdf.setFont("Helvetica-Bold", 14)
    pdf.drawString(margin, y, "Itinerary:")
    y -= 20
    pdf.setFont("Helvetica", 11)

    # Print for debugging
    print("Itinerary List:", itinerary_list)

    for day in itinerary_list:
        day_title = day.get("day", "").encode("ascii", "ignore").decode()
        pdf.setFont("Helvetica-Bold", 12)
        pdf.drawString(margin + 10, y, day_title)
        y -= 20
        pdf.setFont("Helvetica", 11)

        for place in day.get("plan", []):
            place_name = place.get("placeName", "").encode("ascii", "ignore").decode()
            place_details = place.get("placeDetails", "").encode("ascii", "ignore").decode()
            ticket = place.get("ticketPricing", "")
            best_time = place.get("bestTimeToVisit", "")
            travel_time = place.get("travelTime", "")
            img_url = place.get("placeImageUrl", "")

            pdf.drawString(margin + 20, y, f"Place: {place_name}")
            y -= 15
            pdf.drawString(margin + 30, y, f"Details: {place_details}")
            y -= 15
            if ticket:
                pdf.drawString(margin + 30, y, f"Ticket: {ticket}")
                y -= 15
            if best_time:
                pdf.drawString(margin + 30, y, f"Best Time: {best_time}")
                y -= 15
            if travel_time:
                pdf.drawString(margin + 30, y, f"Travel Time: {travel_time}")
                y -= 15

            # Draw image if available
            img = download_image(img_url)
            if img:
                try:
                    img_height = 60
                    img_width = 100
                    pdf.drawImage(img, margin + 30, y - img_height, width=img_width, height=img_height)
                    y -= (img_height + 20)
                except Exception as e:
                    print(f"Image error: {e}")
                    y -= 10
            else:
                y -= 10

            if y < 120:
                pdf.showPage()
                pdf.setFont("Helvetica", 11)
                y = height - margin

        y -= 20


    pdf.save()
    buffer.seek(0)
    return send_file(buffer, as_attachment=True, download_name="travel_plan.pdf", mimetype="application/pdf")


if __name__ == "__main__":
    app.run(debug=True)
