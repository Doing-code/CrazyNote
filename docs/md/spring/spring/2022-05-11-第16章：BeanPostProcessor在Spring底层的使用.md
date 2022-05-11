# 第16章：BeanPostProcessor在Spring底层的使用
 
## BeanPostProcessor接口
```java
public interface BeanPostProcessor {

	Object postProcessBeforeInitialization(Object bean, String beanName) throws BeansException;

	Object postProcessAfterInitialization(Object bean, String beanName) throws BeansException;

}
```
`postProcessBeforeInitialization()`方法在bean初始化之前调用，`postProcessAfterInitialization()`在bean初始化之后调用。

那么`BeanPostProcessor`接口在Spring底层是如何被应用的？接下来会介绍几个`BeanPostProcessor`接口在Spring中的实现类，深入理解`BeanPostProcessor`的应用。