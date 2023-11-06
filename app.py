from flask import Flask, send_file

app = Flask(__name__)

@app.route("/")
def index():
    return send_file("index.html")

@app.route("/audio/<path:filename>")
def serve_audio(filename):
    return send_file("audio/" + filename)

@app.route("/image/<path:filename>")
def serve_image(filename):
    return send_file("image/" + filename)

if __name__ == "__main__":
    app.run(debug=True)

