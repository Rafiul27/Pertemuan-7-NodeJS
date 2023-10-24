const fs = require('fs').promises;
const validator = require('validator');
const readline = require('readline')


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const question = (prompt) => {
    return new Promise((resolve) => {
        rl.question(prompt, (answer) => {
            resolve(answer);
        });
    });
};

const dataPath = './data/contacts.json';

const buatFolderDanFile = async () => {
    try {
        await fs.mkdir('./data');
        console.log("Folder 'data' berhasil dibuat.");
    } catch (error) {
        if (error.code === 'EEXIST') {
            console.log("Folder 'data' sudah ada.");
        } else {
            console.error("Terjadi kesalahan saat membuat folder: ", error);
        }
    }

    try {
        await fs.access(dataPath);
        console.log("File 'contacts.json' sudah ada.");
    } catch (error) {
        if (error.code === 'ENOENT') {
            await fs.writeFile(dataPath, '[]', 'utf-8');
            console.log('File contacts.json berhasil dibuat.');
        } else {
            console.error("Terjadi kesalahan saat membuat file: ", error);
        }
    }
};

const simpanDataKeJSON = async (data) => {
    try {
        await fs.writeFile(dataPath, JSON.stringify(data, null, 2), 'utf-8');
        console.log('Data berhasil disimpan ke contacts.json.');
    } catch (error) {
        console.error("Terjadi kesalahan saat menyimpan data ke JSON: ", error);
    }
};

const tambahDataKeJSON = async (nama, handphone, email) => {
    await buatFolderDanFile();

    
    
    // cek nomor handphone
    if(handphone) {
        if(!validator.isMobilePhone(handphone, `id-ID`)) {
            console.log(`Nomor Handphone tidak valid. Silakan coba lagi.`)
            return false;
        }
    }
    // cek email
    if(email) {
        if(!validator.isEmail(email)) {
            console.log(`Alamat email tidak valid. Silakan coba lagi.`)
            return false;
        }
    }

    const existingData = JSON.parse(await fs.readFile(dataPath, 'utf-8'));
    existingData.push({nama, handphone, email});
    await simpanDataKeJSON(existingData);
    // console.log(`Nama saya adalah ${nama}, nomor telepon saya adalah ${handphone}, dan email saya ${email}. Thank You!!`);
    console.log(`Data anda telah disimpan. Terima kasih!`);

    return { nama, handphone, email };
};

module.exports = {
    tambahDataKeJSON
};

