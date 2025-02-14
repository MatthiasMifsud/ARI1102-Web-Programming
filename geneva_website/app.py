import json, os
from flask import Flask, send_from_directory, request, jsonify
app = Flask(__name__, static_url_path = '', static_folder = 'dist')

reviewsFile = "reviews.json"
if not os.path.exists(reviewsFile):
   with open(reviewsFile, "w") as file:
      json.dump([], file)


@app.route("/")
@app.route("/<path:filename>")
def webFile(filename = "home.html"):
   return app.send_static_file(filename)


@app.route("/submit", methods = ["GET", "POST"])
def submitform():

#Posting all reviews
   if request.method == "POST":

      currentDate = request.form.get("Current_Date", "")
      name = request.form.get("Name", "")
      message = request.form.get("Message", "")


      review = {
         "Current_Date" : currentDate,
         "Name" : name,
         "Message" : message
      }

      with open(reviewsFile, "r") as file:
         reviews = json.load(file)

      reviews.append(review)

      with open(reviewsFile, "w") as file:
         json.dump(reviews, file)

      return jsonify(review)

#Getting all reviews
   elif request.method == "GET":
   
      with open(reviewsFile, "r") as file:         
         reviews = json.load(file)

      return jsonify(reviews)
     
