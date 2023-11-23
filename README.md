Code scanner editor extension for laravel-admin
======

This is a `laravel` component that integrates [Scan BarCode and QRCode].
Feature:
- Load all camera device.
- Support single scan
- Support continue
- Support BarCode, QRCode

## Screenshot

## Installation
```bash
composer require mr4-lc/code-scanner
php artisan vendor:publish --tag=mr4-lc-code-scanner --force
```

## Configuration

## Usage

```blade
<x-mr4-lc.code-scanner id='code' mode='continue'/>
```
Hidden input: code (scan result) and code_img (image capture base64 data)
<img width="672" alt="285180698-3339fab4-e75c-4512-a98f-a5e698e53e5c" src="https://github.com/han48/mr4-lc.code-scanner/assets/27817127/51f1d709-b019-4578-9302-0ca9012d815d">


```blade
<x-mr4-lc.code-scanner id='code1' mode='single' />
```
Hidden input: code2 (scan result) and code2_img (image capture base64 data)
<img width="640" alt="285180830-6cc6465d-1f7b-47c1-8e88-3508ddd76f40" src="https://github.com/han48/mr4-lc.code-scanner/assets/27817127/4a1c650e-6867-410f-a716-d7785c43e942">

```blade
<x-mr4-lc.code-scanner id='code2' mode='single' />
<input type="text" id='code2'>
```
Hidden input: code_img (image capture base64 data)
<img width="640" alt="285180830-6cc6465d-1f7b-47c1-8e88-3508ddd76f40" src="https://github.com/han48/mr4-lc.code-scanner/assets/27817127/de713fc9-f42f-41d5-b457-b006b6b4ec0d">

```blade
<x-mr4-lc.code-scanner id='code3' mode='single' />
<div>
    <input type="text" id='code3'>
</div>
<div>
    <img id="__code3_img" alt="">
</div>
```
![285181686-1a5d1d2d-5f3c-4161-af66-37cc171bd85c](https://github.com/han48/mr4-lc.code-scanner/assets/27817127/251ed095-f5e4-4c74-bea6-d0d2bea5db9a)

## License
Licensed under The [MIT License (MIT)](https://github.com/han48/mr4-lc.code-scanner/blob/main/LICENSE).
