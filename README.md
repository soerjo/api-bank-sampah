# API Bank Sampah by Nestjs

project created to handle Bank Sampah API created with Nestjs Tech.

## Tech

- Nestjs
- postgresql
- typeorm

## API

| List Master Sampah

- [GET] - /api/sampah
- [GET] - /api/sampah/type
  \*(get total of sampah type)
- [GET] - /api/sampah/:id
- [POST] - /api/sampah
- [PATCH] - /api/sampah/:id

| List Nasabah

- [GET] - /api/nasabah
- [GET] - /api/nasabah/total
- [GET] - /api/nasabah/:id
- [POST] - /api/nasabah
- [PATCH] - /api/nasabah/:id

|List Transaction

- [GET] - /api/transaction?type="deposit|withdraw|all"
- [GET] - /api/transaction/total
- [GET] - /api/transaction/:nasabah_id?start_date="10/05/2021"&end_date="15/05/2021"
- [GET] - /api/transaction/:id
- [POST] - /api/transaction
- [PATCH] - /api/transaction/:id

## Note

- ada bang sampah lain yaitu orang lain bisa join buat make aplikasi kita
- pengepul (harga jenis sampah) bisa beda-beda terkait bang sampah masing masing juga bisa punya pengepul masing masing.
