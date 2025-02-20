function GetMessage(messages, path, replaces = {}) {
    const paths = path.split('.')
    let result = messages
    for (let index = 0; index < paths.length; index++) {
        const key = paths[index]
        if (result.hasOwnProperty(key)) {
            result = result[key]
        } else {
            return path
        }
    }
    var keys = Object.keys(replaces)
    for (let index = 0; index < keys.length; index++) {
        const key = keys[index]
        result = result.replaceAll(":" + key, replaces[key])
    }
    return result
}

function LoadCameraDevices(ctrl, id, messages, mode = 'single') {
    const parent = ctrl.parentElement
    const codeReader = new ZXing.BrowserMultiFormatReader()
    codeReader.listVideoInputDevices()
        .then((videoInputDevices) => {
            const imageId = "__" + id + '_img'
            const dataId = id + '_img'
            const videoId = '__video-code-scanner'
            const containerId = '__mr4-lc-code-scanner-container'
            const templateName = '__mr4-lc-code-scanner-template'
            const resultId = '__mr4-lc-code-scanner-result'
            const btnOKId = '__mr4-lc-code-scanner-btn_ok'

            parent.removeChild(ctrl)
            let container = document.getElementById(containerId)
            if (undefined === container || null === container) {
                let template = document.getElementsByName(templateName)[0]
                let clone = template.content.cloneNode(true)
                document.body.appendChild(clone)
                container = document.getElementById(containerId)
            }

            let input = document.getElementById(id)
            if (undefined === input || null === input) {
                input = document.createElement('input')
                input.id = id
                input.type = 'hidden'
                parent.appendChild(input)
            }

            let data = document.getElementById(dataId)
            if (undefined === data || null === data) {
                data = document.createElement('input')
                data.id = dataId
                data.type = 'hidden'
                parent.appendChild(data)
            }

            let img = document.getElementById(imageId)
            if (undefined === img || null === img) {
                img = document.createElement('img')
                img.id = imageId
                img.style.display = 'none'
                parent.appendChild(img)
            }

            let btnOK = document.getElementById(btnOKId)
            btnOK.addEventListener("click", (event) => {
                container.style.display = 'none'
                codeReader.reset()
            })

            for (let index = 0; index < videoInputDevices.length; index++) {
                let camera = videoInputDevices[index]
                let message = GetMessage(messages, 'buttons.scan', {
                    'camera': camera.label,
                    'mode': mode,
                })

                let button = document.createElement('button')
                button.textContent = message
                button.value = camera.deviceId
                button.type = 'button'
                button.className = 'btn btn-code-scanner'
                button.addEventListener("click", (event) => {
                    let resultDisplay = document.getElementById(resultId)
                    resultDisplay.innerHTML = GetMessage(messages, 'guideline')
                    container.style.display = 'block'
                    const selectedDeviceId = event.target.value
                    codeReader.decodeFromVideoDevice(selectedDeviceId, videoId, (result, err) => {
                        if (result && input.value !== result.text) {
                            let video = document.getElementById(videoId)
                            let canvas = document.createElement('canvas')
                            canvas.width = video.videoWidth
                            canvas.height = video.videoHeight
                            let ctx = canvas.getContext('2d')
                            ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
                            let image = canvas.toDataURL('image/jpeg')

                            input.value = result.text
                            if (onQRCodeScanned && typeof onQRCodeScanned === 'function') {
                                onQRCodeScanned(result);
                            }
                            let display = GetMessage(messages, 'result', {
                                'result': result.text,
                            })
                            resultDisplay.innerHTML = display
                            data.value = image
                            img.src = image

                            if (mode === 'single') {
                                btnOK.click()
                            }
                        }
                        if (err && !(err instanceof ZXing.NotFoundException)) {
                            // console.error(err)
                        }
                    })
                })
                parent.appendChild(button)
            }
        })
        .catch((err) => {
            parent.removeChild(ctrl)
            let div = document.createElement('div')
            let message = GetMessage(messages, 'errors.camera.exist')
            div.innerHTML = message + "<br />" + err.message
            parent.appendChild(div)
        })
}
