# node

1. nrm 镜像管理
2. nvm node版本管理
3. supervisor 自动刷新服务器

# Project:
### [hzShop](http://www.hubwiz.com/course/549a704f88dba0136c371703/)
    1. npm install 安装依赖模块
    2. 启动mongodb数据库
    3. npm run shop 启动项目
    4. 访问http://localhost:3000
> 本项目依赖mongodb，所以需要先启动数据库

### [N-blog](https://github.com/nswbmw/N-blog)
    1. npm install 安装依赖模块
    2. 启动mongodb数据库
    3. npm run blog 启动项目
    4. 访问http://localhost:3000
> 本项目依赖mongodb，所以需要先启动数据库

从mongodb中取出数据时格式化得方法

`create_at: {type: Date, default: Date.now, get: v => moment(v).format('YYYY-MM-DD HH:mm')}`

>
    node加密通过crypto模块
    const crypto = require('crypto');
    const md5 = crypto.createHash('md5');
    md5.update(password);
    const psd = md5.digest('hex');
    console.log(psd) //加密后的密码
    MD5（单向散列算法）：输入任意长度的信息，经过处理，输出为128位的信息（数字指纹）；不同的输入得到的不同的结果（唯一性）；根据128位的输出结果不可能反推出输入的信息（不可逆）。
>

> [mongoose 的表关联 ](http://blog.csdn.net/hellochenlu/article/details/50467563)

## koa相关知识的学习总结

1. [从头实现一个koa框架](https://zhuanlan.zhihu.com/p/35040744)  
2. [koa进阶学习](https://chenshenhai.github.io/koa2-note/)
3. [typescript+koa封装一款框架](https://github.com/floveluy/Burnjs/blob/ea3c78c2e512f51339e76a923d0efc05f939cbd0/burnjs/example/books/1.typescript%E7%9A%84%E5%AE%89%E8%A3%85%E4%B8%8E%E9%85%8D%E7%BD%AE.md)
