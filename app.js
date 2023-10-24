const yargs = require('yargs');
const { tambahDataKeJSON } = require('./index');

yargs.command({
    command: 'add',
    describe: 'Menambahkan data kontak',
    builder: {
        nama: {
            describe: 'Nama kontak',
            demandOption: true,
            type: 'string'
        },
        handphone: {
            describe: 'Nomor handphone kontak',
            demandOption: true,
            type: 'string'
        },
        email: {
            describe: 'Alamat email kontak',
            demandOption: false,
            type: 'string'
        }
    },
    handler: (args) => {
        tambahDataKeJSON(args.nama, args.handphone, args.email)
    }
});

yargs.parse();