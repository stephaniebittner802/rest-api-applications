from flask import Flask, render_template, request, jsonify
from openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv()
app = Flask(__name__)
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
# OPENAI_API_KEY=sk-xxxxxxxxxxxx


# -----------------------------------
# GET: show the website homepage
# -----------------------------------
@app.route("/", methods=["GET"])
def home():
    return render_template("index.html")


# -----------------------------------
# POST: create a new OpenAI response
# -----------------------------------
@app.route("/ask", methods=["POST"])
def ask():
    data = request.get_json()
    user_message = data.get("message", "")

    response = client.responses.create(
        model="gpt-5.4",
        input=user_message
    )

    return jsonify({
        "id": response.id,
        "reply": response.output_text
    })


# -----------------------------------
# GET: retrieve a previous response by ID
# -----------------------------------
@app.route("/response/<response_id>", methods=["GET"])
def get_response(response_id):
    response = client.responses.retrieve(response_id)

    return jsonify({
        "id": response.id,
        "status": response.status
    })


# -----------------------------------
# DELETE: delete a previous response by ID
# -----------------------------------
@app.route("/response/<response_id>", methods=["DELETE"])
def delete_response(response_id):
    result = client.responses.delete(response_id)

    return jsonify({
        "deleted": True,
        "result": str(result)
    })


if __name__ == "__main__":
    app.run(debug=True)
