/**
 * @description 返回一个单例的 request 对象，默认所有返回值为 json 解析后的对象
 * @author Dai
 */
const singletonRequest = function () {

    const _getToken = () => localStorage.getItem('token');

    const _urlWithParams = (url, qs) => {
        let params = Object.keys(qs).map(key => key + '=' + params[key]);
        return url + '?' + params.join('&');
    };

    const _ajax = (url, data, method='POST') => {
        return new Promise((resolve, reject) => {
            const token = _getToken();
            let options = {};
            options.method = method;
            options.headers = {
                "Content-Type": "application/json",
                "Authorization": token
            };
            if (data) options.body = JSON.stringify(data);

            fetch(url, options)
                .then(res => res.json())
                .then(res => {
                    if (res.status === 'success') {
                        resolve(res.data);
                    } else {
                        reject(res.message);
                        alert("验证失败，请重新登录");
                        this.props.history.push('/login');
                    }
                })
        });
    };

    let request = {};
    request.post = (url, data, callback) => _ajax(url, data, 'POST', callback);
    request.get = (url, qs={}, callback) => {
        if (Object.keys(qs).length !== 0) {
            url= _urlWithParams(url, qs);
        }
        return _ajax(url, null, 'GET', callback);
    };

    return request;
};

export default singletonRequest();
