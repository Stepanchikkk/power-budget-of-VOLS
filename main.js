// Функция для рассчета суммарной потери мощности
function calc(TxPower, RxSensitivity, GainTx, CableLossTx, GainRx, CableLossRx, PathLoss, PenetrationLoss, FoliageLoss, BodyLoss, RainIceMargin, SlowFadingMargin) {
    // Рассчитываем общую потерю мощности
    var B = TxPower - RxSensitivity + GainTx - CableLossTx + GainRx - CableLossRx - PathLoss - PenetrationLoss - FoliageLoss - BodyLoss - RainIceMargin - SlowFadingMargin
    return B
}

function getResult() {
    // Получаем значения из полей ввода
    var TxPower = parseFloat(document.getElementById("TxPower").value.replace(",", "."))
    var RxSensitivity = parseFloat(document.getElementById("RxSensitivity").value.replace(",", "."))
    var GainTx = 10.29
    var GainRx = 10.29
    var CableLossTx = 2
    var CableLossRx = 2
    var RadiusCell = parseFloat(document.getElementById("RadiusCell").value) / 1000
    var CenterFrequencyTx = parseFloat(document.getElementById("CenterFrequencyTx").value)
    var PathLoss = 20 * Math.log10((4 * Math.PI * RadiusCell) / (300 / CenterFrequencyTx))
    var PenetrationLoss
    var radios = document.querySelectorAll("input[type='radio']")
    for (var radio of radios) {
        if (radio.checked) {
            PenetrationLoss = parseFloat(radio.value.replace(",", "."))
        }
    }
    console.log(PenetrationLoss)
    var FoliageLoss = parseFloat(document.getElementById("FoliageLoss").value.replace(",", "."))
    var BodyLoss = parseFloat(document.getElementById("BodyLoss").value.replace(",", "."))
    var RainIceMargin = parseFloat(document.getElementById("RainIceMargin").value.replace(",", "."))
    var SlowFadingMargin = parseFloat(document.getElementById("SlowFadingMargin").value.replace(",", "."))

    // Вызываем функцию для рассчета суммарной потери мощности
    var Loss = calc(TxPower, RxSensitivity, GainTx, CableLossTx, GainRx, CableLossRx, PathLoss, PenetrationLoss, FoliageLoss, BodyLoss, RainIceMargin, SlowFadingMargin)

    var resText = ""

    // Проверяем результат и формируем текст для вывода
    if (isNaN(Loss)) {
        resText = "Введены не все значения или введены неверно"
    } else if (Loss > 0) {
        resText = "PASS"
    } else if (Loss < 0) {
        resText = "FAIL"
    } else {
        resText = "*PASS"
    }

    // Выводим результат на страницу
    document.getElementById("dat").innerHTML = resText
}