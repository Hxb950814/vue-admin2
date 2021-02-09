/* url网络相关 */

/* 通过请求头获取下载文件的名字 */
export function getDownloadFileName(disposition: string) {
  /* content-type:attachment;filename='111.xlsx' */
  const matched = /.*filename=(.*)/.exec(disposition); // 匹配
  const matchStr = matched?.[1]?.trim();
  return matchStr ? decodeURIComponent(escape(matchStr)) : "新建文件.bin";
}

/* 通过BLob文件来下载保存文件 */
export function downloadFileFromBlob(blob: Blob, fileName: string) {
  // fileName 一定是要带后缀名的，而且要和blob匹配，否则下载文件打不开
  if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    // IE系列兼容,兼容IE10+，Edge12-18
    window.navigator.msSaveOrOpenBlob(blob, fileName);
  } else {
    const downloadElement = document.createElement("a");
    const href = window.URL.createObjectURL(blob);
    downloadElement.href = href;
    downloadElement.download = fileName;
    document.body.appendChild(downloadElement);
    downloadElement.click();
    document.body.removeChild(downloadElement);
    window.URL.revokeObjectURL(href);
  }
}
