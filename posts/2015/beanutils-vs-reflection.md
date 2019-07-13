# 记一次神奇的优化过程:Java反射 VS Apache BeanUtils VS Spring BeanUtils

```metadata
title: 记一次神奇的优化过程:Java反射 VS Apache BeanUtils VS Spring BeanUtils
created: 2015-11-10
updated: 2015-11-10
category: Blog
tags:
- Java
- Apache
cover: https://picsum.photos/id/221/800/300
```



## Background

最近老大分配了个性能优化的任务,因为主要页面在Production上打开的时间太长,(大概7s?卧槽 第一次听到的时候还以为我听错了).
居然这么慢..
其实是有主程序大大带着我做,所以在扫了一遍前端ExtJS的结构之后,发现错综复杂四年以来不同技术层次的人都在同一个页面上添油加醋,
了解以前的需求之后完全重构基本是不可能的,所以前端的性能优化就交给主程序大大,我跑去扫一下服务器端有什么性能瓶颈.


### 使用 JProfiler 分析 代码性能

> 通过网上找来的资料,比较了一份周围的资料
> IBM的 [常用 Java Profiling 工具的分析与比较](https://www.ibm.com/developerworks/cn/java/j-lo-profiling/)
> 最后决定使用JProfiler进行性能分析

#### IntelliJ IDEA集成 JProfiler 监控 Weblogic 实例

idea 集成了 (应该是JProfiler本身就带了idea的插件安装) 安装之后就会 在启动服务器运行的 按钮多出一个 使用JProfiler 运行.
> 由于JProfiler 本身也是通过javaagent的方法更改一些类加载运行时策略,所以会跟Jrebel冲突.
> 所以在使用JProfiler监控性能的时候,如果之前在weblogic服务器运行配置的过程中添加了jrebel.jar 作为javaagent的参数,务必删掉
> 其余配置 与之前的[Jrebel插件结合weblogic](https://blog.aquariuslt.com/posts/2015/10/08/jrebel-configuration-with-weblogic-in-idea/)一样

#### 通过JProfiler 分析方法执行时间

通过JProfiler插件启动weblogic服务器实例之后,JProfiler的GUI界面将会启动,并成功监听到对应的实例进程.
实例成功启动之后,下面会有一个CPU Time的标签页,选中并点击`record`.
触发任意次目标方法,即可看到所有方法的执行时间

![方法执行时间](https://img.aquariuslt.com/posts/2015/11/method-executing-time.webp)


### 正文:性能优化部分

言归正传,在看到性能分析记录的时候,一个叫做
`ReflectionUtil.convertObjectWithSameFields()`
的方法,方法体如下
``` Java
/**
* Convert between two Object with the same field, setter and getter
*
* @param target
*            the object wants to be convert to
* @param source
*            the object as source of converter
*/
public static void convertObjectToObjectWithSameFields(Object target, Object source) {
    List<Field> detailFields = new ArrayList<Field>();
    List<Field> oFields = new ArrayList<Field>();
    for (Class<?> clas = target.getClass(); clas != Object.class; clas = clas.getSuperclass()) {
        detailFields.addAll(Arrays.asList(clas.getDeclaredFields()));
    }
    for (Class<?> clas = source.getClass(); clas != Object.class; clas = clas.getSuperclass()) {
        oFields.addAll(Arrays.asList(clas.getDeclaredFields()));
    }
    for (Field dField : detailFields) {
        for (Field oField : oFields) {
            String targetField = dField.getName();
            String sourceField = oField.getName();
            if (targetField.equals(sourceField)) {
                try {
                    Object object = getAttributeValue(oField.getName(), source, true);
                    if (object != null)
                        setAttributeValue(dField.getName(), object, target, object.getClass());
                } catch (Exception e) {
                }
            }
        }
    }
}
```
原来是使用了JDK的反射API,遍历两个Bean的属性去进行对应的`getter`,`setter`方法.时间复杂度为O(n*m),(可是到后面发现好像并不是这个时间复杂度的问题,囧).
由于JDK原生的Reflection比较辣鸡,效率比较慢,所以造成了本次性能瓶颈的原因之一.

一开始先是想到了Apache CommonUtils类库里面的BeanUtils 和 PropertyUtils来替换同事造的效率很低的轮子
通过看源码,大概发现BeanUtils是这样实现属性复制的

首先他会将 需要进行属性复制的两个Bean抽取出来,然后一个Map储存其类型和名字相同的属性.
接着这个Map会根据里面的几种属性分成对应的属性(大概是基本类型,List类型,Map类型以及自定义类型)

在进行属性复制的时候,会根据该动态Bean里面的属性,来找到目标Bean是否含有对应的setProperites方法,然后调用 源Bean的getProperties方法.

但是这个BeanUtils 有个缺点,就是遇到很操蛋的属性(恰好遇到这个情况)的时候,不能对一些属性进行ignore操作.

> 原因是需要转换的两个JavaBean其实并不是规范的JavaBean
> 其中一个JavaBean 有一个getter方法,叫做getXX() 但是返回的却是 一个List集合的第一个元素.
> 这时候操蛋的另一个JavaBean 也有一个 setter方法,叫做setXX() 但是这个JavaBean却是规范的JavaBean.

最后是使用Spring-Bean的BeanUtils解决问题的.因为它能够传第一个ingore的属性名集合进去,不读这部分.



优化结果是,将原来的轮子替换成Spring的BeanUtils.
结果比在本地测试快了700ms,希望在Production上也有300+ms的优化表现.






## Summary

实现不同的JavaBean(常见场景是Entity,DTO,VO)之间相同属性名的转化过程,可以利用BeanUtils.copyProperties来实现.

















