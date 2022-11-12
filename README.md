# Invoicing-management-system
一个使用Nest+React+mysql+antd+jwt+ts搭建的进销存管理系统
# 项目意义

## 开发目的
21世纪互联网和大数据时代以来，信息化建设成为每个企业绕不过的话题。进货、售货、存货等是一个实体企业现金流运转的根本，对上述企业职能进行信息化管理有助于企业规范相应流程，提高生产效率，这也是信息管理的道理。

## 目标群体
以实体产品为主要经营产品且组织结构相对简单的中小型企业（一般b端用户）
## 主要功能
  - 组织人员管理：分为管理员、采购员、售货员三类
  - 商品管理：查询商品信息、存货，采购商品、销售商品
  - 供销商管理：查询供销商与所售商品信息
  - 订单管理：生成采购、销售订单、查询订单
  - 权限控制：安全的权限控制系统

# 可行性分析

## 技术可行性
  - 开发语言：JavaScript、TypeScript
  
    常见的开发语言分为强类型和弱类型。常见的强类型语言：C/C++、Java等，而java一般是后端开发的常用语言。常见的弱类型语言包括python、JavaScript等。强类型语言的好处就在于对类型限制严格，可以保证项目的稳定性，而弱类型的优点在于开发敏捷。
    
    TypeScript的出现可以说结合了两者的长处，作为JavaScript的超集，敏捷和灵活自不用说，加入了一套类型检查系统，也能保证开发和项目运行的稳定性，所以最后选择TypeScript作为项目的开发语言。

  - 开发框架：后端 NestJS 前端 React+antd
    - 后端
      
      Nest (NestJS) 是一个用于构建高效、可扩展的 Node.js 服务器端应用程序的开发框架。它利用 JavaScript 的渐进增强的能力，使用并完全支持 TypeScript 并结合了 OOP （面向对象编程）、FP （函数式编程）和 FRP （函数响应式编程）。采用了模块、依赖注入等设计思想，被称为nodeJs版本的Spring
      <img src="https://www.nestjs.com.cn/img/nest-big-logo.png" />

    - 前端

      React 是一个声明式，高效且灵活的用于构建用户界面的 JavaScript 库。使用 React 可以将一些简短、独立的代码片段组合成复杂的 UI 界面，这些代码片段被称作“组件”。“组件化”开发大大提高了开发效率，优化了项目结构、体积等。

      <img src="https://img-blog.csdnimg.cn/20200911160753102.png?x-oss-process=image/resize,m_fixed,h_224,w_224"/>
      <img src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" />

      antd作为市面上最流行的开源企业开发组件库，由国内前端“黄埔军校”蚂蚁公司的顶级团队开发，提供配置化的api，可以迅速搭建美观的前端界面，致力于提供给程序员愉悦的开发体验。


  - 数据库：MYSQL

        最可靠、流行、稳定的传统关系型数据库。

  - 安全策略：JsonWebToken、svgValidate

        JsonWebToken（JWT）：目前最流行的跨域认证解决方案，是一种基于 Token 的认证授权机制，可以有效预防CSRF攻击问题。

        svgValidate：采用svg图片验证码，防止有关人员对登录接口进行非法请求。

  - 开发工具：
    - 编码工具：vsCode

            被认为是最受开发者欢迎的开发环境

    - 数据库操作工具：navicate for mysql

            可视化、一键式的数据库操作工具