# Spring 整合 Apache Shiro 实现各等级的权限管理

```metadata
title: Spring 整合 Apache Shiro 实现各等级的权限管理
created: 2015-10-25
updated: 2015-10-25
category: Blog
tags:
- Spring
- Security
- Shiro
- Java
cover: https://picsum.photos/id/927/800/300
```


## Background

前几个月在做一个常规的权限隔离功能的时候,恰好使用过Apache Shiro.
Apache Shiro 是一款Java的安全框架,通常用作Web应用的权限校验,身份验证.

> Apache Shiro is a powerful and easy-to-use Java security framework that performs authentication,
> authorization, cryptography, and session management. With Shiro’s easy-to-understand API, you
> can quickly and easily secure any application – from the smallest mobile applications to the
> largest web and enterprise applications.


在参考过 IBM 开发社区关于Shiro的博客 一篇文章 [在Web项目中应用Apache Shiro](https://www.ibm.com/developerworks/cn/java/j-lo-shiro/)
与开涛博客的一个跟我学Shiro系列文章 [开涛博客-跟我学Shiro](https://jinnianshilongnian.iteye.com/blog/2024723)

> 不得不说的是IBM Developer社区的文章一向属于生动易懂.
> 但是上面的这篇讲得并没有之前推荐的讲Spring-DataJPA的那篇文章那样浅显,
> 于是才有了现在这份笔记


## 权限控制

我所接触到的权限控制大概可以分成两个级别 URL和方法级别.


以常见的论坛用户来举例.论坛用户简要的分成两种 管理员`Admin`,普通用户`Normal`.
其中管理员能够进入用户管理,帖子管理的页面进行CRUD操作.
普通用户则只能进行自己帖子的CRU操作,以及顶贴什么的.

如果只进行URL级别的拦截,只需要在每一个URL的访问时 获取用户的角色是`Admin`还是`Normal`即可.

如果是进行方法级别的拦截,则可能根据功能的设计衍生出很多设计方案(一眼就能想到的大概是树状,平行等).
但是由于跟数据库的设计密切相关,所以这个级别不细讲.
言归正传(不知道是不是看light大大博客看多了,语气有点奇怪),下面结合上面的论坛用户的一个场景进行逻辑与代码的讲解

### URL级别的权限控制

#### 业务场景假设

首先,我们假设有以下几种种URL
```
/user/create        //用户创建,Admin专属
/post/create        //发帖 Admin,Normal共有
/login              //登陆
/logout             //注销
```

#### Shiro基本配置

##### Maven
`$<shiro.version>`请自行替换成当前的最新版本
```xml
<dependency>
    <groupId>org.apache.shiro</groupId>
    <artifactId>shiro-core</artifactId>
    <version>${shiro.version}</version>
</dependency>
<dependency>
    <groupId>org.apache.shiro</groupId>
    <artifactId>shiro-spring</artifactId>
    <version>${shiro.version}</version>
</dependency>
<dependency>
    <groupId>org.apache.shiro</groupId>
    <artifactId>shiro-web</artifactId>
    <version>${shiro.version}</version>
</dependency>
<dependency>
    <groupId>org.apache.shiro</groupId>
    <artifactId>shiro-ehcache</artifactId>
    <version>${shiro.version}</version>
</dependency>
```

##### web.xml
为了实现与Spring同一个级别的URL拦截,需要将Shiro的Filter配置在Spring MVC的Dispatcher Servlet同一个级别
```xml
<filter>
    <filter-name>shiroFilter</filter-name>
    <filter-class>org.springframework.web.filter.DelegatingFilterProxy</filter-class>
    <init-param>
        <param-name>targetFilterLifecycle</param-name>
        <param-value>true</param-value>
    </init-param>
</filter>
<filter-mapping>
    <filter-name>shiroFilter</filter-name>
    <url-pattern>/*</url-pattern>
</filter-mapping>
```

##### Spring ApplicationContext.xml
在与Spring进行整合的时候,为了方便拼切配置,在Spring 里面导入另一份专用于Shiro的xml配置
```xml
<import resource="config/security/applicationContext-shiro-captcha.xml"/>
```

##### Spring applicationContext-shiro-captcha.xml
先将整个 shiro的xml配置贴出来,接下来在逐一解说其内容
```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="https://www.springframework.org/schema/beans" xmlns:xsi="https://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="https://www.springframework.org/schema/beans https://www.springframework.org/schema/beans/spring-beans-3.1.xsd"
       default-lazy-init="true">

    <description>Shiro安全配置</description>

    <!-- Shiro's main business-tier object for web-enabled applications -->
    <bean id="securityManager" class="org.apache.shiro.web.mgt.DefaultWebSecurityManager">
        <property name="realm" ref="shiroRealm"/>
        <property name="cacheManager" ref="shiroEhcacheManager"/>
    </bean>

    <!-- 項目自定义的Realm -->
    <bean id="shiroRealm" class="com.quariuslt.service.security.BookingShiroRealm">
        <property name="loginSessionService" ref="loginSessionService"/>
        <property name="userService" ref="userService"/>
        <property name="cacheManager" ref="shiroEhcacheManager"/>
    </bean>

    <!-- 用户授权信息Cache, 采用EhCache -->
    <bean id="shiroEhcacheManager" class="org.apache.shiro.cache.ehcache.EhCacheManager">
        <property name="cacheManagerConfigFile" value="classpath:config/security/ehcache-shiro.xml"/>
    </bean>

    <!-- 保证实现了Shiro内部lifecycle函数的bean执行 -->
    <bean id="lifecycleBeanPostProcessor" class="org.apache.shiro.spring.LifecycleBeanPostProcessor"/>


    <bean class="org.apache.shiro.spring.security.interceptor.AuthorizationAttributeSourceAdvisor">
        <property name="securityManager" ref="securityManager"/>
    </bean>

    <bean id="captchaFilter" class="com.quariuslt.service.security.CaptchaFormAuthenticationFilter"/>
    <bean id="adminPermissionFilter" class="com.quariuslt.service.security.AdminPermissionFilter"/>
    <bean id="normalPermissionFilter" class="com.quariuslt.service.security.NormalPermissionFilter"/>

    <!-- Shiro Filter -->
    <bean id="shiroFilter" class="org.apache.shiro.spring.web.ShiroFilterFactoryBean">
        <property name="securityManager" ref="securityManager"/>
        <property name="loginUrl" value="/login"/>
        <property name="successUrl" value="/booking/search"/>
        <property name="unauthorizedUrl" value="/"/>
        <property name="filters">
            <map>
                <entry key="authc" value-ref="captchaFilter"/>
                <!--<entry key="roles[admin]" value-ref="captchaFilter"/>-->
                <!--<entry key="roles[normal]" value-ref="captchaFilter"/>-->
            </map>
        </property>
        <property name="filterChainDefinitions">
            <value>
                /=authc
                /register = anon
                /forgot =anon
                /login = anon
                /login/action* = anon
                /logout = logout
                /js/** = anon
                /rest/**=anon
                /image/**=anon
                /jawr_loader.js=anon
                /user/create=roles[admin]
                /post/create/**=roles[normal|admin]
                /** =authc
            </value>
        </property>
    </bean>

</beans>
```

#### 配置详解
首先要理解一件事情,就是Shiro的权限控制 源自于Web.xml的Filter,在Filter中获取目标URL的请求,解析以达到根据请求是否到达下一集Filter的作用.
再要理解一件约定大于配置的问题,了解Shiro的一些默认配置解说.

在贴出来的`shiro-captcha.xml`配置代码中:
```xml
<!-- Shiro Filter -->
<bean id="shiroFilter" class="org.apache.shiro.spring.web.ShiroFilterFactoryBean">
    <property name="securityManager" ref="securityManager"/>
    <property name="loginUrl" value="/login"/>
    <property name="successUrl" value="/booking/search"/>
    <property name="unauthorizedUrl" value="/"/>
    <property name="filters">
        <map>
            <entry key="authc" value-ref="captchaFilter"/>
            <!--<entry key="roles[admin]" value-ref="captchaFilter"/>-->
            <!--<entry key="roles[normal]" value-ref="captchaFilter"/>-->
        </map>
    </property>
    <property name="filterChainDefinitions">
        <value>
            /=authc
            /register = anon
            /forgot =anon
            /login = anon
            /login/action* = anon
            /logout = logout
            /js/** = anon
            /rest/**=anon
            /image/**=anon
            /jawr_loader.js=anon
            /user/create=roles[admin]
            /post/create/**=roles[normal|admin]
            /** =authc
        </value>
    </property>
</bean>
```
先来看`<property name="filterChainDefinitions">`中的属性.
<values>的内容,其实是url对应权限的一些mapping.表示对应的url mapping 需要对应的权限.
其中`authc`,`anon`,`logout`样例中提及的这三个,是Shiro自己的默认配置
> `authc`表示,这这个mapping代表的url需要登陆之后才能查看
> `anon`表示,这个mapping代表的url全部放行,所以可以看到所有js文件与image文件都被放行了
> `logout` 表示这个mapping代表的url将进行一次注销操作,在浏览器客户端进行的是session的注销,在服务器端则是进行缓存的删除

其中 `roles[admin],roles[normal|admin]` 则是自己定义的过滤规则.
表示`/user/create`只有角色包含`admin`的有权限访问
且`/post/create`则是角色是`admin`或`normal`的有权限访问


##### 登录与注销

###### 登录
对于所有需要登录的URL可以通过 `authc`一个拦截器来拦截
在未登录的状态下,所有所有需要登录的URL都是自动跳转到上面XML所配置的`loginUrl`之中.
当然这里返回的是 一个对 `/login`路径的get请求
```xml
<property name="loginUrl" value="/login"/>
```
###### 注销
注销也很简单,只要任意url能够跳转到`/logout`,便会自动注销.


##### 同步登录与异步登陆
其实在Shiro的配置中,通过阅读源码可以看出,其实`loginUrl`一个属性,代表的是
当Method=Get的请求到达其值对应的url(/login)时,返回登录的页面.
当Method=Post的请求到达其值对应的url(/login)时,进入到的就是Shiro本身的登陆操作
该操作,通过读取`securityManager`的配置,
```xml
<property name="securityManager" ref="securityManager"/>
```

通过自定义的realm `BookingShiroRealm`
> 此处`BookingShiroRealm`是自己定义的名称,只是为了符合但是的业务需要起的名字

```xml
<!-- Shiro's main business-tier object for web-enabled applications -->
<bean id="securityManager" class="org.apache.shiro.web.mgt.DefaultWebSecurityManager">
    <property name="realm" ref="shiroRealm"/>
    <property name="cacheManager" ref="shiroEhcacheManager"/>
</bean>

<!-- 項目自定义的Realm -->
<bean id="shiroRealm" class="com.quariuslt.service.security.BookingShiroRealm">
    <property name="loginSessionService" ref="loginSessionService"/>
    <property name="userService" ref="userService"/>
    <property name="cacheManager" ref="shiroEhcacheManager"/>
</bean>
```

接下来解说一下
`BookingShiroRealm.java`
的内容

```Java
public class BookingShiroRealm extends AuthorizingRealm {
    public static final String LOGIN_SESSION_NAME="loginSession";
    public static final String SIMPLE_AUTHORIZATION_INFO="simpleAuthorizationInfo";

    private LoginSessionService loginSessionService;

    private UserService userService;


    public LoginSessionService getLoginSessionService() {
        return loginSessionService;
    }

    public void setLoginSessionService(LoginSessionService loginSessionService) {
        this.loginSessionService = loginSessionService;
    }

    public UserService getUserService() {
        return userService;
    }

    public void setUserService(UserService userService) {
        this.userService = userService;
    }

    /*授权信息*/
    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {
        LoginSession loginSession = (LoginSession) principals.fromRealm(getName()).iterator().next();
        if(SecurityUtils.getSubject().getSession().getAttribute(LOGIN_SESSION_NAME)==null){
            SecurityUtils.getSubject().getSession().setAttribute(LOGIN_SESSION_NAME, loginSession);
        }
        if(SecurityUtils.getSubject().getSession().getAttribute(SIMPLE_AUTHORIZATION_INFO)==null){

            UserDto userDto=userService.findUserById(loginSession.getUserId());
            if (userDto != null) {
                SimpleAuthorizationInfo info = new SimpleAuthorizationInfo();
                Set<RoleDto> roleDtoSet=userService.getUserRolesByUserId(userDto.getId());
                for(RoleDto roleDto:roleDtoSet){
                    info.addRole(roleDto.getName().toLowerCase());
                }

                SecurityUtils.getSubject().getSession().setAttribute(SIMPLE_AUTHORIZATION_INFO, info);
            } else {
                return null;
            }
        }
        return (AuthorizationInfo)SecurityUtils.getSubject().getSession().getAttribute(SIMPLE_AUTHORIZATION_INFO);
    }

    /*认证信息*/
    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken authenticationToken) throws AuthenticationException {
        System.out.println("Come to BookingShiroRealm");
        UsernamePasswordToken token=(UsernamePasswordToken)authenticationToken;
        String userId=token.getUsername();
        String cryptedPassword= String.valueOf(token.getPassword());
        if(StringUtils.isNotEmpty(userId)){
            UserDto targetUser=userService.getByUserId(userId);
            System.out.println("TargetUser:"+userId+" InputPassWord:"+cryptedPassword+" DB PassWord:"+targetUser.getCryptedPassword());
            if(cryptedPassword.equals(targetUser.getCryptedPassword())){
                System.out.println("BookingShiroRealm:Login Success");
                LoginSession loginSession=new LoginSession(targetUser.getId(), targetUser.getUserId(),targetUser.getEmail(),SecurityUtils.getSubject().getSession().getHost());
                loginSessionService.clearSessionByUserId(userId);
                loginSessionService.save(loginSession);
                return new SimpleAuthenticationInfo(loginSession,targetUser.getCryptedPassword().toCharArray(),getName());
            }
        }
        return null;
    }
}

```
`AuthorizingRealm`是Shiro负责身份认证的抽象类.
需要实现其`doGetAuthenticationInfo`方法,实现 对提交过来的用户名/密码 等账号信息,跟数据库进行交互判定登陆是否成功的过程.
和实现其`doGetAuthorizationInfo`方法,实现对需要登陆之后 对权限的认证.


在说到登陆的校验之前,可以看到在`doGetAuthenticationInfo`方法里面 有一个authenticationToken.里面包含了登陆传递过来的用户名和密码信息.这里又是怎么来的呢.
此时返回来回到Spring配置Shiro的xml `applicationContext-shiro-captcha.xml`
会发现
```xml
<property name="filters">
    <map>
        <entry key="authc" value-ref="captchaFilter"/>
        <entry key="roles[admin]" value-ref="captchaFilter"/>
        <entry key="roles[normal]" value-ref="captchaFilter"/>
    </map>
</property>
```
里面会有一个`captchaFilter`,
指向其注入的类 `CaptchaFormAuthenticationFilter.java`

附上`CaptchaFormAuthenticationFilter`代码
```Java
public class CaptchaFormAuthenticationFilter extends FormAuthenticationFilter {

    public static final String DEFAULT_CAPTCHA_PARAM = "captcha";

    private String captchaParam = DEFAULT_CAPTCHA_PARAM;

    public String getCaptchaParam() {

        return captchaParam;

    }

    protected String getCaptcha(ServletRequest request) {

        return WebUtils.getCleanParam(request, getCaptchaParam());

    }

    @Override
    protected boolean onLoginFailure(AuthenticationToken token, AuthenticationException e, ServletRequest request, ServletResponse response) {
        setFailureAttribute(request, e);
        return true;
    }

    @Override
    protected void setFailureAttribute(ServletRequest request, AuthenticationException ae) {
        String className = ae.getClass().getName();
        request.setAttribute(getFailureKeyAttribute(), className);
    }

    //这里进行密码的加密
    @Override
    protected CaptchaUsernamePasswordToken createToken(ServletRequest request, ServletResponse response) {
        System.out.println("Come to CreateToken");
        String username = getUsername(request);
        String password = getPassword(request);
        String captcha = getCaptcha(request);
        boolean rememberMe = isRememberMe(request);
        String host = getHost(request);

        System.out.println("Captcha UserName(UserId):" + username);
        System.out.println("Captcha Password:" + password);
        System.out.println("Captcha RememberMe:" + rememberMe);


        return new CaptchaUsernamePasswordToken(username,
                password.toCharArray(), rememberMe, host, captcha);

    }


    @Override
    protected boolean executeLogin(ServletRequest request, ServletResponse response) throws Exception {
        CaptchaUsernamePasswordToken token = createToken(request, response);

        try {
            System.out.println("Execute Login~");
            Subject subject = getSubject(request, response);
            subject.login(token);

            return onLoginSuccess(token,subject, request, response);
        } catch (AuthenticationException e) {
            return onLoginFailure(token,e, request, response);
        }
    }
}
```
继承`FormAuthenticationFilter`的`CaptchaFormAuthenticationFilter`并重写其`CaptchaUsernamePasswordToken`方法.
用于通过`/login`的POST方式提交过来的时候,便会先经过此filter的`createToken`方法进行token的生成


假设有一个登陆页面的`/login`使用同步提交方式,即通过页面的form表单,`action="/login"`,`method="POST"`提交到后台,触发流程是
> 1. 到达 `FormAuthenticationFilter` 根据表单 生成Token.
> 2. 调用 Shiro专门处理认证的 `subject`其`login`方法进行登陆
> 3. `login`方法 通过调用 自定义的`BookingShiroRealm`方法所实现的顶级接口 来实现对数据库的信息的读取
> 4. 判定登陆用户名与密码 匹配之后,可以通过Shiro自己配置的缓存保存认证信息.

但是在这个时代,还通过同步登陆 实在是太TM捞了,其实异步登陆提交,只需要 手动调用subject.login方法即可
将第一步到达`FormAuthenticationFilter`的token手动生成

异步登陆的实现代码 大概如下(以Controller为例)
```Java
@RequestMapping(value = "/action", method = RequestMethod.POST,produces = MediaType.APPLICATION_JSON_VALUE)
@ResponseBody
public LoginMessage loginAction(
        @RequestParam(value = "username") String username,
        @RequestParam(value = "password") String password,
        @RequestParam(value = "rememberMe", required = false, defaultValue = "false") boolean rememberMe,
        ServletRequest request) {
    LoginMessage loginMessage = new LoginMessage(BKGConstants.ActionStatus.FAILURE.getDescription());
    Subject subject = SecurityUtils.getSubject();


    //尝试获取 跳转到Login前的那个页面的url
    if(null != WebUtils.getSavedRequest(request)) {
        String requestURI= WebUtils.getSavedRequest(request).getRequestURI();
        loginMessage.setRedirect(requestURI);
    }

    try {
        String salt=userService.getByUserId(username).getSalt();
        UsernamePasswordToken token = new UsernamePasswordToken(username, EncryptUtil.encrypt(password,salt));
        subject.login(token);
        loginMessage.setStatus(BKGConstants.ActionStatus.SUCCESS.getDescription());

        //尝试判断 用户是不是第一次登陆
        UserDto currentUser=userService.getByUserId(username);
        if (currentUser.getActive().equals(BKGConstants.UserAccountStatus.FIRST_LOGIN.getIndex())){
            String redirectPath=request.getServletContext().getContextPath()+"/user/password/reset";
            loginMessage.setRedirect(redirectPath);
        }


    } catch (UnknownAccountException e) {
        loginMessage.setMessage(BKGConstants.LoginFailureMessage.PASSWORD_WRONG.getDescription());
    } catch (IncorrectCredentialsException |NullPointerException e) {
        loginMessage.setMessage(BKGConstants.LoginFailureMessage.USER_NOT_EXIST.getDescription());
    } catch (AuthenticationException e) {
        loginMessage.setMessage(BKGConstants.LoginFailureMessage.ACCOUNT_LOCK.getDescription());
    }
    return loginMessage;
}

class LoginMessage {
    private String status;
    private String message;
    private String redirect;

    public LoginMessage(String status) {
        this.status = status;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getRedirect() {
        return redirect;
    }

    public void setRedirect(String redirect) {
        this.redirect = redirect;
    }
}
```


##### 角色校验
登陆的时候,其实只是实现了 `登陆认证`,`缓存登录信息`的过程.
并没有实现,`权限赋予`的过程.只有第一次遇到 需要登陆且特定权限的url的时候,才会请求后台是否有进入对应url的权限.

在讲权限之前,概括一下数据库的设计
```SQL
CREATE TABLE USERS
(
    ID BIGINT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    ACTIVE BIT NOT NULL,
    ADDRESS VARCHAR(300),
    CITY VARCHAR(50),
    COMPANY VARCHAR(20),
    COUNTRY VARCHAR(50),
    CRYPTED_PASSWORD VARCHAR(255),
    DEPARTMENT VARCHAR(20),
    DISPLAY_NAME VARCHAR(128),
    EMAIL VARCHAR(60) NOT NULL,
    FAX VARCHAR(100),
    FIRST_NAME VARCHAR(40),
    GENDER VARCHAR(6),
    JOBTITLE VARCHAR(100),
    LAST_NAME VARCHAR(40),
    LOCATION VARCHAR(50),
    MIDDLE_NAME VARCHAR(40),
    OFFICE VARCHAR(20),
    OFFICECODE VARCHAR(22),
    PHONE VARCHAR(128),
    SALT VARCHAR(255) NOT NULL,
    STAFFID VARCHAR(20),
    STAFFROLE VARCHAR(15),
    TERRITORY VARCHAR(100),
    USERID VARCHAR(20) NOT NULL
);


CREATE TABLE ROLES
(
    ID BIGINT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    DESCRIPTION VARCHAR(255),
    NAME VARCHAR(255) NOT NULL
);
CREATE UNIQUE INDEX UK_OFX66KERUAPI6VYQPV6F2OR37 ON ROLES (NAME);

CREATE TABLE ROLE_USER
(
    ROLE_ID BIGINT NOT NULL,
    USER_ID BIGINT NOT NULL,
    PRIMARY KEY (ROLE_ID, USER_ID),
    FOREIGN KEY (ROLE_ID) REFERENCES ROLES (ID),
    FOREIGN KEY (USER_ID) REFERENCES USERS (ID)
);

CREATE INDEX FK_NJAJEL6A2Q8TR36EMB9L8VW7N ON ROLE_USER (USER_ID);

```
数据库有三个表 `USERS`,`ROLES`,`USER_ROLE`
其实在设计上`User`表跟`ROLE`表是多对多的关系,即User里面有一个Set<Role>,Role里面也有一个Set<User>
通过中间表`USER_ROLE`来实现多对多关联.

下面来看 身份认证的具体实现
`BookingShiroRealm.java`
```Java
protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {
    LoginSession loginSession = (LoginSession) principals.fromRealm(getName()).iterator().next();
    if(SecurityUtils.getSubject().getSession().getAttribute(LOGIN_SESSION_NAME)==null){
        SecurityUtils.getSubject().getSession().setAttribute(LOGIN_SESSION_NAME, loginSession);
    }
    if(SecurityUtils.getSubject().getSession().getAttribute(SIMPLE_AUTHORIZATION_INFO)==null){

        UserDto userDto=userService.findUserById(loginSession.getUserId());
        if (userDto != null) {
            SimpleAuthorizationInfo info = new SimpleAuthorizationInfo();
            Set<RoleDto> roleDtoSet=userService.getUserRolesByUserId(userDto.getId());
            for(RoleDto roleDto:roleDtoSet){
                info.addRole(roleDto.getName().toLowerCase());
            }

            SecurityUtils.getSubject().getSession().setAttribute(SIMPLE_AUTHORIZATION_INFO, info);
        } else {
            return null;
        }
    }
    return (AuthorizationInfo)SecurityUtils.getSubject().getSession().getAttribute(SIMPLE_AUTHORIZATION_INFO);
}
```
通过
```Java
Subject.getSession().setAttribute(SIMPLE_AUTHORIZATION_INFO,info)
```
来实现一个 根据通过已经登陆的用户,获取其在数据库中所具有的角色的名字的集合 生成字符串,然后存在Session里面.
当需要对应的权限,且发现已经有`SIMPLE_AUTHORIZATION_INFO`这个属性,则根据属性中是否含有对应字符串的来判定是否有对应权限.

当然 对应权限的获取,也是通过shiro 配置里面的captchaFilter的具体实现类,实现其`isAccessAllowed`方法来判定.











## Summary
本次主要分享了Share 如何在Spring中整合Apache Shiro的过程.
但是整体配置依然是通过XML统一配置,其实Shiro在近期的版本已经有了Annotation级别的方法能够方便的对URL的Mapping进行注解.
具体的应用过程,就像Spring 2.X 升级到 3.X 的过程一样,但是由于没有实战,不便多说.
