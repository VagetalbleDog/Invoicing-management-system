# AppModule

## 人员
EmployeeModule

### 人员数据实体
Employee.entity

- 用户名
- 姓名
- 密码
- 性别
- 人员类别

	- 管理人员
	- 采购人员
	- 销售人员

### 人员服务
employee.service

- 查询人员信息
- 注册人员
- 删除人员
- 人员信息更新

## 商品
ShopModule


### 商品数据实体
shop.entity

- 商品id
- 商品名称
- 商品类别
- 售价
- 存量

### 商品服务
shop.service

- 进货
- 查询商品信息
- 售货

## 订单
OrderModule

### 订单数据实体
order.entity

- 订单号
- 商品id（外键）
- 供应商id（外键）
- 操作人员id（外键）
- 单价
- 数量
- 订单类型
  - 采购
  - 售货

### 订单服务
order.service

- 生成订单信息
- 查询订单信息

## 供应商
SupplierModule

### 供应商数据实体
supplier.entity

- 姓名
- 供应商id
- 所售商品（oneToMany）

### 供应商服务

- 查询所售商品信息

## 登录服务与权限认证模块

### 验证登录 签发token

### 权限认证守卫

