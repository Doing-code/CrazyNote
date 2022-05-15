# 第18章：@PropertySource加载外部配置文件
## 是什么
### 概述
`@PropertySource`注解是Spring3.1引入的配置类注解，通过`@PropertySource`注解能够将`.properties`配置文件中的`key=value`存储到Spring的`Environment`类中，
`Environment`接口提供了方法读取配置文件中的值，参数是`.properties`配置文件定义的`key`值，也可以使用`@Value("${key}")`注解注入属性值。
## 能干嘛
### @PropertySource 
定位`org.springframework.context.annotation.PropertySource`查看源码：
```java
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Repeatable(PropertySources.class)
public @interface PropertySource {

	/**
	 * Indicate the name of this property source. If omitted, a name will
	 * be generated based on the description of the underlying resource.
	 * @see org.springframework.core.env.PropertySource#getName()
	 * @see org.springframework.core.io.Resource#getDescription()
	 */
	String name() default "";

	/**
	 * Indicate the resource location(s) of the properties file to be loaded.
	 * For example, {@code "classpath:/com/myco/app.properties"} or
	 * {@code "file:/path/to/file"}.
	 * <p>Resource location wildcards (e.g. *&#42;/*.properties) are not permitted;
	 * each location must evaluate to exactly one {@code .properties} resource.
	 * <p>${...} placeholders will be resolved against any/all property sources already
	 * registered with the {@code Environment}. See {@linkplain PropertySource above}
	 * for examples.
	 * <p>Each location will be added to the enclosing {@code Environment} as its own
	 * property source, and in the order declared.
	 */
	String[] value();

	/**
	 * Indicate if failure to find the a {@link #value() property resource} should be
	 * ignored.
	 * <p>{@code true} is appropriate if the properties file is completely optional.
	 * Default is {@code false}.
	 * @since 4.0
	 */
	boolean ignoreResourceNotFound() default false;

	/**
	 * A specific character encoding for the given resources, e.g. "UTF-8".
	 * @since 4.3
	 */
	String encoding() default "";

	/**
	 * Specify a custom {@link PropertySourceFactory}, if any.
	 * <p>By default, a default factory for standard resource files will be used.
	 * @since 4.3
	 * @see org.springframework.core.io.support.DefaultPropertySourceFactory
	 * @see org.springframework.core.io.support.ResourcePropertySource
	 */
	Class<? extends PropertySourceFactory> factory() default PropertySourceFactory.class;

}
```
我们可以通过`@PropertySource`注解也可以指定多个 properties 文件：
```java
@PropertySource(value={"classpath:/config.properties", "classpath:/application.properties"})
```
请注意`@Repeatable(PropertySources.class)`，是不是很眼熟，可重复注解，也可以用`@PropertySources`注解指定 properties 配置文件。

### @PropertySources
定位到`org.springframework.context.annotation.PropertySources`
```java
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface PropertySources {

	PropertySource[] value();

}
```
`@PropertySources`如何指定配置文件？如下所示：
```java
@PropertySources(value={
    @PropertySource(value="classpath:/config.properties")
    @PropertySource(value={"classpath:/application.properties"})
})
```
## 去哪下
官方文档：https://docs.spring.io/spring-framework/docs/current/reference/html/core.html#beans-using-propertysource
## 怎么玩
定义一个名为`application.properties`的配置文件：
```properties
person.name=forbearance
```
定义一个名为`Person`的类：
```java
package cn.forbearance.spring.bean;

import org.springframework.beans.factory.annotation.Value;

/**
 * @author cristina
 */
public class Person {

    @Value("${person.name}")
    private String name;

    @Value("#{22}")
    private Integer age;

    public Person() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    @Override
    public String toString() {
        return "Person{" +
                "name='" + name + '\'' +
                ", age=" + age +
                '}';
    }
}
```
注入属性的方式：
1. 通过xml配置文件注入
   ```xml
    <context:property-placeholder location="classpath:application.properties" />
    <!-- 向Spring容器中注册组件 -->
    <bean id="book" class="cn.forbearance.spring.bean.Person">
        <property name="name" value="${person.name}"/>
        <property name="age" value="22"/>
    </bean>
   ```
   需要使用`<context:property-placeholder>`标签导入外部配置文件
2. 通过注解注入
   ```java
   @Configuration
   @PropertySource("classpath:/application.properties")
   public class BeanConfig {
   
       @Bean
       public Person person() {
           return new Person();
       }
   }
   ```
   `<context:property-placeholder location="classpath:application.properties" />`等价于`@PropertySource("classpath:/application.properties")`，通过`@Value`注解注入属性值：
   ```java
   @Value("${person.name}")
   private String name;
   ```
3. 通过Environment获取
   ```java
   @Test
   public void test(01() {
      AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext(BeanConfig.class);
      ConfigurableEnvironment environment = context.getEnvironment();
      String property = environment.getProperty("person.name");
      System.out.println(property);
   }
   ```
测试类：
```java
 @Test
 public void test01() {
     AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext(BeanConfig.class);
     System.out.println("容器创建完成");
     Person person = (Person) context.getBean("person");
     System.out.println(person);
     System.out.println("====================================");
     ConfigurableEnvironment environment = context.getEnvironment();
     String name = environment.getProperty("person.name");
     System.out.println(name);
     context.close();
 }
```
运行测试类：

![forbearance.cn](../../../.vuepress/public/assets/images/2022/spring-47.png)

## 小结