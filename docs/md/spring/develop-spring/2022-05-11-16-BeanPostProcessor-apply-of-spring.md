# 第16章：BeanPostProcessor在Spring底层的使用

> Spring 4.3.12.RELEASE

## BeanPostProcessor接口

```java
public interface BeanPostProcessor {

	Object postProcessBeforeInitialization(Object bean, String beanName) throws BeansException;

	Object postProcessAfterInitialization(Object bean, String beanName) throws BeansException;

}
```

`postProcessBeforeInitialization()`方法在bean初始化之前调用，`postProcessAfterInitialization()`在bean初始化之后调用。

那么`BeanPostProcessor`接口在Spring底层是如何被应用的？接下来会介绍几个`BeanPostProcessor`接口在Spring中的实现类，深入理解`BeanPostProcessor`的应用。

## ApplicationContextAwareProcessor
定位到`org.springframework.context.support.ApplicationContextAwareProcessor`，这个类是`BeanPostProcessor`接口的一个实现类，其作用是能够向组件中注入
IoC 容器。

```java
package org.springframework.context.support;

import java.security.AccessControlContext;
import java.security.AccessController;
import java.security.PrivilegedAction;

import org.springframework.beans.BeansException;
import org.springframework.beans.factory.Aware;
import org.springframework.beans.factory.config.BeanPostProcessor;
import org.springframework.beans.factory.config.EmbeddedValueResolver;
import org.springframework.context.ApplicationContextAware;
import org.springframework.context.ApplicationEventPublisherAware;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.EmbeddedValueResolverAware;
import org.springframework.context.EnvironmentAware;
import org.springframework.context.MessageSourceAware;
import org.springframework.context.ResourceLoaderAware;
import org.springframework.util.StringValueResolver;

/**
 * {@link org.springframework.beans.factory.config.BeanPostProcessor}
 * implementation that passes the ApplicationContext to beans that
 * implement the {@link EnvironmentAware}, {@link EmbeddedValueResolverAware},
 * {@link ResourceLoaderAware}, {@link ApplicationEventPublisherAware},
 * {@link MessageSourceAware} and/or {@link ApplicationContextAware} interfaces.
 *
 * <p>Implemented interfaces are satisfied in order of their mention above.
 *
 * <p>Application contexts will automatically register this with their
 * underlying bean factory. Applications do not use this directly.
 *
 * @author Juergen Hoeller
 * @author Costin Leau
 * @author Chris Beams
 * @since 10.10.2003
 * @see org.springframework.context.EnvironmentAware
 * @see org.springframework.context.EmbeddedValueResolverAware
 * @see org.springframework.context.ResourceLoaderAware
 * @see org.springframework.context.ApplicationEventPublisherAware
 * @see org.springframework.context.MessageSourceAware
 * @see org.springframework.context.ApplicationContextAware
 * @see org.springframework.context.support.AbstractApplicationContext#refresh()
 */
class ApplicationContextAwareProcessor implements BeanPostProcessor {

	private final ConfigurableApplicationContext applicationContext;

	private final StringValueResolver embeddedValueResolver;


	/**
	 * Create a new ApplicationContextAwareProcessor for the given context.
	 */
	public ApplicationContextAwareProcessor(ConfigurableApplicationContext applicationContext) {
		this.applicationContext = applicationContext;
		this.embeddedValueResolver = new EmbeddedValueResolver(applicationContext.getBeanFactory());
	}


	@Override
	public Object postProcessBeforeInitialization(final Object bean, String beanName) throws BeansException {
		AccessControlContext acc = null;

		if (System.getSecurityManager() != null &&
				(bean instanceof EnvironmentAware || bean instanceof EmbeddedValueResolverAware ||
						bean instanceof ResourceLoaderAware || bean instanceof ApplicationEventPublisherAware ||
						bean instanceof MessageSourceAware || bean instanceof ApplicationContextAware)) {
			acc = this.applicationContext.getBeanFactory().getAccessControlContext();
		}

		if (acc != null) {
			AccessController.doPrivileged(new PrivilegedAction<Object>() {
				@Override
				public Object run() {
					invokeAwareInterfaces(bean);
					return null;
				}
			}, acc);
		}
		else {
			invokeAwareInterfaces(bean);
		}

		return bean;
	}

        // 如果是实现了对应的接口，则回调接口实现类方法，注入对应的属性
	private void invokeAwareInterfaces(Object bean) {
		if (bean instanceof Aware) {
		        // 注入当前环境
			if (bean instanceof EnvironmentAware) {
				((EnvironmentAware) bean).setEnvironment(this.applicationContext.getEnvironment());
			}
			// @Value的另一种实现，读取配置文件内容
			if (bean instanceof EmbeddedValueResolverAware) {
				((EmbeddedValueResolverAware) bean).setEmbeddedValueResolver(this.embeddedValueResolver);
			}
			// 注入资源加载器，可以获得外部资源文件
			if (bean instanceof ResourceLoaderAware) {
				((ResourceLoaderAware) bean).setResourceLoader(this.applicationContext);
			}
			// 注入应用时间发布器，用于发布事件
			if (bean instanceof ApplicationEventPublisherAware) {
				((ApplicationEventPublisherAware) bean).setApplicationEventPublisher(this.applicationContext);
			}
			// 国际化
			if (bean instanceof MessageSourceAware) {
				((MessageSourceAware) bean).setMessageSource(this.applicationContext);
			}
			// 向组件中注入IoC容器
			if (bean instanceof ApplicationContextAware) {
				((ApplicationContextAware) bean).setApplicationContext(this.applicationContext);
			}
		}
	}

	@Override
	public Object postProcessAfterInitialization(Object bean, String beanName) {
		return bean;
	}

}
```
如果容器中的bean实现了`invokeAwareInterfaces()`方法中的接口，那么会回调对应接口的实现类的 setXXX() 方法将属性注入给实现类的成员变量，供开发者调用，执行自定义逻辑。

## BeanValidationPostProcessor
定位到`org.springframework.validation.beanvalidation.BeanValidationPostProcessor`，主要用来对bean进行校验。
```java
package org.springframework.validation.beanvalidation;

import java.util.Iterator;
import java.util.Set;
import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;

import org.springframework.beans.BeansException;
import org.springframework.beans.factory.BeanInitializationException;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.config.BeanPostProcessor;

/**
 * Simple {@link BeanPostProcessor} that checks JSR-303 constraint annotations
 * in Spring-managed beans, throwing an initialization exception in case of
 * constraint violations right before calling the bean's init method (if any).
 *
 * @author Juergen Hoeller
 * @since 3.0
 */
public class BeanValidationPostProcessor implements BeanPostProcessor, InitializingBean {

	private Validator validator;

	private boolean afterInitialization = false;


	/**
	 * Set the JSR-303 Validator to delegate to for validating beans.
	 * <p>Default is the default ValidatorFactory's default Validator.
	 */
	public void setValidator(Validator validator) {
		this.validator = validator;
	}

	/**
	 * Set the JSR-303 ValidatorFactory to delegate to for validating beans,
	 * using its default Validator.
	 * <p>Default is the default ValidatorFactory's default Validator.
	 * @see javax.validation.ValidatorFactory#getValidator()
	 */
	public void setValidatorFactory(ValidatorFactory validatorFactory) {
		this.validator = validatorFactory.getValidator();
	}

	/**
	 * Choose whether to perform validation after bean initialization
	 * (i.e. after init methods) instead of before (which is the default).
	 * <p>Default is "false" (before initialization). Switch this to "true"
	 * (after initialization) if you would like to give init methods a chance
	 * to populate constrained fields before they get validated.
	 */
	public void setAfterInitialization(boolean afterInitialization) {
		this.afterInitialization = afterInitialization;
	}

	@Override
	public void afterPropertiesSet() {
		if (this.validator == null) {
			this.validator = Validation.buildDefaultValidatorFactory().getValidator();
		}
	}


	@Override
	public Object postProcessBeforeInitialization(Object bean, String beanName) throws BeansException {
		if (!this.afterInitialization) {
			doValidate(bean);
		}
		return bean;
	}

	@Override
	public Object postProcessAfterInitialization(Object bean, String beanName) throws BeansException {
		if (this.afterInitialization) {
			doValidate(bean);
		}
		return bean;
	}


	/**
	 * Perform validation of the given bean.
	 * @param bean the bean instance to validate
	 * @see javax.validation.Validator#validate
	 */
	protected void doValidate(Object bean) {
		Set<ConstraintViolation<Object>> result = this.validator.validate(bean);
		if (!result.isEmpty()) {
			StringBuilder sb = new StringBuilder("Bean state is invalid: ");
			for (Iterator<ConstraintViolation<Object>> it = result.iterator(); it.hasNext();) {
				ConstraintViolation<Object> violation = it.next();
				sb.append(violation.getPropertyPath()).append(" - ").append(violation.getMessage());
				if (it.hasNext()) {
					sb.append("; ");
				}
			}
			throw new BeanInitializationException(sb.toString());
		}
	}

}
```
如果`this.afterInitialization`值为false，会在`postProcessBeforeInitialization()`方法中调用`doValidate()`方法对bean进行调用。如果`this.afterInitialization`值为true，则会在`postProcessAfterInitialization()`方法中调用`doValidate()`方法对bean进行调用

## InitDestroyAnnotationBeanPostProcessor
定位到`org.springframework.beans.factory.annotation.InitDestroyAnnotationBeanPostProcessor`主要是用来处理`@PostConstruct`和`@PreDestroy`注解，前几篇文章有讲过：
```java
public class InitDestroyAnnotationBeanPostProcessor
		implements DestructionAwareBeanPostProcessor, MergedBeanDefinitionPostProcessor, PriorityOrdered, Serializable {
    @Override
	public Object postProcessBeforeInitialization(Object bean, String beanName) throws BeansException {
		LifecycleMetadata metadata = findLifecycleMetadata(bean.getClass());
		try {
			metadata.invokeInitMethods(bean, beanName);
		}
		catch (InvocationTargetException ex) {
			throw new BeanCreationException(beanName, "Invocation of init method failed", ex.getTargetException());
		}
		catch (Throwable ex) {
			throw new BeanCreationException(beanName, "Failed to invoke init method", ex);
		}
		return bean;
	}
	
    @Override
	public Object postProcessAfterInitialization(Object bean, String beanName) throws BeansException {
		return bean;
	}
	
    private LifecycleMetadata findLifecycleMetadata(Class<?> clazz) {
		if (this.lifecycleMetadataCache == null) {
			// Happens after deserialization, during destruction...
			return buildLifecycleMetadata(clazz);
		}
		// Quick check on the concurrent map first, with minimal locking.
		LifecycleMetadata metadata = this.lifecycleMetadataCache.get(clazz);
		if (metadata == null) {
			synchronized (this.lifecycleMetadataCache) {
				metadata = this.lifecycleMetadataCache.get(clazz);
				if (metadata == null) {
					metadata = buildLifecycleMetadata(clazz);
					this.lifecycleMetadataCache.put(clazz, metadata);
				}
				return metadata;
			}
		}
		return metadata;
	}
	
	private LifecycleMetadata buildLifecycleMetadata(final Class<?> clazz) {
		final boolean debug = logger.isDebugEnabled();
		LinkedList<LifecycleElement> initMethods = new LinkedList<LifecycleElement>();
		LinkedList<LifecycleElement> destroyMethods = new LinkedList<LifecycleElement>();
		Class<?> targetClass = clazz;

		do {
			final LinkedList<LifecycleElement> currInitMethods = new LinkedList<LifecycleElement>();
			final LinkedList<LifecycleElement> currDestroyMethods = new LinkedList<LifecycleElement>();

			ReflectionUtils.doWithLocalMethods(targetClass, new ReflectionUtils.MethodCallback() {
				@Override
				public void doWith(Method method) throws IllegalArgumentException, IllegalAccessException {
				        // @PostConstruct
					if (initAnnotationType != null) {
						if (method.getAnnotation(initAnnotationType) != null) {
							LifecycleElement element = new LifecycleElement(method);
							currInitMethods.add(element);
							if (debug) {
								logger.debug("Found init method on class [" + clazz.getName() + "]: " + method);
							}
						}
					}
					// @PreDestroy
					if (destroyAnnotationType != null) {
						if (method.getAnnotation(destroyAnnotationType) != null) {
							currDestroyMethods.add(new LifecycleElement(method));
							if (debug) {
								logger.debug("Found destroy method on class [" + clazz.getName() + "]: " + method);
							}
						}
					}
				}
			});

			initMethods.addAll(0, currInitMethods);
			destroyMethods.addAll(currDestroyMethods);
			targetClass = targetClass.getSuperclass();
		}
		while (targetClass != null && targetClass != Object.class);

		return new LifecycleMetadata(clazz, initMethods, destroyMethods);
	}
}
```
只截取了关键的源码，注意关键方法`buildLifecycleMetadata()`，这个方法就是用来找到`@PostConstruct`和`@PreDestroy`注解的。

## AutowiredAnnotationBeanPostProcessor
`AutowiredAnnotationBeanPostProcessor`实现了`@Autowired`、`@Value`、`@Inject`属性注入功能。

`TODO`，暂时不作深入理解。将会在 Spring注解驱动完结之后，通过阅读Spring源码深度解析后，对主要源码做一个解析，包括`AutowiredAnnotationBeanPostProcessor`

写一个测试方法并通过方法调用堆栈来分析AutowiredAnnotationBeanPostProcessor类的源码，周末完结IoC篇后会做一个试验测试。
