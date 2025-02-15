# ARI1102 - Web Programming  
**Assignment: Programming in AI (Web Programming)**  
**University of Malta**  

This project is a website dedicated to Geneva, Switzerland. It provides key details about the city while offering a user-friendly and functional experience. The website includes multiple pages, such as a homepage, history, attractions, and a user review section. Additionally, it features a toggleable dark mode for enhanced user experience.

---

## Features  
- **Homepage**: Overview of Geneva with key highlights.  
- **History Page**: Detailed information about Geneva's rich history.  
- **Attractions Page**: Showcase of popular tourist spots and landmarks.  
- **User Review Page**: A section for users to share their experiences and feedback.  
- **Dark Mode**: Toggle between light and dark themes for better readability.  

---

## Preview  

### Homepage  
![Homepage Preview](https://github.com/user-attachments/assets/6a9b0322-6a73-4c30-8741-2465cd071080)  

### History Page  
![History Page Preview](https://github.com/user-attachments/assets/a532ee9d-8143-4c83-929d-9e4e2ebd1406)  

### Attractions Page  
![Attractions Page Preview](https://github.com/user-attachments/assets/16d28efe-5577-45b9-b0dd-37d6ccdab31f)  

### User Review Page  
![User Review Page Preview](https://github.com/user-attachments/assets/0a778cc9-c61f-46ca-bb43-212d5f970ec5)  

### Dark Mode Toggle  
![Dark Mode Preview](https://github.com/user-attachments/assets/4ba39a8c-e426-4c6e-bc18-ddeb7149ef20)  

---

## How to Run  
It is runnable thorugh finding the html files in geneva_website/dist but to use the full website you need to host it on a apache server with flask behind it. All necessary scripts are written for this just make sure your config files are correct for local host. Additionally make sure that in your linux os you have apache and flask installed.

After everything is done search in the bash terminal the directory of the web files:

```bash
 cd /path/to/your/directory
```

then when you find the folder that holds all the files (including the json and python files) enter the following command:

```bash
 sudo flask run --host 0.0.0.0
```

Now your website is running locally on http://your-ip-addtress.com
---

# How to Run the Application

This application can be run in two ways:

1. Directly accessing the HTML files in `geneva_website/dist`.
2. Hosting the full website using an Apache server with Flask running behind it.

All necessary scripts are provided. Ensure your configuration files are correctly set up for local hosting. Additionally, make sure Apache and Flask are installed on your Linux OS.

## Prerequisites

Before proceeding, ensure the following are installed on your system:

- **Apache**: The web server.
- **Flask**: The Python web framework.
- **Python**: Installed and configured.

To install these dependencies, run the following commands:

```bash
sudo apt update
sudo apt install apache2
sudo apt install python3-pip
pip3 install flask
```

## Running the Application

### 1. Running Flask Locally

To run the Flask application locally, follow these steps:

Navigate to the directory containing your web files:

```bash
cd /path/to/your/directory
```

Start the Flask application:

```bash
sudo flask run --host 0.0.0.0
```

Once the application is running, you can access it in your browser at:

```
http://your-ip-address:5000
```

Replace `your-ip-address` with your machine's IP address.

### 2. Hosting with Apache and Flask

To host the full website using Apache with Flask running behind it:

Set up Apache to serve the Flask application. You can either:

- Use `mod_wsgi` to integrate Flask directly with Apache.
- Configure Apache as a reverse proxy to forward requests to the Flask app running on a WSGI server.

#### Example Apache Configuration (for reverse proxy):

Edit your Apache configuration file and add the following:

```apache
<VirtualHost *:80>
    ServerName your-domain-or-ip

    ProxyPass / http://127.0.0.1:5000/
    ProxyPassReverse / http://127.0.0.1:5000/
</VirtualHost>
```

Replace `your-domain-or-ip` with your domain name or IP address.

Restart Apache to apply the changes:

```bash
sudo systemctl restart apache2
```

Ensure your Flask application is running:

```bash
sudo flask run --host 0.0.0.0
```

Access your website at:

```
http://your-domain-or-ip
```

## Notes

- Ensure all configuration files (e.g., Apache, Flask) are correctly set up for your local environment.
- If you encounter permission issues, ensure the appropriate permissions are set for the web files and directories.
- For production environments, consider using a WSGI server instead of running Flask directly through PROXY reverse.


## Documentation

For further details about the project, refer to the documentation PDF included in the main branch.
