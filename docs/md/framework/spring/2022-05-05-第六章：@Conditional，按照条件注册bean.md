# 第六章：@Conditional，按照条件注册bean

## @Conditional 概述
`@Conditional` 注解可以按照条件进行判断，满足条件就向容器中注册bean，不满足条件就不注册。
```java
package org.springframework.context.annotation;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Indicates that a component is only eligible for registration when all
 */
@Target({ElementType.TYPE, ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface Conditional {

	/**
	 * All {@link Condition}s that must {@linkplain Condition#matches match}
	 * in order for the component to be registered.
	 */
	Class<? extends Condition>[] value();

}
```
`@Conditional` 注解可以标注在类和方法上。它有一个 Condition 类型或其子类型的 Class 对象数组。Condition是一个接口，
在使用 `@Conditional` 注解时，需要传入实现了 Condition 接口的类，并实现接口方法。然后可以使用在 `@Conditional` 注解中定义的类来检测。
```java
public interface Condition {

	/**
	 * Determine if the condition matches.
	 * @param context the condition context
	 * @param metadata metadata of the {@link org.springframework.core.type.AnnotationMetadata class}
	 * or {@link org.springframework.core.type.MethodMetadata method} being checked.
	 * @return {@code true} if the condition matches and the component can be registered
	 * or {@code false} to veto registration.
	 */
	boolean matches(ConditionContext context, AnnotatedTypeMetadata metadata);

}
```
### 应用场景
1. 可以作为类级别的注解直接或间接与`@Component`相关联，包括`@Configuration`注解。
2. 可以作为元注解，用于自动编写构造性注解。
3. 作为方法级别的注解，作用在任何`@Bean`方上。

## 向