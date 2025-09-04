import { createReadStream } from 'fs';
import { join } from 'path';

export default function handler(req, res) {
  const { id } = req.query;
  
  // Character ID to image mapping
  const characterMap = {
    "806": "102000008.png",    // Kla
    "306": "102000006.png",    // Ford
    "906": "101000009.png",    // Paloma
    "2406": "101000016.png",   // Notora
    "1003": "102000009.png",   // Miguel
    "2306": "102000016.png",   // Alvaro
    "6306": "102000016.png",   // Awaken Alvaro
    "7506": "101000053.png",   // Rin
    "1306": "102000010.png",   // Antonio
    "2006": "102000014.png",   // Joseph
    "2106": "101000014.png",   // Shani
    "2806": "101100018.png",   // Kapella
    "7206": "102000051.png",   // Koda
    "7006": "101000049.png",   // Kassie
    "6906": "102000046.png",   // Kairos
    "6806": "102000045.png",   // Ryden
    "6706": "102000044.png",   // Ignis
    "6606": "101000028.png",   // Suzy
    "6506": "101000027.png",   // Sonia
    "6206": "102000041.png",   // Orion
    "6006": "102000040.png",   // Santino
    "5306": "101000026.png",   // Luna
    "5806": "102000039.png",   // Tatsuya
    "5606": "101000025.png",   // Iris
    "5706": "102000038.png",   // J.Biebs
    "5506": "102000037.png",   // Homer
    "5406": "102000036.png",   // Kenta
    "5206": "102000034.png",   // Nairi
    "5006": "102000033.png",   // Otho
    "4906": "102000032.png",   // Leon
    "4606": "102000030.png",   // Thiva
    "4706": "102000031.png",   // Dimitri
    "4506": "102000029.png",   // D-bee
    "4306": "102000028.png",   // Maro
    "4006": "102000025.png",   // Skyler
    "4406": "101000022.png",   // Xayne
    "4106": "102000026.png",   // Shirou
    "3806": "102000024.png",   // Chrono
    "3506": "101000020.png",   // Dasha
    "3406": "102000022.png",   // K
    "2906": "102000018.png",   // Luqueta
    "206": "101000006.png",    // Kelly
    "1506": "102000012.png",   // Hayato Yagami
    "1406": "101000023.png",   // Moco
    "2606": "101000017.png",   // Steffie
    "606": "101000008.png",    // Misha
    "706": "102000007.png",    // Maxim
    "406": "102000005.png",    // Andrew
    "7106": "101000050.png",   // Lila
    "1106": "101000010.png",   // Caroline
    "1706": "101000012.png",   // Laura
    "1806": "102000013.png",   // Rafael
    "2206": "102000015.png",   // Alok
    "2706": "102000017.png",   // Jota
    "3106": "101000019.png",   // Clu
    "3006": "102200019.png",   // Wolfrahh
    "3306": "102000021.png",   // Jai
    "4203": "102000005.png",   // Awaken Andrew
    "4806": "101000023.png",   // Awaken Moco
    "3203": "102000012.png",   // Awaken Hayato
    "2506": "101000006.png",   // Awaken Kelly
    "22016": "102000015.png",  // Awaken Alok
    "506": "101000007.png",    // Nikita
    "1906": "101000013.png",   // A124
    "7406": "102000052.png",   // Oscar
    "1206": "102000011.png",   // Wukong
    "106": "101000005.png"     // Olivia
  };

  let fileName;
  
  // Determine if it's a character ID (3-6 digits) or skill ID (8-11 digits)
  if (id.length >= 3 && id.length <= 6) {
    // Character ID
    fileName = characterMap[id];
  } else if (id.length >= 8 && id.length <= 11) {
    // Skill ID - use directly as filename
    fileName = `${id}.png`;
  }
  
  if (!fileName) {
    res.status(404).json({ error: 'ID not found' });
    return;
  }

  const filePath = join(process.cwd(), 'pngs', fileName);
  
  try {
    const stream = createReadStream(filePath);
    res.setHeader('Content-Type', 'image/png');
    stream.pipe(res);
  } catch (error) {
    res.status(500).json({ error: 'Error reading file' });
  }
}

export const config = {
  api: {
    externalResolver: true,
  },
};
