/**
 * @param {Object} res 返回的数据流
 * @param {String} fileName 设置的文件名称
 */
export function fileDownload(res, fileName) {
    this.fileName = fileName;
    const blob = new Blob([res]);
    if (window.navigator.msSaveOrOpenBlob) {
        // 兼容IE10
        navigator.msSaveBlob(blob, this.fileName);
    } else {
        //  chrome/firefox
        let aTag = document.createElement("a");
        // document.body.appendChild(aTag);
        aTag.download = this.fileName;
        aTag.href = URL.createObjectURL(blob);
        if (aTag.all) {
            aTag.click();
        } else {
            //  兼容firefox
            const evt = document.createEvent("MouseEvents");
            evt.initEvent("click", true, true);
            aTag.dispatchEvent(evt);
        }
        URL.revokeObjectURL(aTag.href);
    }
}

// 年月日转换
export function dateFormat(data){
    let year = data.substring(0, 4);
    let month = data.substring(4, 6);
    let day = data.substring(6, 8);
    let dateChange = year + "-" + month + "-" + day;
    data = dateChange;
    return data
}

// 时分秒转换
export function hourFormat(data){
    let hour = data.substring(0, 2);
    let minutes = data.substring(2, 4);
    let seconds = data.substring(4, 6);
    let hourChange = hour + ":" + minutes + ":" + seconds;
    data = hourChange;
    return data
}
