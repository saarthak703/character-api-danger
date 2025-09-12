from flask import Flask, send_file, jsonify
import requests
from io import BytesIO
import os

app = Flask(__name__)

# Character ID to image mapping
character_map = {
    "806": "102000008.png",    # Kla
    "306": "102000006.png",    # Ford
    "906": "101000009.png",    # Paloma
    "2406": "101000016.png",   # Notora
    "1003": "102000009.png",   # Miguel
    "2306": "102000016.png",   # Alvaro
    "6306": "102000016.png",   # Awaken Alvaro
    "7506": "101000053.png",   # Rin
    "1306": "102000010.png",   # Antonio
    "2006": "102000014.png",   # Joseph
    "2106": "101000014.png",   # Shani
    "2806": "101100018.png",   # Kapella
    "7206": "102000051.png",   # Koda
    "7006": "101000049.png",   # Kassie
    "6906": "102000046.png",   # Kairos
    "6806": "102000045.png",   # Ryden
    "6706": "102000044.png",   # Ignis
    "6606": "101000028.png",   # Suzy
    "6506": "101000027.png",   # Sonia
    "6206": "102000041.png",   # Orion
    "6006": "102000040.png",   # Santino
    "5306": "101000026.png",   # Luna
    "5806": "102000039.png",   # Tatsuya
    "5606": "101000025.png",   # Iris
    "5706": "102000038.png",   # J.Biebs
    "5506": "102000037.png",   # Homer
    "5406": "102000036.png",   # Kenta
    "5206": "102000034.png",   # Nairi
    "5006": "102000033.png",   # Otho
    "4906": "102000032.png",   # Leon
    "4606": "102000030.png",   # Thiva
    "4706": "102000031.png",   # Dimitri
    "4506": "102000029.png",   # D-bee
    "4306": "102000028.png",   # Maro
    "4006": "102000025.png",   # Skyler
    "4406": "101000022.png",   # Xayne
    "4106": "102000026.png",   # Shirou
    "3806": "102000024.png",   # Chrono
    "3506": "101000020.png",   # Dasha
    "3406": "102000022.png",   # K
    "2906": "102000018.png",   # Luqueta
    "206": "101000006.png",    # Kelly
    "1506": "102000012.png",   # Hayato Yagami
    "1406": "101000023.png",   # Moco
    "2606": "101000017.png",   # Steffie
    "606": "101000008.png",    # Misha
    "706": "102000007.png",    # Maxim
    "406": "102000005.png",    # Andrew
    "7106": "101000050.png",   # Lila
    "1106": "101000010.png",   # Caroline
    "1706": "101000012.png",   # Laura
    "1806": "102000013.png",   # Rafael
    "2206": "102000015.png",   # Alok
    "2706": "102000017.png",   # Jota
    "3106": "101000019.png",   # Clu
    "3006": "102200019.png",   # Wolfrahh
    "3306": "102000021.png",   # Jai
    "4203": "102000005.png",   # Awaken Andrew
    "4806": "101000023.png",   # Awaken Moco
    "3203": "102000012.png",   # Awaken Hayato
    "2506": "101000006.png",   # Awaken Kelly
    "22016": "102000015.png",  # Awaken Alok
    "506": "101000007.png",    # Nikita
    "1906": "101000013.png",   # A124
    "7406": "102000052.png",   # Oscar
    "1206": "102000011.png",   # Wukong
    "106": "101000005.png"     # Olivia
}

@app.route('/api/<id>')
def get_character_image(id):
    # Remove .bin extension if present
    if id.endswith('.bin'):
        id = id[:-4]  # Remove the last 4 characters (.bin)
    
    # Determine if it's a character ID (3-6 digits) or skill ID (8-11 digits)
    if len(id) >= 3 and len(id) <= 6:
        # Character ID
        filename = character_map.get(id)
    elif len(id) >= 8 and len(id) <= 11:
        # Skill ID - use directly as filename with .png extension
        filename = f"{id}.png"
    else:
        return jsonify({"error": "Invalid ID format"}), 404
    
    if not filename:
        return jsonify({"error": "ID not found"}), 404
    
    # GitHub raw content URL
    github_url = f"https://raw.githubusercontent.com/saarthak703/character-api-danger/main/pngs/{filename}"
    
    try:
        # Fetch image from GitHub
        response = requests.get(github_url, timeout=10)
        
        if response.status_code == 200:
            # Create a BytesIO object from the response content
            img_data = BytesIO(response.content)
            
            # Return the image with proper headers
            return send_file(
                img_data,
                mimetype='image/png',
                as_attachment=False,
                download_name=filename
            )
        else:
            return jsonify({"error": "File not found on GitHub"}), 404
            
    except Exception as e:
        print(f"Error fetching image: {e}")
        return jsonify({"error": "Error fetching image"}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
