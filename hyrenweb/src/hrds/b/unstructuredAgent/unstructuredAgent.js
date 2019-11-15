import request from '@/utils/request'

/**(0)
 * 选择文件夹Agent所在服务器的文件夹
 */
export function selectPath(data) {
    return request({
        url: '/B/agent/unstructuredfilecollect/selectPath',
        method: 'post',
        params: data
    })
}
