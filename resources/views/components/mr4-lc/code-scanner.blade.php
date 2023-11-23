<script>
    var messages = @json(__('mr4lc-code-scanner'));
</script>
<script src="{{ asset('vendor/mr4-lc/code-scanner/js/zxing.min.js') }}"></script>
<script src="{{ asset('vendor/mr4-lc/code-scanner/js/code-scanner.js') }}"></script>
<link rel="stylesheet" href="{{ asset('vendor/mr4-lc/code-scanner/css/code-scanner.css') }}">
<div class="code-scanner">
    <img src="{{ asset('vendor/mr4-lc/code-scanner/img/loading.svg') }}" width="24px" height="24px" alt="Loading..."
        onload="LoadCameraDevices(this, '{{ $id }}', messages, '{{ $mode ?? 'single' }}')">
</div>
<template name="__mr4-lc-code-scanner-template">
    <div id="__mr4-lc-code-scanner-container" class="code-scanner-container">
        <video id="__video-code-scanner" class="code-scanner-video"></video>
        <div id="__mr4-lc-code-scanner-result" class="code-scanner-result">{!! __('mr4lc-code-scanner.guideline') !!}</div>
        <div class="code-scanner-control">
            <button id="__mr4-lc-code-scanner-btn_ok" class="btn btn-code-scanner-ok">{{ __('mr4lc-code-scanner.buttons.OK') }}</button>
        </div>
    </div>
</template>
